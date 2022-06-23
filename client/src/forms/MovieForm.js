import {useState} from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import DarkButton from '../components/DarkButton';
import RedButton from '../components/RedButton';
import TextField from '@mui/material/TextField';
import {FormControl, FormHelperText, InputLabel, Select, MenuItem} from '@mui/material/';
import useGenres from '../hooks/useGenres';
import usePostMovie from '../hooks/usePostMovie';
import usePutMovie from '../hooks/usePutMovie';
import useDelMovie from '../hooks/useDelMovie';
import Typography from '@mui/material/Typography';



const FormSchema=Yup.object(
    {
        tmdb_id:Yup.number().integer(),
        title:Yup.string().required(),
        overview:Yup.string().required(),
        homepage:Yup.string().required(),
        release_date:Yup.string().required(),
        poster_path:Yup.string().required(),
        backdrop_path:Yup.string().required(),
        runtime:Yup.number().integer().required(),
        vote_average:Yup.number().required(),
        genre_id:Yup.number().integer().required(),
        genre_name:Yup.string()
    }
)

export default function MovieForm({ movie }){

    const genres= useGenres()

    const[newMovie, setNewMovie]=useState({})
    const[editMovie, setEditMovie]=useState({})
    const[deleteMovie, setDeleteMovie]=useState({})

    usePostMovie(newMovie)
    usePutMovie(editMovie, movie?.id)
    useDelMovie(deleteMovie)

    const initialValues={
        tmdb_id:movie?.tmdb_id ??"",
        title:movie?.title ?? '',
        overview:movie?.overview ?? '',
        homepage:movie?.homepage ?? '',
        release_date:movie?.release_date??"",
        poster_path:movie?.poster_path ?? '',
        backdrop_path:movie?.backdrop_path ?? '',
        runtime:movie?.runtime ??'',
        vote_average:movie?.vote_average ??"",
        genre_id:movie?.genre_id ??"",
        genre_name:movie?.genre_name ?? ''
    }
    
    const handleSubmit=(values, resetForm)=>{
        if (movie){
            setEditMovie(values)
        }else{
            setNewMovie(values)
        }
        console.log(values)
        resetForm(initialValues)
    }
    
    const handleDelete=()=>{
        setDeleteMovie(movie)
    }

    const formik = useFormik({
        initialValues:initialValues,
        validationSchema:FormSchema,
        onSubmit:(values, {resetForm})=>{handleSubmit(values, resetForm)},
        enableReinitialize:true
    })


    return(
        <form onSubmit={formik.handleSubmit} style={{display:"flex", flexDirection: "column", alignItems: "center"}}>
            <TextField
                id="title"
                name="title"
                fullWidth
                sx={{mb:2, mt:2, backgroundColor:"white",width:"30%", input:{color:"#081a36"}}}
                color="background"
                label="Title"
                placeholder="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}         
            />
            <TextField
                id="overview"
                name="overview"
                fullWidth
                sx={{mb:2, backgroundColor:"white",width:"30%", input:{color:"#081a36"}}}
                color="background"
                label="Overview"
                placeholder="Overview"
                value={formik.values.overview}
                onChange={formik.handleChange}
                error={formik.touched.overview && Boolean(formik.errors.overview)}
                helperText={formik.touched.overview && formik.errors.overview}            
            />
            <TextField
                id="homepage"
                name="homepage"
                fullWidth
                sx={{mb:2, backgroundColor:"white",width:"30%", input:{color:"#081a36"}}}
                color="background"
                label="Homepage"
                placeholder="Homepage"
                value={formik.values.homepage}
                onChange={formik.handleChange}
                error={formik.touched.homepage && Boolean(formik.errors.homepage)}
                helperText={formik.touched.homepage && formik.errors.homepage}            
            />
            <TextField
                id="release_date"
                name="release_date"
                fullWidth
                sx={{mb:2, backgroundColor:"white",width:"30%", input:{color:"#081a36"}}}
                color="background"
                label="Release Date"
                placeholder="Release Date"
                value={formik.values.release_date}
                onChange={formik.handleChange}
                error={formik.touched.release_date && Boolean(formik.errors.release_date)}
                helperText={formik.touched.release_date && formik.errors.release_date}            
            />
            <TextField
                id="poster_path"
                name="poster_path"
                fullWidth
                sx={{mb:2, backgroundColor:"white",width:"30%", input:{color:"#081a36"}}}
                color="background"
                label="Poster Image URL"
                placeholder="Poster Image URL"
                value={formik.values.poster_path}
                onChange={formik.handleChange}
                error={formik.touched.poster_path && Boolean(formik.errors.poster_path)}
                helperText={formik.touched.poster_path && formik.errors.poster_path}            
            />
            <TextField
                id="backdrop_path"
                name="backdrop_path"
                fullWidth
                sx={{mb:2, backgroundColor:"white",width:"30%", input:{color:"#081a36"}}}
                color="background"
                label="Photo Image Url"
                placeholder="Photo Image Url"
                value={formik.values.backdrop_path}
                onChange={formik.handleChange}
                error={formik.touched.backdrop_path && Boolean(formik.errors.backdrop_path)}
                helperText={formik.touched.backdrop_path && formik.errors.backdrop_path}            
            />

            <TextField
                id="runtime"
                name="runtime"
                fullWidth
                sx={{mb:2, backgroundColor:"white",width:"30%", input:{color:"#081a36"}}}
                color="background"
                label="Runtime"
                placeholder="Runtime (mintues)"
                value={formik.values.runtime}
                onChange={formik.handleChange}
                error={formik.touched.runtime && Boolean(formik.errors.runtime)}
                helperText={formik.touched.runtime && formik.errors.runtime}            
            />
            <TextField
                id="vote_average"
                name="vote_average"
                fullWidth
                sx={{mb:2, backgroundColor:"white",width:"30%", input:{color:"#081a36"}}}
                color="background"
                label="Vote Average"
                placeholder="Vote Average"
                value={formik.values.vote_average}
                onChange={formik.handleChange}
                error={formik.touched.vote_average && Boolean(formik.errors.vote_average)}
                helperText={formik.touched.vote_average && formik.errors.vote_average}            
            />
            <TextField
                id="tmdb_id"
                name="tmdb_id"
                fullWidth
                sx={{mb:2, backgroundColor:"white",width:"30%", input:{color:"#081a36"}}}
                color="background"
                label="TMDB ID"
                placeholder="TMDB ID (optional)"
                value={formik.values.tmdb_id}
                onChange={formik.handleChange}
                error={formik.touched.tmdb_id && Boolean(formik.errors.tmdb_id)}
                helperText={formik.touched.tmdb_id && formik.errors.tmdb_id}            
            />
            <TextField
                id="genre_name"
                name="genre_name"
                fullWidth
                sx={{mb:2, backgroundColor:"white",width:"30%", input:{color:"#081a36"}}}
                color="background"
                label="Genre Name"
                placeholder="Genre Name (optional)"
                value={formik.values.genre_name}
                onChange={formik.handleChange}
                error={formik.touched.genre_name && Boolean(formik.errors.genre_name)}
                helperText={formik.touched.genre_name && formik.errors.genre_name}            
            />
            <FormControl>
                <InputLabel id="genre-label-id">Genre</InputLabel>
                <Select
                    labelId="genre-label-id"
                    id="genre-id"
                    value={formik.values.genre_id}
                    sx={{mb:2, color:"#081a36", backgroundColor:"white", input:{color:"#081a36"}}}
                    color="background"
                    name="genre_id"
                    placeholder="Genre"
                    label="Genre"
                    onChange={formik.handleChange}
                    error={formik.touched.genre_id && Boolean(formik.errors.genre_id)}
                >
                    <MenuItem value={0}><em>Select Genre</em></MenuItem>

                {genres?.map((genre)=>(
                    <MenuItem key={genre.id} value={genre.id}>{genre.name} | {genre.id}</MenuItem>
                )
                )}
                </Select>
                <FormHelperText>{formik.touched.genre_id && formik.errors.genre_id}</FormHelperText>
            </FormControl>
            <div style={{display: 'flex', flexDirection: 'row', alignContent: 'space-around'}}>
            <Typography sx={{mt:2}}><DarkButton type="submit" sx={{width:"100%",my:1}}>{movie?"Edit Movie":"Create Movie"}</DarkButton></Typography>
            {movie?<Typography sx={{ml:10, mt:2}}> <RedButton onClick={()=>{handleDelete()}} sx={{width:"100%",my:1}}>Delete</RedButton></Typography>:""}
            </div>
        </form>
    )






}