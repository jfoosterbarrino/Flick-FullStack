import React, {useContext, useState} from 'react';
import {AppContext} from '../context/AppContext';
import {MovieContext} from '../context/MovieContext'
import useUsers from '../hooks/useUsers';
import UserDisplay from '../components/UserDisplay';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import apiMovie from '../api/apiMovie';
import apiUser from '../api/apiUser';
import useMoviesByUser from '../hooks/useMoviesByUser';
import '../css/watchlist.css'
import '../css/explore.css'
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import {useNavigate} from 'react-router-dom'
import LiveTvIcon from '@mui/icons-material/LiveTv';
import PurpButton from '../components/PurpButton';
import WhiteButton from '../components/WhiteButton';
import { useEffect } from 'react';
import {CancelToken} from 'apisauce';
import AddCircleIcon from '@mui/icons-material/AddCircle';


  const baseUrl = "https://image.tmdb.org/t/p/original/";



export default function Explore() {
    const users = useUsers()
    const {user, recUser, setRecUser, setAlert} = useContext(AppContext)
    const myMovies = useMoviesByUser(user.id)
    const {removeRecommend, clearRecommend, addMovie} = useContext(MovieContext)
    const navigate = useNavigate()
    const [recList, setRecList] = useState([])
    const [recName, setRecName] = useState("")


    const handleClearRecommend=() => {
        clearRecommend()
        setAlert({msg:"Recommend List has been cleared",color:"primary"})
        const source=CancelToken.source();
        const removeMovies=async()=>{
            const response = await apiMovie.removeAllMovies(user.token, source.token)
            console.log(response)
        }
        removeMovies()
        return ()=>{source.cancel();}
      }

    const handleRemoveRecommend=(movie)=>{
        removeRecommend(movie)
        setAlert({msg:`${movie.title} has been removed from your Recommend List`,color:"primary"})
        const source=CancelToken.source();
        const removeMovie=async()=>{
            const response = await apiMovie.removeMovieFromUser(user.token, movie.tmdb_id, source.token)
            console.log(response)
            if (response){
                setAlert({msg: `Recommend It List Updated and Saved`, color: "background"})
            }else if(response === false && response !== undefined){
                setAlert({msg: `That movie wasn't in your list`, color: "error"})
            }
        }
        removeMovie()
        return ()=>{source.cancel();}
      }

      const handleAdd=(movie)=>{
        addMovie(movie)
        setAlert({msg:`${movie.title} has been added to your Watch List`,color: "primary"})
      }

      useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showMovies=async()=>{
                const response = await apiMovie.getMoviesByUser(user.token, recUser, source.token)
                setRecList(response)
            }
            showMovies()
            return ()=>{source.cancel();}
        },
        [recUser, setRecUser, user.token]
    )

      useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showUser=async()=>{
                const response = await apiUser.getUser(user.token, recUser, source.token)
                setRecName(response.first_name)
            }
            showUser()
            return ()=>{source.cancel();}
        },
        [recUser, setRecUser, user.token]
    )

  return (<Typography sx={{ background:"radial-gradient(ellipse at bottom, #6371a8 0%, #081a36 100%)", height:"250vh"}}>
    <Typography variant="h3" color="white"sx={{display: 'flex', justifyContent: 'center', mb:8, pt:8}}>
    Explore Recommendations
    
    </Typography>
    <Typography sx={{display: 'flex', justifyContent: 'center', mb:3}}>
    <WhiteButton onClick={()=>setRecUser(user.id)}>View My List</WhiteButton>
    </Typography>
    <Box sx={{ flexGrow: 1, ml:5, mr:5}}>
    
      <div className="rec-posters">
{users?.map(other=>(
    user.id === other.id?
    ""
    :
        
        <div   className="rec-poster">
            <UserDisplay  className="rec-poster" user={other}/>
        </div>
  ))}
      </div>
    </Box>

    {recUser === user.id?
    <>
        <br/>
        <br/>
        <br/>
        <h1 className="watchlist-title">My Recommendations</h1>
        {myMovies?.length>0 ?
        
        <Typography sx={{display:"flex", justifyContent: 'center', mt:5}}>
       <PurpButton onClick={()=>{handleClearRecommend()}}>CLEAR LIST</PurpButton>
        </Typography>
        :
        <h3 style={{color:"#9066a3", textAlign:"center", marginTop:20}}>You currently have no movies in your Recommend List</h3>
}

      
        <div className="container">
            {myMovies?.map(movie=>(<>
        <div  className="box" style={{backgroundImage:`url(${baseUrl}${movie.backdrop_path})`, backgroundPosition:"center center", backgroundRepeat: "no-repeat", backgroundSize:"cover"}}>
            <span><small>{movie.title}</small></span>          
              <Typography sx={{backgroundColor:"transparent", display:"flex", justifyContent:"space-between", color:"white", m:3}}>
              <LiveTvIcon onClick= {()=>navigate(`/moviecollection/${movie.tmdb_id}`)}/>
              <RemoveCircleSharpIcon onClick={()=>{handleRemoveRecommend(movie)}}/>
              </Typography>
        </div> 
        </>))}
      </div>
    </>



    :
    <>
    <br/>
    <br/>
    <br/>

    {recName? <h1 className="watchlist-title">{recName}'s Recommendations</h1>:""}
    {!recName || recList?.length>0 ?
        ""
        :
        <h3 style={{color:"#9066a3", textAlign:"center", marginTop:20}}>{recName} currently has no movies in their Recommend List</h3>
}

    <div className="container">
        {recList?.map(movie=>(<>
    <div  className="box" style={{backgroundImage:`url(${baseUrl}${movie.backdrop_path})`, backgroundPosition:"center center", backgroundRepeat: "no-repeat", backgroundSize:"cover"}}>
        <span><small>{movie.title}</small></span>          
          <Typography sx={{backgroundColor:"transparent", display:"flex", justifyContent:"space-between", color:"white", m:3}}>
          <LiveTvIcon onClick= {()=>navigate(`/moviecollection/${movie.tmdb_id}`)}/>
          <AddCircleIcon onClick={()=>handleAdd(movie)}/>
          </Typography>
    </div> 
    </>))}
  </div>
  </>
    }

  </Typography>)
}








  


