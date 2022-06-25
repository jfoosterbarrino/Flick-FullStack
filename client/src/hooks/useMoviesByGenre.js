import {useEffect, useState, useContext} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext';

export default function useMoviesByGenre(genreId){
    const [movies, setMovies] = useState([])
    const {user} = useContext(AppContext)

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showMovies=async()=>{
                const response = await apiMovie.getMoviesByGenre(user.token, genreId, source.token)
                setMovies(response.data?.data.results)
            }
            showMovies()
            return ()=>{source.cancel();}
        },
        [user.token, genreId]
    )
    return movies
}