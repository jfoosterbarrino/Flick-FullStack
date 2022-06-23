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
                if(picture.id === movie.id){
                    return sliceList
                }
            }
            return [...watchList, movie]
        case watchListActions.removeMovie:
            let newList = watchList.slice()
            for(let film of newList){
                if(film.id === movie.id){
                    newList.splice(newList.indexOf(film), 1)
                    return newList
                }
            }
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