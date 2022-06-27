import {useEffect, useContext} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext'

export default function useCreateMovie(movieId){
    const {user, setAlert} = useContext(AppContext)

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const createMovie=async()=>{
                const response = await apiMovie.postMovieToUser(user.token, movieId, source.token)
                console.log(response)
                if (response){
                    setAlert({msg: `Recommend It List Updated and Saved`, color: "info"})
                }else if(response === false && response !== undefined){
                    setAlert({msg: `You already have this movie`, color: "error"})
                }
            }
            createMovie()
            return ()=>{source.cancel();}
        },
        [movieId]
    )
}