import {useEffect, useState, useContext} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext'

export default function useMoviesByUser(userId){
    const [movies, setMovies] = useState([])
    const {user} = useContext(AppContext)

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showMovies=async()=>{
                const response = await apiMovie.getWlByUser(user.token, userId, source.token)
                setMovies(response.data?.watchlist)
            }
            showMovies()
            return ()=>{source.cancel();}
        },
        [user.token, userId]
    )
    return movies
}