import React, {useState, useContext, useEffect} from 'react';
import useTopRated from '../hooks/useTopRated';
import useTrending from '../hooks/useTrending';
import useAction from '../hooks/useAction';
import useComedy from '../hooks/useComedy';
import useDrama from '../hooks/useDrama';
import useHorror from '../hooks/useHorror';
import useSciFi from '../hooks/useSciFi';
import useRomance from '../hooks/useRomance';
import {MovieContext} from '../context/MovieContext';
import {AppContext} from '../context/AppContext';
import '../css/row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import BlueButton from './BlueButton';
import PurpButton from './PurpButton';
import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import Progress from './Progress';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';
import Typography from '@mui/material/Typography';

const baseUrl = "https://image.tmdb.org/t/p/original/";

export default function Rows() {

    const {addMovie, removeMovie, watchList} = useContext(MovieContext)
    const topRated = useTopRated()
    const trending = useTrending()
    const action = useAction()
    const comedy = useComedy()
    const drama = useDrama()
    const horror = useHorror()
    const sciFi = useSciFi()
    const romance = useRomance()

    const [trailerUrl, setTrailerUrl] = useState("")
    const [movieForButton, setMovieForButton] = useState({})
    const navigate = useNavigate()
    const [inList, setInList] = useState(false)
    const {user, setAlert} = useContext(AppContext)

    useEffect(()=>{
      for(let film of watchList){
        if(film?.tmdb_id === movieForButton?.id || film?.id === movieForButton?.id){
          setInList(true)
          return
        }
      }
      setInList(false)
  },[movieForButton])

    const handleRemove=(movieForButton)=>{
            removeMovie(movieForButton)
            setAlert({msg:`${movieForButton.title} has been removed from your list`,color:"primary"})
            setInList(!inList)
            const source=CancelToken.source();
            const dropMovie=async()=>{
                const response = await apiMovie.removeMovieFromWl(user.token, movieForButton.id, source.token)
                console.log(response)
            }
            dropMovie()
            return ()=>{source.cancel();}
        }

    const handleAdd=(movieForButton)=>{
        addMovie(movieForButton)
        setAlert({msg:`${movieForButton.title} has been added to your list`,color:"primary"})
        setInList(!inList)
        const source=CancelToken.source();
        const createMovie=async()=>{
            const response = await apiMovie.postMovieToWl(user.token, movieForButton.id, source.token)
            console.log(response)
        }
        createMovie()
        return ()=>{source.cancel();}
    }

    if(!watchList){
      return(
      <Box sx={{display:"flex"}}>
        <Progress/>
      </Box>
      )
    }
    if(!topRated){
      return(
      <Box sx={{display:"flex"}}>
        <Progress/>
      </Box>
      )
    }
    if(!trending){
      return(
      <Box sx={{display:"flex"}}>
        <Progress/>
      </Box>
      )
    }
    if(!action){
      return(
      <Box sx={{display:"flex"}}>
        <Progress/>
      </Box>
      )
    }
    if(!comedy){
      return(
      <Box sx={{display:"flex"}}>
        <Progress/>
      </Box>
      )
    }
    if(!horror){
      return(
      <Box sx={{display:"flex"}}>
        <Progress/>
      </Box>
      )
    }
    if(!drama){
      return(
      <Box sx={{display:"flex"}}>
        <Progress/>
      </Box>
      )
    }
    if(!romance){
      return(
      <Box sx={{display:"flex"}}>
        <Progress/>
      </Box>
      )
    }
    if(!sciFi){
      return(
      <Box sx={{display:"flex"}}>
        <Progress/>
      </Box>
      )
    }


    const opts ={
      height: "390",
      width:"100%",
      playerVars: {
        autoplay: 1,
      }
    }

    const handleClick = (movie) => {
      if(trailerUrl){
        setTrailerUrl("")
      }else{
        movieTrailer(movie?.title || "")
        .then((url)=>{
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get('v'));
            setMovieForButton(movie)
        }).catch((error)=> console.log(error));
      }
    }




  return (<>
  
  <div className="watchlist-bg">
  <Typography className="row">
    <h2 className="genre">Your Watch List</h2>

    <div className="row_posters">

        {watchList.map(movie=>(
              <img 
                  className ="row_poster"
                  key = {movie.id} 
                  onClick={()=>handleClick(movie)}
                  src={`${baseUrl}${movie.poster_path}`} 
                  alt={movie.title}
                  />
        ))}
    </div>
    </Typography>
    
  </div>
  <Typography className="row">
    <h2 className="genre">Top Rated</h2>

    <div className="row_posters">

        {topRated.map(movie=>(
              <img 
                  className ="row_poster"
                  key = {movie.id} 
                  onClick={()=>handleClick(movie)}
                  src={`${baseUrl}${movie.poster_path}`} 
                  alt={movie.title}
                  />
        ))}
    </div>
    
  </Typography>

  <Typography className="row">
    <h2 className="genre">Trending Now</h2>

    <div className="row_posters">

        {trending.map(movie=>(

              <img 
                  className ="row_poster" 
                  key = {movie.id} 
                  onClick={()=>handleClick(movie)}
                  src={`${baseUrl}${movie.poster_path}`} 
                  alt={movie.title}
                />
        ))}
    </div>
    
  </Typography>
  {trailerUrl && 
  <>
  <div className="trailer-content">
  {inList? <PurpButton onClick={()=>handleRemove(movieForButton)}>Remove From List</PurpButton>:<PurpButton onClick={()=>handleAdd(movieForButton)}>Add to Watch List</PurpButton>}
  <h1 className="trailer-title">{movieForButton?.title} Trailer</h1>
   {movieForButton?.tmdb_id ? <BlueButton onClick={()=>navigate('/moviecollection/'+movieForButton.tmdb_id)}>More Info</BlueButton> :<BlueButton onClick={()=>navigate('/moviecollection/'+movieForButton.id)}>More Info</BlueButton>}
  
  </div>
  <Youtube videoId = {trailerUrl} opts={opts}/>
  </>
  }
  <Typography className="row">
    <h2 className="genre">Horror</h2>

    <div className="row_posters">

        {horror.map(movie=>(
              <img 
                  className ="row_poster" 
                  key = {movie.id} 
                  onClick={()=>handleClick(movie)}
                  src={`${baseUrl}${movie.poster_path}`} 
                  alt={movie.title}
                />
        ))}
    </div>
   
  </Typography>
  <Typography className="row">
    <h2 className="genre">Comedy</h2>

    <div className="row_posters">

        {comedy.map(movie=>(
              <img 
                  className ="row_poster" 
                  key = {movie.id} 
                  onClick={()=>handleClick(movie)}
                  src={`${baseUrl}${movie.poster_path}`} 
                  alt={movie.title}
                />
        ))}
    </div>
    
  </Typography>
  <Typography className="row">
    <h2 className="genre">Drama</h2>

    <div className="row_posters">

        {drama.map(movie=>(
              <img 
                  className ="row_poster" 
                  key = {movie.id} 
                  onClick={()=>handleClick(movie)}
                  src={`${baseUrl}${movie.poster_path}`} 
                  alt={movie.title}
                />
        ))}
    </div>
    
  </Typography>
  <Typography className="row">
    <h2 className="genre">Action</h2>

    <div className="row_posters">

        {action.map(movie=>(
              <img 
                  className ="row_poster" 
                  key = {movie.id} 
                  onClick={()=>handleClick(movie)}
                  src={`${baseUrl}${movie.poster_path}`} 
                  alt={movie.title}
                />
        ))}
    </div>
    
  </Typography>
  <Typography className="row">
    <h2 className="genre">Romance</h2>

    <div className="row_posters">

        {romance.map(movie=>(
              <img 
                  className ="row_poster" 
                  key = {movie.id} 
                  onClick={()=>handleClick(movie)}
                  src={`${baseUrl}${movie.poster_path}`} 
                  alt={movie.title}
                />
        ))}
    </div>
 
  </Typography>
  <Typography className="row">
    <h2 className="genre">SciFi</h2>

    <div className="row_posters">

        {sciFi.map(movie=>(
              <img 
                  className ="row_poster" 
                  key = {movie.id} 
                  onClick={()=>handleClick(movie)}
                  src={`${baseUrl}${movie.poster_path}`} 
                  alt={movie.title}
                />
        ))}
    </div>
  </Typography>
  
  
  </>)
}
