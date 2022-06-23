import {useEffect, useContext} from 'react'
import {CancelToken} from 'apisauce'
import apiMovie from '../api/apiMovie'
import { AppContext } from '../context/AppContext'

export default function usePutMovie(movie, movieID) {
    const {user, setAlert} = useContext(AppContext)

    useEffect(
        ()=>{
            let response
            const source = CancelToken.source()
            if (movie?.title){
                (async()=>{
                    response = await apiMovie.putMovie(user.token, movieID, movie, source.token)
                    if (response){
                        setAlert({msg:`Movie: ${movie.title} Edited`,color:'primary'})
                    }else if(response === false && response !== undefined){
                        setAlert({msg:`Please reauthorize you account`,color:'error'})                  
                    }
                })()
            }
            return ()=>{source.cancel()}
        },[movie, movieID, user.token]
    )
}