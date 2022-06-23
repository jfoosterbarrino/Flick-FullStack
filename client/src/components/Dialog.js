import React,{useContext} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import apiUser from '../api/apiUser';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext';
import {useNavigate} from 'react-router-dom';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const {user, setUser, setAlert}=useContext(AppContext);
  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleDelete = () => {
    setOpen(false);
    const source = CancelToken.source()
    const deleteUser = async()=>{
        const response = await apiUser.delUser(user.token, source.token);
        console.log(response)
        setUser({})
        setAlert({msg: "Your account has been deleted", color:"error"})
        navigate('/login')
    }
    deleteUser()
    return ()=>{source.cancel()}
  };

  return (
    <div>
      <Typography onClick={handleClickOpen} textAlign="center" color="white">
        Delete Account
      </Typography>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please remember deleting your account is permenant and your account information cannot be recovered. Are you sure you want to delete your FLICK account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>handleDelete()} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
