import React, {useEffect, useContext} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext';

export default function usePostMovie(movie) {
    const {user, setAlert} = useContext(AppContext)

    useEffect(() =>{
        const source = CancelToken.source()
        const createMovie = async()=>{
            const response = await apiMovie.postMovie(user.token, movie, source.token)
            console.log(response)
            if(response){
                setAlert({msg: `${movie.title} has been successfully created`, color:"secondary"})
            }else if(response === false && response !== undefined){
                setAlert({msg: `Unsuccessful, make sure you are authorized and data is valid`, color: "error"})
            }
        }
        if(movie?.title){
            createMovie()
        }
        return ()=>{source.cancel()}
    }, 
    [movie, user.token]
    )
}
