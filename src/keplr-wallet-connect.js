import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { payloadId } from '@walletconnect/utils';

export async function connect() {
  const connector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org',
    signingMethods: ['keplr_enable_wallet_connect_v1', 'keplr_sign_amino_wallet_connect_v1'],
    qrcodeModal: QRCodeModal,
  });

  if (connector.connected) {
    await connector.killSession();
  }
  await connector.createSession();
  return connector;
}

export function getEnableRequest(chainIds) {
  return {
    id: payloadId(),
    jsonrpc: '2.0',
    method: 'keplr_enable_wallet_connect_v1',
    params: chainIds,
  };
}

export function getKeyRequest(chainIds) {
  return {
    id: payloadId(),
    jsonrpc: '2.0',
    method: 'keplr_get_key_wallet_connect_v1',
    params: chainIds,
  };
}

export function getSignAminoRequest(chainId, signer, signDoc) {
  return {
    id: payloadId(),
    jsonrpc: '2.0',
    method: 'keplr_sign_amino_wallet_connect_v1',
    params: [chainId, signer, signDoc],
  };
}

const keplrWalletConnect = {
  connect,
  getEnableRequest,
  getKeyRequest,
  getSignAminoRequest,
};

export default keplrWalletConnect;
