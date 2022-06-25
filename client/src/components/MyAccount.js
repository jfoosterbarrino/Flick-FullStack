import React, {useContext, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DarkButton from './DarkButton';
import {MovieContext} from '../context/MovieContext';
import {AppContext} from '../context/AppContext';
import Avatar from '@mui/material/Avatar';
import useMoviesByUser from '../hooks/useMoviesByUser';
import {Link} from 'react-router-dom';
import useWlByUser from '../hooks/useWlByUser';


export default function MyAccount({user}) {
    const [content, setContent] = useState(<></>);
    const [open, setOpen] = useState(false)
    const recommendList = useMoviesByUser(user.id)
    const {setWatch, setRecommend, setHome, setSearch, setPopular, setGenre, setAdmin} = useContext(AppContext)
    const watchList =useWlByUser(user.id)

    const handleClose=()=>{
      setContent(<></>)
      setOpen(false)
    }
    const handleRecommend =()=>{
        setRecommend(true)
        setHome(false)
        setPopular(false)
        setGenre(false)
        setWatch(false)
        setSearch(false)
        setAdmin(false)
     
      }

      const handleWatch =()=>{
        setWatch(true)
        setHome(false)
        setPopular(false)
        setGenre(false)
        setRecommend(false)
        setSearch(false)
        setAdmin(false)
    
      }

    const handleOpen =()=>{
      setContent(<div style={{display:"flex", justifyContent:"space-around"}} >
        <Typography sx={{display:"flex", flexDirection:"column", alignItems:"left",justifyContent:"space-between", pl:3, pr:3}}>
            <div>
            <h4 style={{marginBottom:"10px"}}>Watch List<br/><hr/></h4>
            <div style={{marginBottom:"15px"}}>
                {watchList?.map((film)=>(
                    <p>{film.title}</p>
                ))}

            </div> 
            </div>
            <Link to='/watchlist' onClick={()=>handleWatch()}><DarkButton>View</DarkButton></Link>
        </Typography>

        <Typography sx={{display:"flex", flexDirection:"column", alignItems:"left",justifyContent:"space-between", pl:3, pr:2}}>  
            <div>
            <h4 style={{marginBottom:"10px"}}>Recommend List<br/><hr/></h4>
            <div style={{marginBottom:"15px"}}>
            {recommendList?.map((movie)=>(
                    <p>{movie.title}</p>
                ))}
            </div>
            </div>
            <Link to='/recommend' onClick={()=>handleRecommend()}><DarkButton sx={{position:"absolute", left:"50%"}}>View</DarkButton></Link>
        </Typography>
      </div>)
      setOpen(true)
    }


  return (
    <Typography sx={{display:"flex", justifyContent:"center"}}>
    <Card sx={{ width: 1000,mb:2,mt:5,color:"white",backgroundColor: "rgba(200,158,206,.7)", borderRadius:"20px", transition: "all 1s ease"}}>
      <Typography sx={{ display:"flex", justifyContent:"space-around"}}>
      <CardHeader
        title={user?.first_name +" "+ user?.last_name}
        subheader={user?.email}
        
      />
      <Avatar alt="Remy Sharp" src={user.img} sx={{ width: 56, height: 56,m:2 }}/>
      </Typography>

      <CardContent sx={{display: "flex", justifyContent:"center", flexDirection:"column"}}>
        {content}
      </CardContent>
      <Typography sx={{display:"flex", justifyContent: 'center', m:2}}>
      {open?
        <ExpandLessIcon onClick={()=>handleClose()}/>
        :
        <ExpandMoreIcon onClick={()=>handleOpen()}/>
      }
      </Typography>
      
    </Card>
  </Typography>);
}