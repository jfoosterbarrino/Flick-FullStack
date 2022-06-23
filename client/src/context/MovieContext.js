import {createContext, useState, useReducer, useEffect} from "react";
import {watchListReducer, watchListActions} from '../reducers/watchListReducer'
import {recommendListReducer, recommendListActions} from '../reducers/recommendListReducer'


export const MovieContext = createContext();

const MovieContextProvider = ({children})=>{

    const getWatchListFromLS = ()=>{
        let watchList = localStorage.getItem('watchList')
        if(watchList){
            return JSON.parse(watchList)
        }
    }

    const getRecommendListFromLS = ()=>{
        let recommendList = localStorage.getItem('recommendList')
        if(recommendList){
            return JSON.parse(recommendList)
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
    const [recommendList, dispatcher] = useReducer(recommendListReducer, getRecommendListFromLS()??[])
    const [moviesBySearch, setMoviesBySearch] =useState([])

    useEffect(()=>{
        localStorage.setItem('watchList', JSON.stringify(watchList))
    }, [watchList]
    )

    useEffect(()=>{
        localStorage.setItem('recommendList', JSON.stringify(recommendList))
    }, [recommendList]
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