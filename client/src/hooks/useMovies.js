import {useEffect, useState, useContext} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext'

export default function useUsers(){
    const [movies, setMovies] = useState([])
    const {user} = useContext(AppContext)

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showMovies=async()=>{
                const response = await apiMovie.getMovies(user.token, source.token)
                setMovies(response)
            }
            showMovies()
            return ()=>{source.cancel();}
        },
        []
    )
    return movies
}
