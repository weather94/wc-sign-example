import CosmostationDebugQRCodeModal from "./debug-modal ";
import CosmostationQRCodeModal from "./modal";
import WalletConnect from "@walletconnect/client";
import { payloadId } from "@walletconnect/utils";

export async function connect(debug = false) {
  var modal = CosmostationQRCodeModal;
  if (debug) {
    modal = CosmostationDebugQRCodeModal;
  }

  const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
    signingMethods: [
      "cosmostation_wc_accounts_v1",
      "cosmostation_wc_sign_tx_v1",
    ],
    qrcodeModal: modal,
  });

  if (connector.connected) {
    await connector.killSession();
  }

  await connector.createSession();

  return connector;
}

export function getKeyRequest(chainIds) {
  return {
    id: payloadId(),
    jsonrpc: "2.0",
    method: "cosmostation_wc_accounts_v1",
    params: chainIds,
  };
}

export function getSignAminoRequest(chainId, signer, signDoc) {
  return {
    id: payloadId(),
    jsonrpc: "2.0",
    method: "cosmostation_wc_sign_tx_v1",
    params: [chainId, signer, signDoc],
  };
}

const cosmostationWalletConnect = {
  connect,
  getKeyRequest,
  getSignAminoRequest,
};

export default cosmostationWalletConnect;
