import * as React from 'react';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius:'3px',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  

  return (
    <div>
      <Modal 
        style={{borderRadius:'10px'}}
        open={props.open}
        onClose={()=> props.closeModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          {props.children}
        </div>
       
      </Modal>
    </div>
  );
}