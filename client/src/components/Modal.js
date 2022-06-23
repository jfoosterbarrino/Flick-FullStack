import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {AppContext} from '../context/AppContext'
import MyAccount from './MyAccount';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#081a36',
  border: '2px solid white',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {user} = useContext(AppContext)

  return (
    <div>
        <Typography onClick={handleOpen} textAlign="center" color="white">
        View Profile
        </Typography>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MyAccount user={user}/>
        </Box>
      </Modal>
    </div>
  );
}