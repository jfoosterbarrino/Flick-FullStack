import React,{useContext} from 'react'
import {MovieContext} from '../context/MovieContext'
import {AppContext} from '../context/AppContext'
import '../css/watchlist.css'
import PurpButton from './PurpButton';
import {useNavigate} from 'react-router-dom'
import Typography from '@mui/material/Typography'
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import Box from '@mui/material/Box';
import Progress from './Progress';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import useWlByUser from '../hooks/useWlByUser';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';

const baseUrl = "https://image.tmdb.org/t/p/original/";

export default function WatchList() {
    const { removeMovie, clearList} = useContext(MovieContext)
    const {user, setAlert} = useContext(AppContext)
    const watchList = useWlByUser(user.id)
    const navigate = useNavigate()

    const handleClear=() => {
      clearList()
      setAlert({msg:"Watch List has been cleared",color:"primary"})
      const source=CancelToken.source();
      const dropMovies=async()=>{
          const response = await apiMovie.removeAllWl(user.token, source.token)
      }
      dropMovies()
      return ()=>{source.cancel();}
    }

    const handleRemove=(movie)=>{
      removeMovie(movie)
      setAlert({msg:`${movie.title} has been removed from your list`,color:"primary"})
      const source=CancelToken.source();
      const dropMovie=async()=>{
          const response = await apiMovie.removeMovieFromWl(user.token, movie.id, source.token)
      }
      dropMovie()
      return ()=>{source.cancel();}
    }

    if(!watchList){
      return(
      <Box sx={{display:"flex"}}>
        <Progress/>
      </Box>
      )
    }



  return (<>

<Typography variant="h3" sx={{pt:8}}className="watchlist-title">{user.first_name} {user.last_name}'s Watch List</Typography>
{watchList?.length>0 ?
<Typography sx={{display:"flex", justifyContent: 'center', mt:5}}>
<PurpButton onClick={()=>{handleClear()}}>CLEAR LIST</PurpButton>
</Typography>
:
<h3 style={{color:"#9066a3", textAlign:"center", marginTop:20}}>You currently have no movies in your Watch List</h3>
}

    <div className="container">
        {watchList?.map(movie=>(<>
    <div  key={movie.id} className="box" style={{backgroundImage:`url(${baseUrl}${movie.backdrop_path})`, backgroundPosition:"center center", backgroundRepeat: "no-repeat", backgroundSize:"cover"}}>
        <span><small>{movie.title}</small></span>          
          <Typography sx={{backgroundColor:"transparent", display:"flex", justifyContent:"space-between", color:"white", m:3}}>
          <LiveTvIcon onClick= {()=>navigate(`/moviecollection/${movie.tmdb_id}`)}/>
          <RemoveCircleSharpIcon onClick={()=>{handleRemove(movie)}}/>
          </Typography>
    </div> 
    </>))}
  </div>

  </>)
}
