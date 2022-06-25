import {useEffect, useState, useContext} from 'react';
import apiGenre from '../api/apiGenre';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext'

export default function useGenres(){
    const [genres, setGenres] = useState([])
    const {user} =useContext(AppContext)

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showGenres=async()=>{
                const response = await apiGenre.getGenres(user.token, source.token)
                console.log(response)
                console.log(response.data.data.genres)
                setGenres(response?.data.data.genres)
            }
            showGenres()
            return ()=>{source.cancel();}
        },
        [user.token]
    )
    return genres
}