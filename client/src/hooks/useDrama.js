import {useEffect, useState} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';

export default function useDrama(){
    const [movies, setMovies] = useState([])

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showMovies=async()=>{
                const response = await apiMovie.getDrama()
                setMovies(response.data.results)
            }
            showMovies()
            return ()=>{source.cancel();}
        },
        []
    )
    return movies
}