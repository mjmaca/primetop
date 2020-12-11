/**
 *
 * Modal
 *
 */

import React, { memo } from 'react';
import { bool, any, object } from 'prop-types';
import { Modal, Grid } from '@material-ui/core';

import { ModalBox } from './styles';

function ModalWrapper(props) {
  const { isOpen, children, boxProps } = props;

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: '100%', overflow: 'auto', padding: 10 }}
      >
        <ModalBox {...boxProps}>{children}</ModalBox>
      </Grid>
    </Modal>
  );
}

ModalWrapper.propTypes = {
  isOpen: bool,
  children: any,
  boxProps: object,
};

export default memo(ModalWrapper);
