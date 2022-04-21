import { cosmos, google } from "../cosmos-v0.44.5";

import Long from "long";
import _ from "lodash";
import axios from "axios";
import BigNumber from "bignumber.js";

import { MsgLimitOrder } from "../crescent/liquidity/types/crescent/liquidity/v1beta1/tx.js";

const LCD_ENDPOINT = "https://lcd-crescent.cosmostation.io";

////////////////////////////////// SWAP DATA123 //////////////////////////////////
////////////////////////////////// SWAP DATA //////////////////////////////////
////////////////////////////////// SWAP DATA //////////////////////////////////
////////////////////////////////// SWAP DATA //////////////////////////////////

export function broadcastSwapTx(signed, signature) {
  console.log("signed:", signed, "signature:", signature);

  const txBodyBytes = getSwapTxBodyBytes(signed);
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
  console.log("APPPPPPP=>");
  return axios
    .post(url, broadcast)
    .then((response) => _.get(response, "data.tx_response"));
}

export function makeAminoSwapMessage(orderer) {
  return {
    type: "liquidity/MsgLimitOrder",
    value: {
      orderer: orderer,
      pair_id: "1",
      direction: 2,
      offer_coin: {
        denom: "ubcre",
        amount: "1000",
      },
      demand_coin_denom: "ucre",
      price: "1.001990049751243782",
      amount: "1000",
      order_lifespan: "0",
    },
  };
}

function getSwapTxBodyBytes(signed) {
  const messages = _.map(signed.msgs, (msg) =>
    convertAminoSwapMessageToProto(msg)
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

function convertAminoSwapMessageToProto(sendMessage) {
  console.log("Amino message:", sendMessage);
  const message = {
    orderer: sendMessage.value.orderer,
    pairId: parseInt(sendMessage.value.pair_id),
    direction: sendMessage.value.direction,
    offerCoin: sendMessage.value.offer_coin,
    demandCoinDenom: sendMessage.value.demand_coin_denom,
    price: new BigNumber(sendMessage.value.price)
      .multipliedBy(10 ** 18)
      .toString(),
    amount: sendMessage.value.amount,
    orderLifespan: { seconds: 0, nanos: 0 },
  };

  return new google.protobuf.Any({
    type_url: "/crescent.liquidity.v1beta1.MsgLimitOrder",
    value: MsgLimitOrder.encode(message).finish(),
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
