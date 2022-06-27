import apiClientTokenAuth from './clientTokenAuth';

const endpoint ='/api/movie'

// ADMIN REQUIRED

const postMovie = async(token,movieData, cancelToken) =>{
    const response = await apiClientTokenAuth(token, cancelToken).post(endpoint, movieData)
    return response.ok
}

const putMovie = async(token, movieId,movieData ,cancelToken) =>{
    const response = await apiClientTokenAuth(token, cancelToken).put(endpoint +"/"+movieId, movieData)
    return response.ok
}

const delMovie =async(token, movieId, cancelToken) =>{
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint +"/"+movieId)
    return response.ok
}



// REGULAR USER

const getMovies = async(token, cancelToken) =>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint)
    return response?.data?.movies
}

const getMoviesByUser = async(token, userId, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/user/"+userId)
    return response
}

const getWlByUser = async(token, userId, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/watchlist/show/"+userId)
    return response
}

const postMovieToUser = async(token, movieId, cancelToken)=>{
    const response =await apiClientTokenAuth(token, cancelToken).post(endpoint+"/"+movieId)
    return response
}
const removeMovieFromUser = async(token, movieId, cancelToken)=>{
    const response =await apiClientTokenAuth(token, cancelToken).put(endpoint+ "/user/"+movieId)
    return response
}

const removeAllMovies = async(token, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).put(endpoint+"/user")
    return response
}

const postMovieToWl = async(token, movieId, cancelToken)=>{
    const response =await apiClientTokenAuth(token, cancelToken).post(endpoint+"/watchlist/"+movieId)
    return response
}
const removeMovieFromWl = async(token, movieId, cancelToken)=>{
    const response =await apiClientTokenAuth(token, cancelToken).put(endpoint+ "/watchlist/remove/"+movieId)
    return response
}

const removeAllWl = async(token, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).put(endpoint+"/watchlist/clear")
    return response
}

const getTrending = async(token, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/trending")
    return response
}
const getTopRated = async(token, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/toprated")
    return response
}
const getAction = async(token, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/action")
    return response
}
const getComedy = async(token, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/comedy")
    return response
}
const getDrama = async(token, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/drama")
    return response
}
const getHorror = async(token, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/horror")
    return response
}
const getRomance = async(token, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/romance")
    return response
}
const getSciFi = async(token, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/scifi")
    return response
}

const getMoviesByGenre = async(token, genreId, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/genre/"+genreId)
    return response
}

const getMovieById = async(token, movieId, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/tmdb/"+movieId)
    return response
}

const getCastByMovie = async(token, movieId, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/cast/"+movieId)
    return response
}

const getProvidersByMovie = async(token, movieId, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/providers/"+movieId)
    return response
}

const getReviewsByMovie = async(token, movieId, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/reviews/"+movieId)
    return response
}
const getMoviesBySearch = async(token, movieTitle, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/search/"+movieTitle)
    return response
}

const exportedObject={
    getTrending,
    getTopRated,
    getAction,
    getComedy,
    getDrama,
    getHorror,
    getRomance,
    getSciFi,
    getMoviesByGenre,
    getMovieById,
    getCastByMovie,
    getProvidersByMovie,
    getReviewsByMovie,
    getMoviesBySearch,
    getMoviesByUser,
    postMovieToUser,
    removeMovieFromUser,
    removeAllMovies,
    postMovie,
    putMovie,
    delMovie,
    getMovies,
    getWlByUser,
    postMovieToWl,
    removeMovieFromWl,
    removeAllWl
}

export default exportedObject;
