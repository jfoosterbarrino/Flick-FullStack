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
                const response = await apiMovie.postMovieToWl(user.token, movieId, source.token)
                console.log(response)
                if (response){
                    setAlert({msg: `Watch List Updated and Saved`, color: "background"})
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