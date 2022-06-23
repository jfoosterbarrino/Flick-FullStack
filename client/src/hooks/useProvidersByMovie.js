import {useEffect, useState} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';

export default function useProvidersByMovie(movieId){
    const [providers, setProviders] = useState([])

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showProviders=async()=>{
                const response = await apiMovie.getProvidersByMovie(movieId)
                setProviders(response.data.results.US)
            }
            showProviders()
            return ()=>{source.cancel();}
        },
        []
    )
    return providers
}