import React, { useEffect, useContext, useState } from 'react';
import {MovieContext} from '../context/MovieContext';
import {AppContext} from '../context/AppContext';
import '../css/banner.css'
import WhiteButton from './WhiteButton'
import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import Progress from './Progress';
import {CancelToken} from 'apisauce';
import apiMovie from '../api/apiMovie';
import Typography from '@mui/material/Typography';


export default function Banner() {
    const [movie, setMovie] = useState()
    const navigate = useNavigate()
    const {addMovie, removeMovie, watchList} = useContext(MovieContext)
    const [inList, setInList] = useState(false)
    const {user, setAlert} = useContext(AppContext)
    
    
    useEffect(()=>{
            const source=CancelToken.source();
            const getMovie=async()=>{
                const request = await apiMovie.getTrending(user.token, source.token)

                setMovie(request.data?.data.results[
                    Math.floor(Math.random()*request.data?.data?.results.length-1)
                ]
                );
                return request;
            }
            getMovie();
        },[user.token]);

    useEffect(()=>{
        for(let film of watchList){
          if(film?.tmdb_id === movie?.id || film?.id === movie?.id){
            setInList(true)
            return
          }
        }
        setInList(false)
    },[movie, watchList])

    const handleRemove=(movie)=>{
            removeMovie(movie)
            setAlert({msg:`${movie.title} has been removed from your list`,color:"primary"})
            setInList(!inList)
            const source=CancelToken.source();
            const dropMovie=async()=>{
                const response = await apiMovie.removeMovieFromWl(user.token, movie.tmdb_id, source.token)
                console.log(response)

            }
            dropMovie()
            return ()=>{source.cancel();}
        }

    const handleAdd=(movie)=>{
        addMovie(movie)
        setAlert({msg:`${movie.title} has been added to your list`,color:"primary"})
        setInList(!inList)
        const source=CancelToken.source();
        const createMovie=async()=>{
            const response = await apiMovie.postMovieToWl(user.token, movie.id, source.token)
            console.log(response)
        }
        createMovie()
        return ()=>{source.cancel();}
    }

    if(!movie){
        return(
        <Box sx={{display:"flex"}}>
          <Progress/>
        </Box>
        )
      }

  

    console.log(movie)

    function truncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

  return (
  <Typography className="banner" style={{backgroundSize:"cover", backgroundImage:`url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`, backgroundPosition:"center center"}}>
    <Typography className="banner_contents">
        <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <h1 className="banner_desc">{truncate(movie?.overview, 150)}</h1>
        <div className="banner_buttons">
            {inList? <WhiteButton onClick={()=>handleRemove(movie)}>Remove Movie</WhiteButton>:<WhiteButton onClick={()=>handleAdd(movie)}>Add To List</WhiteButton>}
            <WhiteButton onClick={()=>navigate(`/moviecollection/${movie.id}`)}>More Info</WhiteButton>
        </div>
        <div className="banner-gradient">

        </div>
        
    </Typography>
  </Typography>)
}