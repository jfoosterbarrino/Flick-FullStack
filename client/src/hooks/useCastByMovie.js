import {useEffect, useState} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';

export default function useCastByMovie(movieId){
    const [cast, setCast] = useState([])

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showCast=async()=>{
                const response = await apiMovie.getCastByMovie(movieId)
                setCast(response.data.cast)
            }
            showCast()
            return ()=>{source.cancel();}
        },
        []
    )
    return cast
}