const watchListActions={
    addMovie:"addMovie",
    removeMovie:"removeMovie",
    clearList:"clearList"
}

function watchListReducer(watchList, {type, movie}){
    
    switch(type){
        case watchListActions.addMovie:
            let sliceList = watchList.slice()
            for(let picture of sliceList){
                if(picture.tmdb_id === movie.id || picture.id === movie.id){
                    localStorage.setItem('watchList', JSON.stringify(sliceList))
                    return sliceList
                }
            }
            localStorage.setItem('watchList', JSON.stringify([...watchList, movie]))
            return [...watchList, movie]
        case watchListActions.removeMovie:
            let newList = watchList.slice()
            for(let film of newList){
                if(film.tmdb_id === movie.id || film.id === movie.id){
                    newList.splice(newList.indexOf(film), 1)
                    localStorage.setItem('watchList', JSON.stringify(newList))
                    return newList
                }
            }
            localStorage.setItem('watchList', JSON.stringify(newList))
            return newList
        case watchListActions.clearList:
            return []
        default:
            throw new Error("I'm not a little teapot")
    }
}

export{
    watchListReducer,
    watchListActions
}