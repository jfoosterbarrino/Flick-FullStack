import {useEffect, useState} from 'react';
import apiGenre from '../api/apiGenre';
import {CancelToken} from 'apisauce';

export default function useGenres(){
    const [genres, setGenres] = useState([])

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showGenres=async()=>{
                const response = await apiGenre.getGenres()
                setGenres(response.data.genres)
            }
            showGenres()
            return ()=>{source.cancel();}
        },
        []
    )
    return genres
}