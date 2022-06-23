import {useEffect, useState} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';

export default function useMoviesBySearch(movieTitle){
    const [movies, setMovies] = useState([])

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showMovies=async()=>{
                const response = await apiMovie.getMoviesBySearch(movieTitle)
                setMovies(response)
            }
            showMovies()
            return ()=>{source.cancel();}
        },
        []
    )
    return movies
}