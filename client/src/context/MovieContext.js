import React, {createContext, useState, useReducer, useEffect, useContext} from "react";
import {watchListReducer, watchListActions} from '../reducers/watchListReducer'
import {recommendListReducer, recommendListActions} from '../reducers/recommendListReducer'
import {AppContext} from './AppContext';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';


export const MovieContext = createContext();

const MovieContextProvider = ({children})=>{
    const {user} = useContext(AppContext);

    const getWatchListFromLS = ()=>{
        if(user){
        let watchList = localStorage.getItem('watchList')
        if(watchList){
            return JSON.parse(watchList)
        }
        }

    }

    const getRecommendListFromLS = ()=>{
        if(user){
        let recommendList = localStorage.getItem('recommendList')
        if(recommendList){
            return JSON.parse(recommendList)
        }
        }

    }

    const [trending, setTrending] = useState([]) 
    const [topRated, setTopRated] = useState([]) 
    const [action, setAction] = useState([]) 
    const [comedy, setComedy] = useState([]) 
    const [horror, setHorror] = useState([]) 
    const [drama, setDrama] = useState([]) 
    const [sciFi, setSciFi] = useState([]) 
    const [romance, setRomance] = useState([]) 
    const [genres, setGenres] = useState([]) 
    const [moviesByG, setMoviesByG] = useState([]) 
    const [movieById, setMovieById] = useState([]) 
    const [cast, setCast]= useState([])
    const [watchList, dispatch] = useReducer(watchListReducer, getWatchListFromLS()??[])
    const [recommendList, dispatcher] = useReducer(recommendListReducer,getRecommendListFromLS()??[])
    const [moviesBySearch, setMoviesBySearch] =useState([])

    useEffect(()=>{
        
        const source=CancelToken.source();
        const showMovies=async()=>{
            const response = await apiMovie.getWlByUser(user.token, user?.id, source.token)
            if(response.data?.watchlist){
                localStorage.setItem('watchList', JSON.stringify(response.data?.watchlist))
                }
        }
        showMovies()
        return ()=>{source.cancel();}
        

    }, [watchList, user.id, user.token]
    )
    

    useEffect(()=>{
        
        const source=CancelToken.source();
        const showMovies=async()=>{
            const response = await apiMovie.getMoviesByUser(user.token, user?.id, source.token)
            if(response.data?.movies){
                localStorage.setItem('recommendList', JSON.stringify(response.data?.movies))
                }
        }
        showMovies()
        return ()=>{source.cancel();}
        
        
    }, [recommendList, user.id, user.token]
    )



    const values = {
        trending,
        setTrending,
        topRated,
        setTopRated,
        genres,
        setGenres,
        action,
        setAction,
        comedy,
        setComedy,
        horror,
        setHorror,
        drama,
        setDrama,
        sciFi,
        setSciFi,
        romance,
        setRomance,
        moviesByG,
        setMoviesByG,
        movieById,
        setMovieById,
        watchList,
        cast,
        setCast,
        recommendList,
        moviesBySearch,
        setMoviesBySearch,
        addMovie:(movie)=>{
            dispatch({type:watchListActions.addMovie, movie})
        },
        removeMovie:(movie)=>{
            dispatch({type:watchListActions.removeMovie, movie})
        },
        clearList:()=>{
            dispatch({type:watchListActions.clearList})
        },
        addRecommend:(movie)=>{
            dispatcher({type:recommendListActions.addRecommend, movie})
        },
        removeRecommend:(movie)=>{
            dispatcher({type:recommendListActions.removeRecommend, movie})
        },
        clearRecommend:()=>{
            dispatcher({type:recommendListActions.clearRecommend})
        }
    }

    return (
        <MovieContext.Provider value={values}>
            {children}
        </MovieContext.Provider>
    )
    }

export default MovieContextProvider