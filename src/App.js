import "./App.css";
import "antd/dist/antd.css";

import { Button, Typography } from "antd";
import { InstallError, tendermint } from "@cosmostation/extension-client";
import { cosmos, google } from "./cosmos-v0.44.5";
import { useCallback, useEffect, useState } from "react";

import Long from "long";
import _ from "lodash";
import axios from "axios";
import cosmostationWalletConnect from "./cosmostation-wallet-connect";
import { isMobile } from "@walletconnect/browser-utils";
import { makeSignDoc as makeAminoSignDoc } from "@cosmjs/amino";
import BigNumber from "bignumber.js";

import { makeAminoSwapMessage, broadcastSwapTx } from "./message/swap";
import { makeAminoDepositMessage, broadcastDepositTx } from "./message/deposit";
import {
  makeAminoWithdrawMessage,
  broadcastWithdrawTx,
} from "./message/withdraw";

const { Title, Text } = Typography;

const CHAIN_ID = "crescent-1";
const LCD_ENDPOINT = "https://lcd-crescent.cosmostation.io";
const TO_ADDRESS = "cre1x5wgh6vwye60wv3dtshs9dmqggwfx2ldhgluez";
const DENOM = "ucre";
const EXPLORER_LINK = "https://testnet.mintscan.io/crescent/txs";
const CHAIN_NAME = "crescent";
const DISPLAY_DENOM = "CRE";

const OSMO_CHAIN_ID = "osmosis-1";
const OSMO_LCD_ENDPOINT = "https://lcd-osmosis-app.cosmostation.io";
const OSMO_TO_ADDRESS = "osmo1ze2ye5u5k3qdlexvt2e0nn0508p0409465lts4";
const OSMO_DENOM = "uosmo";
const OSMO_EXPLORER_LINK = "https://www.mintscan.io/osmosis/txs";

function getTxBodyBytes(signed) {
  const messages = _.map(signed.msgs, (msg) =>
    convertAminoSendMessageToProto(msg)
  );
  const txBody = new cosmos.tx.v1beta1.TxBody({
    messages,
    memo: signed.memo,
  });
  console.log(
    "txBody:",
    txBody,
    "error:",
    cosmos.tx.v1beta1.TxBody.verify(txBody)
  );
  return cosmos.tx.v1beta1.TxBody.encode(txBody).finish();
}

function getAuthInfoBytes(signed, signature) {
  const signerInfo = getSignerInfo(signed, signature);
  console.log(
    "signerInfo:",
    signerInfo,
    "error:",
    cosmos.tx.v1beta1.SignerInfo.verify(signerInfo)
  );

  const fee = new cosmos.tx.v1beta1.Fee({
    amount: signed.fee.amount,
    gas_limit: new Long(signed.fee.gas),
  });
  console.log("fee:", fee, "error:", cosmos.tx.v1beta1.Fee.verify(fee));

  const authInfo = new cosmos.tx.v1beta1.AuthInfo({
    signer_infos: [signerInfo],
    fee,
  });
  console.log(
    "authInfo:",
    authInfo,
    "error:",
    cosmos.tx.v1beta1.AuthInfo.verify(authInfo)
  );

  return cosmos.tx.v1beta1.AuthInfo.encode(authInfo).finish();
}

function getSignerInfo(signed, signature) {
  const publicKey = getPubKey(signature);
  console.log(
    "pubKey:",
    publicKey,
    "error:",
    cosmos.crypto.secp256k1.PubKey.verify(publicKey)
  );

  return new cosmos.tx.v1beta1.SignerInfo({
    public_key: new google.protobuf.Any({
      type_url: "/cosmos.crypto.secp256k1.PubKey",
      value: cosmos.crypto.secp256k1.PubKey.encode(publicKey).finish(),
    }),
    mode_info: {
      single: {
        mode: cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
      },
    },
    sequence: new Long(signed.sequence),
  });
}

function getPubKey(signature) {
  const _key = Buffer.from(signature.pub_key.value, "base64");
  const publicKey = new cosmos.crypto.secp256k1.PubKey({ key: _key });
  return publicKey;
}

function broadcastTx(signed, signature) {
  console.log("signed:", signed, "signature:", signature);

  const txBodyBytes = getTxBodyBytes(signed);
  console.log(
    "txBodyBytes:",
    txBodyBytes,
    "decode:",
    cosmos.tx.v1beta1.TxBody.decode(txBodyBytes)
  );

  const authInfoBytes = getAuthInfoBytes(signed, signature);
  console.log(
    "authInfoBytes:",
    authInfoBytes,
    "decode:",
    cosmos.tx.v1beta1.AuthInfo.decode(authInfoBytes)
  );

  const txRaw = new cosmos.tx.v1beta1.TxRaw({
    body_bytes: txBodyBytes,
    auth_info_bytes: authInfoBytes,
    signatures: [Buffer.from(signature.signature, "base64")],
  });
  console.log("txRaw:", txRaw, "error:", cosmos.tx.v1beta1.TxRaw.verify(txRaw));
  const txRawBytes = cosmos.tx.v1beta1.TxRaw.encode(txRaw).finish();
  console.log(
    "txRawBytes:",
    txRawBytes,
    "decode:",
    cosmos.tx.v1beta1.TxRaw.decode(txRawBytes)
  );

  const broadcast = {
    tx_bytes: Buffer.from(txRawBytes).toString("base64"),
    mode: cosmos.tx.v1beta1.BroadcastMode.BROADCAST_MODE_SYNC,
  };
  const url = `${LCD_ENDPOINT}/cosmos/tx/v1beta1/txs`;
  return axios
    .post(url, broadcast)
    .then((response) => _.get(response, "data.tx_response"));
}

function makeAminoSendMessage(from, to, amount) {
  return {
    type: "cosmos-sdk/MsgSend",
    value: {
      amount: [
        {
          amount: String(amount),
          denom: DENOM,
        },
      ],
      from_address: from,
      to_address: to,
    },
  };
}

function convertAminoSendMessageToProto(sendMessage) {
  console.log("Amino message:", sendMessage);
  const message = new cosmos.bank.v1beta1.MsgSend({
    amount: sendMessage.value.amount,
    from_address: sendMessage.value.from_address,
    to_address: sendMessage.value.to_address,
  });
  console.log(
    "Proto message:",
    message,
    "error:",
    cosmos.bank.v1beta1.MsgSend.verify(message)
  );

  return new google.protobuf.Any({
    type_url: "/cosmos.bank.v1beta1.MsgSend",
    value: cosmos.bank.v1beta1.MsgSend.encode(message).finish(),
  });
}

function App() {
  const [connector, setConnector] = useState();
  const [connected, setConnected] = useState();
  const [account, setAccount] = useState();
  const [osmoAccount, setOsmoAccount] = useState();
  const [lastTxHash, setLastTxHash] = useState();
  const [checkMobile] = useState(() => isMobile());

  useEffect(() => {
    let event;
    void (async function async() {
      try {
        const provider = await tendermint();
        event = provider.onAccountChanged(() => console.log("changed"));
      } catch (e) {
        if (e instanceof InstallError) {
          console.log("not installed");
        } else {
          console.log("failed");
        }
      }
    })();

    return () => {
      void (async function async() {
        try {
          const provider = await tendermint();
          provider.offAccountChanged(event);
        } catch (e) {
          if (e instanceof InstallError) {
            console.log("not installed");
          } else {
            console.log("failed");
          }
        }
      })();
    };
  }, []);

  const connect = async () => {
    const connector = await cosmostationWalletConnect.connect();
    setConnector(connector);
    connector.on("connect", (error, payload) => {
      if (error) {
        setConnected(false);
        throw error;
      }
      setConnected(true);
    });
    connector.on("disconnect", (error, payload) => {
      setConnected(false);
    });
  };

  const debugConnect = async () => {
    const connector = await cosmostationWalletConnect.connect(true);
    setConnector(connector);
    connector.on("connect", (error, payload) => {
      if (error) {
        setConnected(false);
        throw error;
      }
      setConnected(true);
    });
    connector.on("disconnect", (error, payload) => {
      setConnected(false);
    });
  };

  const getAccounts = useCallback(() => {
    if (connector) {
      const request = cosmostationWalletConnect.getKeyRequest([CHAIN_ID]);
      connector
        .sendCustomRequest(request)
        .then((accounts) => {
          const account = _.get(accounts, 0);
          setAccount(account);
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
          setAccount();
        });
    }
  }, [connector]);

  const getMultiAccounts = useCallback(() => {
    if (connector) {
      const request = cosmostationWalletConnect.getKeyRequest([
        CHAIN_ID,
        OSMO_CHAIN_ID,
      ]);
      connector
        .sendCustomRequest(request)
        .then((accounts) => {
          setOsmoAccount(
            _.get(
              accounts.filter((account) =>
                account.bech32Address.startsWith("osmo")
              ),
              0
            )
          );
          setAccount(
            _.get(
              accounts.filter((account) =>
                account.bech32Address.startsWith("cre")
              ),
              0
            )
          );
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
          setAccount();
        });
    }
  }, [connector]);

  const send = useCallback(() => {
    const address = _.get(account, "bech32Address");
    if (address) {
      const url = `${LCD_ENDPOINT}/cosmos/auth/v1beta1/accounts/${address}`;
      axios.get(url).then((response) => {
        console.log("response:", response);
        const accountNumber = _.get(response, "data.account.account_number");
        const sequence = _.get(response, "data.account.sequence");
        console.log("account number:", accountNumber, "sequence:", sequence);

        const message = makeAminoSendMessage(address, TO_ADDRESS, "100");
        const fee = {
          amount: [{ denom: DENOM, amount: "0" }],
          gas: "80000",
        };
        console.log("message:", message, "fee:", fee);
        const signDoc = makeAminoSignDoc(
          [message],
          fee,
          CHAIN_ID,
          "",
          accountNumber,
          sequence
        );
        const request = cosmostationWalletConnect.getSignAminoRequest(
          CHAIN_ID,
          address,
          signDoc
        );

        connector
          .sendCustomRequest(request)
          .then((response) => {
            console.log(response);
            const signed = _.get(response, "0.signed");
            const signature = _.get(response, "0.signature");
            return broadcastTx(signed, signature);
          })
          .then((result) => {
            const code = _.get(result, "code");
            if (code === 0) {
              const txHash = _.get(result, "txhash");
              setLastTxHash(txHash);
            } else {
              const rawLog = _.get(result, "raw_log");
              console.error(rawLog);
              alert(rawLog);
              setLastTxHash();
            }
          });
      });
    }
  }, [connector, account]);

  const swap = useCallback(() => {
    const address = _.get(account, "bech32Address");
    if (address) {
      const url = `${LCD_ENDPOINT}/cosmos/auth/v1beta1/accounts/${address}`;
      axios.get(url).then((response) => {
        console.log("response:", response);
        const accountNumber = _.get(response, "data.account.account_number");
        const sequence = _.get(response, "data.account.sequence");
        console.log("account number:", accountNumber, "sequence:", sequence);

        const message = makeAminoSwapMessage(address);
        const fee = {
          amount: [{ denom: DENOM, amount: "0" }],
          gas: "80000",
        };
        console.log("message:", message, "fee:", fee);
        const signDoc = makeAminoSignDoc(
          [message],
          fee,
          CHAIN_ID,
          "",
          accountNumber,
          sequence
        );
        const request = cosmostationWalletConnect.getSignAminoRequest(
          CHAIN_ID,
          address,
          signDoc
        );

        connector
          .sendCustomRequest(request)
          .then((response) => {
            console.log("sign response", response);
            const signed = _.get(response, "0.signed");
            const signature = _.get(response, "0.signature");
            return broadcastSwapTx(signed, signature);
          })
          .then((result) => {
            const code = _.get(result, "code");
            if (code === 0) {
              const txHash = _.get(result, "txhash");
              setLastTxHash(txHash);
            } else {
              const rawLog = _.get(result, "raw_log");
              console.error(rawLog);
              alert(rawLog);
              setLastTxHash();
            }
          });
      });
    }
  }, [connector, account]);

  const deposit = useCallback(() => {
    const address = _.get(account, "bech32Address");
    if (address) {
      const url = `${LCD_ENDPOINT}/cosmos/auth/v1beta1/accounts/${address}`;
      axios.get(url).then((response) => {
        console.log("response:", response);
        const accountNumber = _.get(response, "data.account.account_number");
        const sequence = _.get(response, "data.account.sequence");
        console.log("account number:", accountNumber, "sequence:", sequence);

        const message = makeAminoDepositMessage(address);
        const fee = {
          amount: [{ denom: DENOM, amount: "0" }],
          gas: "80000",
        };
        console.log("message:", message, "fee:", fee);
        const signDoc = makeAminoSignDoc(
          [message],
          fee,
          CHAIN_ID,
          "",
          accountNumber,
          sequence
        );
        const request = cosmostationWalletConnect.getSignAminoRequest(
          CHAIN_ID,
          address,
          signDoc
        );

        connector
          .sendCustomRequest(request)
          .then((response) => {
            console.log("sign response", response);
            const signed = _.get(response, "0.signed");
            const signature = _.get(response, "0.signature");
            return broadcastDepositTx(signed, signature);
          })
          .then((result) => {
            const code = _.get(result, "code");
            if (code === 0) {
              const txHash = _.get(result, "txhash");
              setLastTxHash(txHash);
            } else {
              const rawLog = _.get(result, "raw_log");
              console.error(rawLog);
              alert(rawLog);
              setLastTxHash();
            }
          });
      });
    }
  }, [connector, account]);

  const withdraw = useCallback(() => {
    const address = _.get(account, "bech32Address");
    if (address) {
      const url = `${LCD_ENDPOINT}/cosmos/auth/v1beta1/accounts/${address}`;
      axios.get(url).then((response) => {
        console.log("response:", response);
        const accountNumber = _.get(response, "data.account.account_number");
        const sequence = _.get(response, "data.account.sequence");
        console.log("account number:", accountNumber, "sequence:", sequence);

        const message = makeAminoWithdrawMessage(address);
        const fee = {
          amount: [{ denom: DENOM, amount: "0" }],
          gas: "80000",
        };
        console.log("message:", message, "fee:", fee);
        const signDoc = makeAminoSignDoc(
          [message],
          fee,
          CHAIN_ID,
          "",
          accountNumber,
          sequence
        );
        const request = cosmostationWalletConnect.getSignAminoRequest(
          CHAIN_ID,
          address,
          signDoc
        );

        connector
          .sendCustomRequest(request)
          .then((response) => {
            console.log("sign response", response);
            const signed = _.get(response, "0.signed");
            const signature = _.get(response, "0.signature");
            return broadcastWithdrawTx(signed, signature);
          })
          .then((result) => {
            const code = _.get(result, "code");
            if (code === 0) {
              const txHash = _.get(result, "txhash");
              setLastTxHash(txHash);
            } else {
              const rawLog = _.get(result, "raw_log");
              console.error(rawLog);
              alert(rawLog);
              setLastTxHash();
            }
          });
      });
    }
  }, [connector, account]);

  const sendOsmo = useCallback(() => {
    const address = _.get(osmoAccount, "bech32Address");
    if (address) {
      const url = `${OSMO_LCD_ENDPOINT}/cosmos/auth/v1beta1/accounts/${address}`;
      axios.get(url).then((response) => {
        console.log("response:", response);
        const accountNumber = _.get(response, "data.account.account_number");
        const sequence = _.get(response, "data.account.sequence");
        console.log("account number:", accountNumber, "sequence:", sequence);

        const message = makeAminoSendMessage(address, OSMO_TO_ADDRESS, "100");
        const fee = {
          amount: [{ denom: DENOM, amount: "0" }],
          gas: "80000",
        };
        console.log("message:", message, "fee:", fee);
        const signDoc = makeAminoSignDoc(
          [message],
          fee,
          OSMO_CHAIN_ID,
          "",
          accountNumber,
          sequence
        );
        const request = cosmostationWalletConnect.getSignAminoRequest(
          OSMO_CHAIN_ID,
          address,
          signDoc
        );

        connector
          .sendCustomRequest(request)
          .then((response) => {
            console.log(response);
            const signed = _.get(response, "0.signed");
            const signature = _.get(response, "0.signature");
            return broadcastTx(signed, signature);
          })
          .then((result) => {
            const code = _.get(result, "code");
            if (code === 0) {
              const txHash = _.get(result, "txhash");
              setLastTxHash(txHash);
            } else {
              const rawLog = _.get(result, "raw_log");
              console.error(rawLog);
              alert(rawLog);
              setLastTxHash();
            }
          });
      });
    }
  }, [connector, osmoAccount]);

  const [extensionConnector, setExtensionConnector] = useState(false);
  const [extensionConnected, setExtensionConnected] = useState(false);
  const [extensionAddress, setExtensionAddress] = useState("");
  const [extensionLastTxHash, setExtensionLastTxHash] = useState();

  const extensionConnect = useCallback(async () => {
    try {
      setExtensionConnector(await tendermint());
      setExtensionConnected(true);
    } catch {
      setExtensionConnected(false);
    }
  }, []);

  const getExtensionAccounts = useCallback(async () => {
    try {
      const supportedChains = await extensionConnector.getSupportedChains();

      if (
        ![...supportedChains.official, ...supportedChains.unofficial].includes(
          CHAIN_NAME
        )
      ) {
        await extensionConnector.addChain({
          chainId: CHAIN_ID,
          chainName: CHAIN_NAME,
          addressPrefix: "cre",
          baseDenom: DENOM,
          displayDenom: DISPLAY_DENOM,
          restURL: "https://lcd-crescent.cosmostation.io",
        });
      }

      const accountInfo = await extensionConnector.requestAccount(CHAIN_NAME);

      setExtensionAddress(accountInfo.address);
    } catch (e) {
      console.log(e);
    }
  }, [extensionConnector]);

  const extensionSend = useCallback(async () => {
    if (extensionAddress) {
      const address = extensionAddress;
      const url = `${LCD_ENDPOINT}/cosmos/auth/v1beta1/accounts/${address}`;
      axios.get(url).then((response) => {
        console.log("response:", response);
        const accountNumber = _.get(response, "data.account.account_number");
        const sequence = _.get(response, "data.account.sequence");
        console.log("account number:", accountNumber, "sequence:", sequence);

        const message = makeAminoSendMessage(address, TO_ADDRESS, "100");
        const fee = {
          amount: [{ denom: DENOM, amount: "0" }],
          gas: "80000",
        };
        console.log("message:", message, "fee:", fee);
        const signDoc = makeAminoSignDoc(
          [message],
          fee,
          CHAIN_ID,
          "",
          accountNumber,
          sequence
        );

        extensionConnector
          .signAmino(CHAIN_NAME, signDoc)
          .then((response) => {
            console.log(response);
            const signed = response.signed_doc;
            const signature = response.signature;
            const pub_key = response.pub_key;
            return broadcastTx(signed, { signature, pub_key });
          })
          .then((result) => {
            const code = _.get(result, "code");
            if (code === 0) {
              const txHash = _.get(result, "txhash");
              setExtensionLastTxHash(txHash);
            } else {
              const rawLog = _.get(result, "raw_log");
              console.error(rawLog);
              alert(rawLog);
              setExtensionLastTxHash();
            }
          });
      });
    }
  }, [extensionAddress, extensionConnector]);

  return (
    <div className="App">
      <header className="App-header">
        <Title level={3}>Cosmostation Crescent Wallet Connect</Title>
        {connected ? (
          <Button type="primary" onClick={connect} disabled>
            Connected!
          </Button>
        ) : (
          <>
            <Button type="primary" onClick={connect}>
              Connect
            </Button>
            <br />
            <Button type="primary" onClick={debugConnect}>
              Debug Connect
            </Button>
          </>
        )}
        <br />
        {connected && (
          <Button type="primary" onClick={getAccounts}>
            Get Account
          </Button>
        )}
        <br />
        {connected && (
          <Button type="primary" onClick={getMultiAccounts}>
            Get Multi Account
          </Button>
        )}
        {account && (
          <p>
            <Text code>Name: {_.get(account, "name")}</Text>
            <br />
            <Text code>Address: {_.get(account, "bech32Address")}</Text>
            <br />
          </p>
        )}
        {osmoAccount && (
          <p>
            <Text code>Name: {_.get(osmoAccount, "name")}</Text>
            <br />
            <Text code>Address: {_.get(osmoAccount, "bech32Address")}</Text>
            <br />
          </p>
        )}
        {account && (
          <p>
            <Button type="primary" onClick={send}>
              Send
            </Button>
            <br />
            <Button type="primary" onClick={deposit}>
              Deposit
            </Button>
            <br />
            <Button type="primary" onClick={withdraw}>
              Withdraw
            </Button>
            <br />
            <Button type="primary" onClick={swap}>
              Swap
            </Button>
            <br />
            <Button type="primary" onClick={sendOsmo}>
              Send Osmo
            </Button>
          </p>
        )}
        {lastTxHash && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${EXPLORER_LINK}/${lastTxHash}`}
          >
            Check TX on Mintscan: {lastTxHash}
          </a>
        )}

        {!checkMobile && (
          <div>
            <Title level={3}>
              Cosmostation Crescent Wallet Extension Connect
            </Title>
            {extensionConnected ? (
              <Button type="primary" onClick={extensionConnect} disabled>
                Connected!
              </Button>
            ) : (
              <Button type="primary" onClick={extensionConnect}>
                Connect
              </Button>
            )}
            <br />
            {extensionConnected && (
              <Button type="primary" onClick={getExtensionAccounts}>
                Get Account
              </Button>
            )}
            {extensionAddress && (
              <p>
                <Text code>Address: {extensionAddress}</Text>
                <br />
              </p>
            )}
            {extensionAddress && (
              <Button type="primary" onClick={extensionSend}>
                Send
              </Button>
            )}
            {extensionLastTxHash && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${EXPLORER_LINK}/${extensionLastTxHash}`}
              >
                Check TX on Mintscan: {extensionLastTxHash}
              </a>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
