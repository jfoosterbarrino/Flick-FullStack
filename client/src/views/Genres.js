import React from 'react'
import GenreDisplay from '../components/GenreDisplay';
import Typography from '@mui/material/Typography';


export default function Genres() {
  return (
<Typography sx={{background:"radial-gradient(ellipse at bottom, #6371a8 0%, #081a36 100%)", backgroundSize: "300vh", backgroundRepeat: "no-repeat"}}>
    <GenreDisplay/>
</Typography>
  )
}
