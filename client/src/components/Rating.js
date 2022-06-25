import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography'


export default function TextRating({movie}) {
  const value = Math.round((movie?.vote_average/2).toFixed(.5));


  return (
    <Typography sx={{display: 'flex', justifyContent: 'center'}}>
    <Box
      sx={{
        width: 200,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={1}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    
    </Box>
    </Typography>
  );
}  
