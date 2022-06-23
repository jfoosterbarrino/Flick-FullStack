import React, {useState} from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import  MenuItem  from '@mui/material/MenuItem';
import  Typography  from '@mui/material/Typography';
import MovieForm from '../forms/MovieForm';
import useMovies from '../hooks/useMovies';
import Box from '@mui/material/Box';


export default function AdminSelectItem() {
    const [movie, setMovie] =useState()
    const movies = useMovies()

    const handleChange=(event)=>{
        console.log(event.target.value)
        if(event.target.value==='default'){
            setMovie()
            return
        }
        setMovie(JSON.parse(event.target.value))
    }

  return (
    <Box sx={{ background:"radial-gradient(ellipse at bottom, #c89ece 0%, #9066a3 100%)", height:"200vh", color:"white"}}>
          <Typography variant="h3" color="#081a36"sx={{display: 'flex', justifyContent: 'center', mb:8, pt:8}}>
    Admin
    </Typography>
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <FormControl>
            <InputLabel id="movie-label">Movie</InputLabel>
            <Select
                labelId="movie-label"
                label="Movie"
                name="movie_id"
                placeholder="Movie"
                sx={{mb:2, backgroundColor:"white", input:{color:"#081a36"}}}
                color="background"
                value={movie?JSON.stringify(movie):'default'}
                onChange={(event)=>handleChange(event)}
            >
                <MenuItem value="default"><em>Select Movie To Edit</em></MenuItem>
                {movies?.map(
                    (movie)=>(
                        <MenuItem key={movie.id} value={JSON.stringify(movie)}>{movie.title}</MenuItem>
                    )
                )}
            </Select>
        </FormControl>
</div>
        {movie ? 
            <>
                <Typography sx={{p:4, pt:10, textAlign: 'center',color:"#081a36"}} variant="h5">
                    Edit "{movie.title}"
                </Typography>
                <MovieForm movie={movie}/>
            </>
            :   
            <>
                <Typography sx={{p:4,pt:10, textAlign: 'center',color:"#081a36"}} variant="h5">
                    Create a New Movie
                </Typography>
                <MovieForm/>
            </>
            }
    </Box>
  )
}