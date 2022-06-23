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
                if(film.id === movie.id){
                    return newList
                }
            }
            return [...recommendList, movie]
        case recommendListActions.removeRecommend:
            let sliceList = recommendList.slice()
            for(let picture of sliceList){
                if(picture.id === movie.id){
                    sliceList.splice(sliceList.indexOf(picture), 1)
                    return sliceList
                }
            }
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