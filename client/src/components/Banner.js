import React, { useEffect, useContext, useState } from 'react';
import {MovieContext} from '../context/MovieContext';
import {AppContext} from '../context/AppContext';
import requests from '../api/requests'
import axios from '../api/axios'
import '../css/banner.css'
import WhiteButton from './WhiteButton'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import Progress from './Progress';
import Tooltip from '@mui/material/Tooltip';

const baseUrl = "https://image.tmdb.org/t/p/original/";


export default function Banner() {
    const [movie, setMovie] = useState()
    const navigate = useNavigate()
    const {addMovie, watchList, removeMovie} = useContext(MovieContext)
    const [inList, setInList] = useState(false)
    const {setAlert} = useContext(AppContext)
    
    useEffect(()=>{
            async function getMovie(){
                const request = await axios.get(requests.trendingMovies)

                setMovie(request.data.results[
                    Math.floor(Math.random()*request.data.results.length-1)
                ]
                );
                return request;
            }
            getMovie();
        },[]);

    useEffect(()=>{
        let newList = watchList.slice()
        for(let film of newList){
          if(film?.id === movie?.id){
            setInList(true)
          }
        }
    },[movie])

    const handleRemove=(movie)=>{
            removeMovie(movie)
            setAlert({msg:`${movie.title} has been removed from your list`,color:"primary"})
            setInList(!inList)
        }

    const handleAdd=(movie)=>{
        addMovie(movie)
        setAlert({msg:`${movie.title} has been added to your list`,color:"primary"})
        setInList(!inList)
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
  <header className="banner" style={{backgroundSize:"cover", backgroundImage:`url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`, backgroundPosition:"center center"}}>
    <div className="banner_contents">
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
        
    </div>
  </header>)
}