import React, {useContext, useState, useEffect} from 'react'
import {MovieContext} from '../context/MovieContext'
import {AppContext} from '../context/AppContext'
import '../css/card.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import CoolButton from './CoolButton';
import BlueButton from './BlueButton';
import PurpButton from './PurpButton';
import {useParams} from 'react-router-dom';
import useMovieById from '../hooks/useMovieById';
import Rating from './Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useCastByMovie from '../hooks/useCastByMovie';
import '../css/row.css';
import useProvidersByMovie from '../hooks/useProvidersByMovie';
import useReviewsByMovie from '../hooks/useReviewsByMovie';
import Review from './Review';
import Link from '@mui/material/Link';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const baseUrl = "https://image.tmdb.org/t/p/original/";

export default function FullWidthGrid() {

    const{movieId} = useParams()
    const movie = useMovieById(movieId)
    const cast = useCastByMovie(movieId)
    const providers = useProvidersByMovie(movieId)
    const reviews = useReviewsByMovie(movieId)
    


    const [trailerUrl, setTrailerUrl] = useState("")

    const {addMovie, removeMovie, addRecommend, removeRecommend, watchList, recommendList} = useContext(MovieContext)
    const [inList, setInList] = useState(false)
    const [inRecommend, setInRecommend] = useState(false)
    const {setAlert, user} = useContext(AppContext)
    // const recommendList = useMoviesByUser(user?.id)
    // const watchList = useWlByUser(user?.id)
    const streaming =providers?.flatrate?.concat(providers.buy, providers.rent)
      
    

    useEffect(()=>{
        for(let film of watchList){
          if(film?.tmdb_id === movie?.id || film?.id === movie?.id){
            setInList(true)
            return
          }
        }
        setInList(false)
    },[movie, movieId, watchList])

    useEffect(()=>{
     for(let picture of recommendList){
          if(picture?.tmdb_id === movie?.id || picture?.id === movie?.id){
            setInRecommend(true)
            return
          }
        }
        setInRecommend(false)
      },[movie, movieId, recommendList])

    const opts ={
      height: "390",
      width:"100%",
      playerVars: {
        autoplay: 1,
      }
    }

    const handleRemove=(movie)=>{
        removeMovie(movie)
        setAlert({msg:`${movie.title} has been removed from your Watch List`,color:"primary"})
        setInList(!inList)
        const source=CancelToken.source();
        const dropMovie=async()=>{
            const response = await apiMovie.removeMovieFromWl(user.token, movie.id, source.token)
            console.log(response)
        }
        dropMovie()
        return ()=>{source.cancel();}
    }
    const handleAdd=(movie)=>{
        addMovie(movie)
        setAlert({msg:`${movie.title} has been added to your Watch List`,color:"primary"})
        setInList(!inList)
        const source=CancelToken.source();
        const createMovie=async()=>{
            const response = await apiMovie.postMovieToWl(user.token, movie.id, source.token)
            console.log(response)
        }
        createMovie()
        return ()=>{source.cancel();}
    }

    const handleRemoveRecommend=(movie)=>{
        removeRecommend(movie)
        setAlert({msg:`${movie.title} has been removed from your Recommend It List`,color:"primary"})
        setInRecommend(!inRecommend)
        const source=CancelToken.source();
        const rmMovie=async()=>{
            const response = await apiMovie.removeMovieFromUser(user.token, movie.id, source.token)
            console.log(response)
        }
        rmMovie()
        return ()=>{source.cancel();}


    }
    const handleAddRecommend=(movie)=>{
        addRecommend(movie)
        setAlert({msg:`${movie.title} has been added to your Recommend It List`,color:"primary"})
        setInRecommend(!inRecommend)
        const source=CancelToken.source();
        const makeMovie=async()=>{
            const response = await apiMovie.postMovieToUser(user.token, movie.id, source.token)
            console.log(response)
        }
        makeMovie()
        return ()=>{source.cancel();}
    }

    const handleClick = (movie) => {
      if(trailerUrl){
        setTrailerUrl("")
      }else{
        movieTrailer(movie?.title || "")
        .then((url)=>{
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get('v'));
        }).catch((error)=> console.log(error));
      }
    }



    return (
    <Box sx={{ flexGrow: 1, p:20, background:"radial-gradient(ellipse at bottom, #6371a8 0%, #081a36 100%)" }}>
      <Grid container spacing={20}>
        <Grid item xs={12} sm={12} md={5} sx={{display: 'flex', flexDirection: 'column',alignItems: 'center', fontFamily:"Lora, serif;"}}>
        
            <div className="card"> 
                <img 
                    src={`${baseUrl}${movie?.poster_path}`} 
                    alt={movie?.title}
                />
                <div className="con-text">
                    <br/>
                <h2>{movie?.title}</h2>
                <br/>
                <p>
                    {movie?.overview}
                </p>
                </div>
            </div>
            
          {reviews?.map(review=>(
            
            <Review key={review.id} review={review}/>
            
          ))}
      
        </Grid>
        <Grid item xs={12} sm={12}  md={7}>

    <Box sx={{ width: '100%', backgroundColor:"transparent"}}>
      <Stack spacing={2}>
        <Item>{trailerUrl ? <Youtube videoId = {trailerUrl} opts={opts}/>:<img alt="" className="backdrop" src = {`${baseUrl}${movie?.backdrop_path}`}/>}
          

        </Item>
        <Item sx={{pb:2, p:2, pr:5, pl:5}}>
<Typography sx={{color:"#081a36", fontFamily:"Lora, serif;"}}>
          <h1>{movie?.title}</h1>
          <br/>
          <p>
                    {movie?.overview}
                    <br/>
                    <br/>
          
          <Rating movie={movie}/>
          
          <br/>          
                    Home Page: <Link href={movie?.homepage}>{movie?.homepage}</Link>
                    <br/>
                    Duration: {movie?.runtime} minutes
                    <br/>
                    Release Date: {movie?.release_date}
                    <br/>
                    Rating: {movie?.vote_average}/10
                </p>
</Typography>

       <Typography sx={{display: 'flex', justifyContent:"space-around",pt:7, pb:3}}>
       {inRecommend ? <CoolButton onClick={()=>handleRemoveRecommend(movie)}>Unrecommend It</CoolButton>:<CoolButton onClick={()=>handleAddRecommend(movie)}>Recommend It</CoolButton> }
        <PurpButton onClick={()=>handleClick(movie)}>Watch Trailer</PurpButton>
        {inList ? <BlueButton onClick={()=>handleRemove(movie)}>Remove Movie</BlueButton>:<BlueButton onClick={()=>handleAdd(movie)}>Add Movie</BlueButton> }
        </Typography>

        </Item>

 
   


        <Item sx={{fontFamily:"Lora, serif;"}}>
          <h1 style={{color:"#081a36", textAlign:"center"}}>Cast</h1>
        <div className="row_posters">
          {cast?.map(person=>person?.profile_path?<>
                            <img 
                            className ="row_poster"
                            key = {person?.id} 
                            src={`${baseUrl}${person?.profile_path}`} 
                            alt={person?.name}
                            title={person?.name}
                            />
                      
                           
          </>
          :"")}
          </div>
        </Item>

            {streaming?.length>0?
        <Item sx={{fontFamily:"Lora, serif;"}}>
          <h1 style={{color:"#081a36", textAlign:"center"}}>Streaming Services</h1>
        <div className="row_posters">
          {streaming?.map(provider=>provider?.logo_path?<>
                            <img 
                            className ="row_poster"
                            key = {provider?.provider_id} 
                            src={`${baseUrl}${provider?.logo_path}`} 
                            alt={provider?.provider_name}
                            title={provider?.provider_name}
                            />
                      
                           
          </>:
          "")}
          </div>

        </Item>
        :
        ""

}



      </Stack>
    </Box>

        </Grid>
      </Grid>
    </Box>
  );
}

