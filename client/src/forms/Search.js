import React, {useEffect, useState, useContext} from 'react';
import Typography from '@mui/material/Typography'
import apiMovie from '../api/apiMovie';
import TextField from '@mui/material/TextField';
import '../css/card.css'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import {AppContext} from '../context/AppContext';
import {CancelToken} from 'apisauce';

const baseUrl = "https://image.tmdb.org/t/p/original/";

export default function Search() {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const navigate = useNavigate()
    const {user} =useContext(AppContext)


    useEffect(()=>{
      const source = CancelToken.source()
      const showMovies=async()=>{
        const response = await apiMovie.getMoviesBySearch(user.token, search, source.token)
        setSearchResults(response.data?.data?.results)
    }
    showMovies()
    },[search, user.token])

    const handleChange=event=>{
      setSearch(event.target.value)
    }

console.log(search)
  return (<Box sx={{ background:"radial-gradient(ellipse at bottom, #6371a8 0%, #081a36 100%)", height:"500vh" }}>
  <Typography variant="h3" color="white"sx={{display: 'flex', justifyContent: 'center', mb:8, pt:8}}>
    Search Movies
    </Typography>
  <Typography sx={{display: 'flex', justifyContent: 'center'}}>
    <form style={{display:"flex", justifyContent: 'center'}}>
        <TextField
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          color="primary"
          value ={search}
          sx={{backgroundColor: 'white'}}
        />
    </form>
</Typography>

<Grid container spacing={2}>

{searchResults?.map(movie=>movie.poster_path?(
  <Grid key={movie.id} item xs={6} sm={4} md={4} lg={3} xl={3}sx={{display: 'flex',justifyContent: 'center', mt:8}}>
    {movie?.tmdb_id ?
    
      <div className="card" onClick={()=>navigate(`/moviecollection/${movie.tmdb_id}`)} style={{width:"300px", height:"480px"}}> 
            <img 
                src={`${baseUrl}${movie.poster_path}`} 
                alt={movie.title}
            />
            <div className="con-text">
                <br/>
            <h2>{movie.title}</h2>
            <br/>
            <p>
                {movie.overview.slice(0,300)}
            </p>
            </div>
        </div>
        :
        <div className="card" onClick={()=>navigate(`/moviecollection/${movie.id}`)} style={{width:"300px", height:"480px"}}> 
        <img 
            src={`${baseUrl}${movie.poster_path}`} 
            alt={movie.title}
        />
        <div className="con-text">
            <br/>
        <h2>{movie.title}</h2>
        <br/>
        <p>
            {movie.overview.slice(0,300)}
        </p>
        </div>
    </div>
    }
  </Grid>
)
:
"")}

</Grid>

  </Box>)
}
