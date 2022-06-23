import {useEffect, useState} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';

export default function useMovieById(movieId){
    const [movie, setMovie] = useState([])

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showMovies=async()=>{
                const response = await apiMovie.getMovieById(movieId)
                setMovie(response)
            }
            showMovies()
            return ()=>{source.cancel();}
        },
        []
    )
    return movie
}