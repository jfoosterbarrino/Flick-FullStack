import {useEffect, useContext} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext'

export default function useRemoveAllMovie(){
    const {user, setAlert} = useContext(AppContext)

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const removeMovies=async()=>{
                const response = await apiMovie.removeAllMovies(user.token, source.token)
                console.log(response)
            }
            removeMovies()
            return ()=>{source.cancel();}
        },
        []
    )
}