import {useEffect, useState, useContext} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext';

export default function useSciFi(){
    const [movies, setMovies] = useState([])
    const {user}= useContext(AppContext)

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showMovies=async()=>{
                const response = await apiMovie.getSciFi(user.token, source.token)
                setMovies(response.data?.data?.results)
            }
            showMovies()
            return ()=>{source.cancel();}
        },
        [user.token]
    )
    return movies
}