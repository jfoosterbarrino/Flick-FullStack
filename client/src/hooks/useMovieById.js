import {useEffect, useState, useContext} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext';

export default function useMovieById(movieId){
    const [movie, setMovie] = useState([])
    const {user} = useContext(AppContext)

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showMovies=async()=>{
                const response = await apiMovie.getMovieById(user.token, movieId, source.token)
                setMovie(response.data?.data)
            }
            showMovies()
            return ()=>{source.cancel();}
        },
        [user.token, movieId]
    )
    return movie
}