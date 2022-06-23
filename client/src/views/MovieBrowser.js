import React from 'react'
import Banner from '../components/Banner'
import Rows from '../components/Rows'
import Typography from '@mui/material/Typography'


export default function MovieBrowser() {
  return (<Typography sx={{background:"radial-gradient(ellipse at bottom, #6371a8 0%, #081a36 100%)", pb:20,backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
    <div>
    <Banner/>
    <Rows/>
  </div>
  </Typography>)
}

