import React from 'react'
import LoginForm from '../forms/LoginForm'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';

export default function Login() {
  return (
    <Paper sx={{background: `url(https://res.cloudinary.com/dccf9vnoo/image/upload/v1655266052/Beautiful-Mountain-in-Night-Wallpapers-HD-Pictures_qzn1pe.jpg)`, height:"100vh", backgroundPosition: "center", backgroundSize:"cover"}}>
    <Box sx={{position:'absolute', left:"50%", top:"50%", transform:"translate(-50%, -50%)",backdropFilter:"blur(50px)", padding:"40px"}}>
    <Typography color="#fffffa"variant="h2" sx={{display:"flex", justifyContent: 'center', mb:2, fontFamily: 'Lora, serif;'}}>Login</Typography>
    <Typography sx={{display:"flex", justifyContent: 'center'}}><LoginForm/></Typography>
    </Box>
    </Paper>
  )
}
