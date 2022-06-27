import {useContext} from 'react';
import {AppContext} from '../context/AppContext';

const recommendListActions={
    addRecommend:"addRecommend",
    removeRecommend:"removeRecommend",
    clearRecommend:"clearRecommend"
}

function recommendListReducer(recommendList, {type, movie}){
    const {user} =useContext(AppContext)

    switch(type){
        case recommendListActions.addRecommend:
            let newList = recommendList.slice()
            for(let film of newList){
                if(film.tmdb_id === movie.id || film.id === movie.id){
                    localStorage.setItem(`${user.id}recommendList`, JSON.stringify(newList))
                    return newList
                }
            }
            localStorage.setItem(`${user.id}recommendList`, JSON.stringify([...recommendList, movie]))
            return [...recommendList, movie]
        case recommendListActions.removeRecommend:
            let sliceList = recommendList.slice()
            for(let picture of sliceList){
                if(picture.tmdb_id === movie.id || picture.id === movie.id){
                    sliceList.splice(sliceList.indexOf(picture), 1)
                    localStorage.setItem(`${user.id}recommendList`, JSON.stringify(sliceList))
                    return sliceList
                }
            }
            localStorage.setItem(`${user.id}recommendList`, JSON.stringify(sliceList))
            return sliceList
        case recommendListActions.clearRecommend:
            return []
        default:
            throw new Error("I'm not a little teapot")
    }
}

export{
    recommendListActions,
    recommendListReducer
}