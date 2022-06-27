import {useEffect, useContext} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext';

export default function useDelMovie(movie) {
    const {user, setAlert} = useContext(AppContext)

    useEffect(() =>{
        const source = CancelToken.source()
        const deleteMovie = async()=>{
            const response = await apiMovie.delMovie(user.token, movie.id, source.token)
            console.log(response)
            if(response){
                setAlert({msg: `Movie Id of ${movie.title} has been successfully deleted`, color:"secondary"})
            }else if(response === false && response !== undefined){
                setAlert({msg: `Unsuccessful, make sure you are authorized`, color: "error"})
            }
        }
        if(movie?.title){
            deleteMovie()
        }
        return ()=>{source.cancel()}
    }, 
    [movie, user.token]
    )
}
