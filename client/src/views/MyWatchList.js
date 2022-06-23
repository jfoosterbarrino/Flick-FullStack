import React from 'react'
import WatchList from '../components/WatchList'
import Typography from '@mui/material/Typography'

export default function MyWatchList() {
  return (<Typography sx={{background: 'radial-gradient(ellipse at bottom, #6371a8 0%, #081a36 100%)', backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>
    <WatchList/>
  </Typography>)
}
