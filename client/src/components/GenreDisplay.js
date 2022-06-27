import React, {useContext} from 'react';
import {MovieContext} from '../context/MovieContext';
import useGenres from '../hooks/useGenres';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../css/genredisplay.css'
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';



export default function OutlinedCard() {
    const navigate = useNavigate()
    const genres = useGenres()

  return (   <>
      <Box sx={{ width: '100%'}} >
      <Typography variant="h3" color="white"sx={{display: 'flex', justifyContent: 'center', pt:8}}>
    Genres
    
    </Typography>
      <Stack spacing={0}>
       

              <Box style={{display:"flex", flexDirection:"row", paddingBottom:30, justifyContent:"center"}}>

                {genres?.slice(0,6).map(genre =>(
          <Box key ={genre.id} className="genre-card" onClick={()=>navigate(`/genres/${genre.name}/${genre.id}`)}>
            <Card variant="outlined" sx={{pb:15, pt:15, borderRadius:5, background:"url(https://res.cloudinary.com/dccf9vnoo/image/upload/v1655518690/frefr_ld4tzt.jpg)", backgroundSize:"cover", backgroundRepeat: "no-repeat"}}>

        
                            <CardContent sx={{textAlign:"center"}}>

                            <Typography variant="h5" component="div" color="white" backgroundColor="rgba(0,0,0,.5)" pt="5px" pb="5px" borderRadius="30px">
                                {genre.name}
                            </Typography>
                            </CardContent>

            </Card>
            </Box>
                ))}
            </Box>

        <Box style={{display:"flex", flexDirection:"row", paddingBottom:30, justifyContent:"center"}}>

{genres?.slice(6,13).map(genre =>(
  <Box key ={genre.id} className="genre-card" onClick={()=>navigate(`/genres/${genre.name}/${genre.id}`)}>
<Card variant="outlined" sx={{pb:15, pt:15, borderRadius:5, background:"url(https://res.cloudinary.com/dccf9vnoo/image/upload/v1655518690/frefr_ld4tzt.jpg)", backgroundSize:"cover", backgroundRepeat: "no-repeat"}}>


            <CardContent sx={{textAlign:"center"}}>

            <Typography variant="h5" component="div" color="white" backgroundColor="rgba(0,0,0,.5)" pt="5px" pb="5px" borderRadius="30px">
                {genre.name}
            </Typography>
            </CardContent>

</Card>
</Box>
))}
</Box>


        <Box style={{display:"flex", flexDirection:"row", paddingBottom:30, justifyContent:"center"}}>

{genres?.slice(13,19).map(genre =>(
  <Box key ={genre.id} className="genre-card" onClick={()=>navigate(`/genres/${genre.name}/${genre.id}`)}>
<Card variant="outlined" sx={{pb:15, pt:15, borderRadius:5, background:"url(https://res.cloudinary.com/dccf9vnoo/image/upload/v1655518690/frefr_ld4tzt.jpg)", backgroundSize:"cover", backgroundRepeat: "no-repeat"}}>


            <CardContent sx={{textAlign:"center"}}>

            <Typography variant="h5" component="div" color="white" backgroundColor="rgba(0,0,0,.5)" pt="5px" pb="5px" borderRadius="30px">
                {genre.name}
            </Typography>
            </CardContent>

</Card>
</Box>
))}
</Box>

      </Stack>
    </Box>




















  </> );
}



















        
        
  
  


    


