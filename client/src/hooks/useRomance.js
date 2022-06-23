import {useEffect, useState} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';

export default function useRomance(){
    const [movies, setMovies] = useState([])

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showMovies=async()=>{
                const response = await apiMovie.getRomance()
                setMovies(response.data.results)
            }
            showMovies()
            return ()=>{source.cancel();}
        },
        []
    )
    return movies
}