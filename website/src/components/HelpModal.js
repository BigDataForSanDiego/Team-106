import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {ReactComponent as Doctor} from './doctor.svg';

function HelpModal({open, handleClose}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="centered-modal-title"
        aria-describedby="centered-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '25%',
            height: '40%',
            bgcolor: 'background.paper',
            textAlign: 'center',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Doctor style={{width:'60%', height:'60%'}}></Doctor>
          <Typography id="centered-modal-title" variant="h5" component="h2" 
            sx={{
                textAlign: 'center',
            }}
          >
            Welcome to WZG Medical!
          </Typography>
          <Typography id="centered-modal-description" sx={{ mt: 2 }}>
            To start please enter your prescribed disease and symptoms and then click the 'Analyze' button!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default HelpModal;
