import {useEffect, useState, useContext} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext';

export default function useProvidersByMovie(movieId){
    const [providers, setProviders] = useState([])
    const {user} = useContext(AppContext)

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showProviders=async()=>{
                const response = await apiMovie.getProvidersByMovie(user.token, movieId, source.token)
                setProviders(response.data?.data?.results.US)
            }
            showProviders()
            return ()=>{source.cancel();}
        },
        [user.token, movieId]
    )
    return providers
}