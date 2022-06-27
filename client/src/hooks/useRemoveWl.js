import {useEffect, useContext} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext'

export default function useRemoveMovie(movieId){
    const {user, setAlert} = useContext(AppContext)

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const removeMovie=async()=>{
                const response = await apiMovie.removeMovieFromWl(user.token, movieId, source.token)
                console.log(response)
                if (response){
                    setAlert({msg: `Watch List Updated and Saved`, color: "info"})
                }else if(response === false && response !== undefined){
                    setAlert({msg: `That movie wasn't in your list`, color: "error"})
                }
            }
            removeMovie()
            return ()=>{source.cancel();}
        },
        [movieId]
    )
}