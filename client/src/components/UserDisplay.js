import React, {useContext} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DarkButton from './DarkButton';
import {AppContext} from '../context/AppContext';
import Avatar from '@mui/material/Avatar';


export default function UserDisplay({user}) {
    const {setRecUser} = useContext(AppContext)


  return (
    <Typography sx={{display:"flex", justifyContent:"center"}}>
    <Card sx={{ width: 300,mb:2,mt:5,color:"white",backgroundColor: "rgba(144,102,163,.7)", borderRadius:"20px", transition: "all 1s ease"}}>
      <Typography sx={{ display:"flex", justifyContent:"space-around"}}>
      <CardHeader
        title={user?.first_name +" "+ user?.last_name}
        subheader={user?.email}
        
      />
      <Avatar alt="Remy Sharp" src={user.img} sx={{ width: 45, height: 45,m:2 }}/>
      </Typography>

      <CardContent sx={{display: "flex", justifyContent:"center", flexDirection:"row"}}>

        <Typography sx={{display: "flex", justifyContent:"center"}}>
        <DarkButton onClick={()=>setRecUser(user.id)}>{user.first_name}s Recommended</DarkButton>
        </Typography>
      </CardContent>
      
    </Card>
  </Typography>);
}

