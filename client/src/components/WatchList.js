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

const baseUrl = "https://image.tmdb.org/t/p/original/";

export default function WatchList() {
    const {watchList, removeMovie, clearList} = useContext(MovieContext)
    const {user, setAlert} = useContext(AppContext)
    const navigate = useNavigate()

    const handleClear=() => {
      clearList()
      setAlert({msg:"Watch List has been cleared",color:"primary"})
    }

    const handleRemove=(movie)=>{
      removeMovie(movie)
      setAlert({msg:`${movie.title} has been removed from your list`,color:"primary"})
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
    <div  className="box" style={{backgroundImage:`url(${baseUrl}${movie.backdrop_path})`, backgroundPosition:"center center", backgroundRepeat: "no-repeat", backgroundSize:"cover"}}>
        <span><small>{movie.title}</small></span>          
          <Typography sx={{backgroundColor:"transparent", display:"flex", justifyContent:"space-between", color:"white", m:3}}>
          <LiveTvIcon onClick= {()=>navigate(`/moviecollection/${movie.id}`)}/>
          <RemoveCircleSharpIcon onClick={()=>{handleRemove(movie)}}/>
          </Typography>
    </div> 
    </>))}
  </div>

  </>)
}
