import React, {useContext} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import {MovieContext} from '../context/MovieContext'
import {AppContext} from '../context/AppContext'
import useMoviesByGenre from '../hooks/useMoviesByGenre';
import {useParams} from 'react-router-dom';
import Rating from './Rating';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const baseUrl = "https://image.tmdb.org/t/p/original/";

export default function FullWidthGrid() {
    const navigate = useNavigate();
    const {genreId, genreName} = useParams();
    const movies = useMoviesByGenre(genreId);
    const {addMovie, removeMovie, watchList} = useContext(MovieContext);
    const {user, setAlert} = useContext(AppContext)
    // const watchList = useWlByUser(user?.id)

    const inWatchList = (movie)=>{
      for(let film of watchList){
        if(film?.tmdb_id === movie?.id || film?.id === movie?.id){
          return true
        }
      }
      return false
    }




    const handleAdd =(movie) => {
      addMovie(movie)
      setAlert({msg:`${movie.title} has been added to your list`,color:"primary"})
      const source=CancelToken.source();
      const createMovie=async()=>{
          const response = await apiMovie.postMovieToWl(user.token, movie.id, source.token)
          console.log(response)
      }
      createMovie()
      return ()=>{source.cancel();}
    }

    const handleRemove =(movie) => {
      removeMovie(movie)
      setAlert({msg:`${movie.title} has been removed from your list`,color:"primary"})
      const source=CancelToken.source();
      const dropMovie=async()=>{
          const response = await apiMovie.removeMovieFromWl(user.token, movie.id, source.token)
          console.log(response)
      }
      dropMovie()
      return ()=>{source.cancel();}
    }

    console.log(movies)


  return (
    <Box sx={{ flexGrow: 1, pl:15,pr:15, background:"radial-gradient(ellipse at bottom, #6371a8 0%, #081a36 100%)" }}>
        <Typography variant="h3" sx={{textAlign:"center", color:"white", paddingTop:8, pb:8}}>{genreName}</Typography>
            <Box sx={{ flexGrow: 1 }}>
              
      <Grid container spacing={5}>
        {movies?.map(movie=>(
        <Grid key={movie.id} item xs={4} sm={4} md={4} lg={4} xl={4}>
          <Item sx={{backgroundColor:"rgba(99,113,168,.8)", borderRadius:"30px"}}>

          <Card sx={{ display: 'flex',justifyContent: 'center',height: "38vh", background:`url(${baseUrl}${movie.backdrop_path})`, backgroundSize:"contain", backgroundRepeat:"no-repeat", borderRadius:"30px"}}>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5" sx={{color: 'white',borderRadius:"30px", backdropFilter:"blur(50px)",p:1}}>
                    {movie.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    
                </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-around',alignContent:'center', pl: 1, pb: 3, color:"white" }}>
        
                    <LiveTvIcon onClick={()=>navigate(`/moviecollection/${movie.id}`)}/>
                    <Rating movie={movie}/>
                    {inWatchList(movie) ?<IndeterminateCheckBoxIcon onClick={()=>handleRemove(movie)}/>:<AddBoxIcon onClick={()=>handleAdd(movie)}/>}

                </Box>
            </Box>

        </Card>

          </Item>
        </Grid>
            ))}
      </Grid>
    </Box>

</Box>
 );
}