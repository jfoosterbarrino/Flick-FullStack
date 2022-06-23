import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const baseUrl = "https://image.tmdb.org/t/p/original/";

export default function RecipeReviewCard({review}) {
    const value = Math.round((review.author_details.rating/2).toFixed(.5));
    const [content, setContent] = useState(review.content.slice(0,200)+"...");
    const [open, setOpen] = useState(false)

    const handleClose=()=>{
      setContent(review.content.slice(0,200)+"...")
      setOpen(false)
    }

    const handleOpen =()=>{
      setContent(review.content)
      setOpen(true)
    }


  return (
    <Typography sx={{display:"flex", justifyContent:"center"}}>
    <Card sx={{ width: "100%", mb:2,mt:5, backgroundColor: "white"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#c89ece" }} aria-label="recipe">
           {!review.author_details.avatar_path || review.author_details.avatar_path.includes("gravatar")?<img height="40px" src="https://res.cloudinary.com/dccf9vnoo/image/upload/v1655277848/flicklogo_weirr1.png"/>:<img height="40px" src={`${baseUrl}${review.author_details.avatar_path}`}/>}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <FavoriteIcon />
          </IconButton>
        }
        title={review.author}
        subheader={review.created_at}
      />


<Typography sx={{display: 'flex', justifyContent: 'center'}}>
    <Box
      sx={{
        width: 200,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={1}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    
    </Box>
    </Typography>


      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{fontFamily:"Lora, serif;"}}>
          {content}
        
        </Typography>
      </CardContent>
      <Typography sx={{display:"flex", justifyContent: 'right', m:2}}>
      {open?
        <ExpandLessIcon onClick={()=>handleClose()}/>
        :
        <ExpandMoreIcon onClick={()=>handleOpen()} />
      }
      </Typography>
      
    </Card>
  </Typography>);
}