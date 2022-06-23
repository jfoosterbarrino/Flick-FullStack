import React, {useContext} from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import RegisterForm from '../forms/RegisterForm';
import {AppContext} from '../context/AppContext';
import Box from '@mui/material/Box';

export default function SignUp() {
  const {user} = useContext(AppContext)
  
  return (
    <Paper sx={{background: `url(https://res.cloudinary.com/dccf9vnoo/image/upload/v1655266052/Beautiful-Mountain-in-Night-Wallpapers-HD-Pictures_qzn1pe.jpg)`, height:"101vh", backgroundPosition: "center", backgroundSize:"cover"}}>
    <Box sx={{position:'absolute', left:"50%", top:"50%", transform:"translate(-50%, -50%)",backdropFilter:"blur(50px)", padding:"40px", marginTop:"100px", marginBottom:"100px",width:"40%",}}>
    <Typography color="#fffffa"variant="h2" sx={{display:"flex", justifyContent: 'center', mb:2, fontFamily: 'Lora, serif;'}}>{user.token?"Edit Account":"Sign Up"}</Typography>
    <Typography sx={{display:"flex", justifyContent: 'center'}}><RegisterForm/></Typography>
    </Box>
    </Paper>
  )
}
