import React from 'react';
import ReactDom from 'react-dom';
import { Modal } from './modal';

const MODAL_ID = 'cosmostation-qrcode-modal-v1';

function open(uri, cb) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', MODAL_ID);
  document.body.appendChild(wrapper);

  ReactDom.render(
    <Modal
      uri={uri}
      close={() => {
        this.close();
        cb();
      }}
    />,
    wrapper
  );
}

function close() {
  const wrapper = document.getElementById(MODAL_ID);
  if (wrapper) {
    document.body.removeChild(wrapper);
  }
}

export default { open, close };
