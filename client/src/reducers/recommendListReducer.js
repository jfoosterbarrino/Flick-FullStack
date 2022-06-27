const recommendListActions={
    addRecommend:"addRecommend",
    removeRecommend:"removeRecommend",
    clearRecommend:"clearRecommend"
}

function recommendListReducer(recommendList, {type, movie}){

    switch(type){
        case recommendListActions.addRecommend:
            let newList = recommendList.slice()
            for(let film of newList){
                if(film.tmdb_id === movie.id || film.id === movie.id){
                    localStorage.setItem('recommendList', JSON.stringify(newList))
                    return newList
                }
            }
            localStorage.setItem('watchList', JSON.stringify([...recommendList, movie]))
            return [...recommendList, movie]
        case recommendListActions.removeRecommend:
            let sliceList = recommendList.slice()
            for(let picture of sliceList){
                if(picture.tmdb_id === movie.id || picture.id === movie.id){
                    sliceList.splice(sliceList.indexOf(picture), 1)
                    localStorage.setItem('recommendList', JSON.stringify(sliceList))
                    return sliceList
                }
            }
            localStorage.setItem('recommendList', JSON.stringify(sliceList))
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