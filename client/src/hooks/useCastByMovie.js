import {useEffect, useState, useContext} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext';

export default function useCastByMovie(movieId){
    const [cast, setCast] = useState([])
    const {user} = useContext(AppContext)

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showCast=async()=>{
                const response = await apiMovie.getCastByMovie(user.token, movieId, source.token)
                setCast(response.data?.data?.cast)
            }
            showCast()
            return ()=>{source.cancel();}
        },
        [user.token, movieId]
    )
    return cast
}