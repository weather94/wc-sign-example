import { cosmos, google } from "../cosmos-v0.44.5";

import Long from "long";
import _ from "lodash";
import axios from "axios";
import BigNumber from "bignumber.js";

import { MsgWithdraw } from "../crescent/liquidity/types/crescent/liquidity/v1beta1/tx.js";

const LCD_ENDPOINT = "https://lcd-crescent.cosmostation.io";

export function makeAminoWithdrawMessage(withdrawer) {
  return {
    type: "liquidity/MsgWithdraw",
    value: {
      withdrawer: withdrawer,
      pool_coin: {
        denom: "pool1",
        amount: "11192543106",
      },
      pool_id: "1",
    },
  };
}

export function broadcastWithdrawTx(signed, signature) {
  console.log("signed:", signed, "signature:", signature);

  const txBodyBytes = getWithdrawTxBodyBytes(signed);
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

function getWithdrawTxBodyBytes(signed) {
  const messages = _.map(signed.msgs, (msg) =>
    convertAminoWithdrawMessageToProto(msg)
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

function convertAminoWithdrawMessageToProto(sendMessage) {
  console.log("Amino message:", sendMessage);
  const message = {
    withdrawer: sendMessage.value.withdrawer,
    poolId: Number(sendMessage.value.pool_id),
    poolCoin: sendMessage.value.pool_coin,
  };

  return new google.protobuf.Any({
    type_url: "/crescent.liquidity.v1beta1.MsgWithdraw",
    value: MsgWithdraw.encode(message).finish(),
  });
}

function getPubKey(signature) {
  const _key = Buffer.from(signature.pub_key.value, "base64");
  const publicKey = new cosmos.crypto.secp256k1.PubKey({ key: _key });
  return publicKey;
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
