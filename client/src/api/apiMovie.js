import apiClientTokenAuth from './clientTokenAuth';
import instance from './axios';
import requests from './requests';

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
    return response.data.movies
}

const getMoviesByUser = async(token, userId, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint+"/user/"+userId)
    return response.data.movies
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

const getTrending = async()=>{
    const response =await instance.get(requests.trendingMovies)
    return response
}
const getTopRated = async()=>{
    const response =await instance.get(requests.topRatedMovies)
    return response
}
const getAction = async()=>{
    const response =await instance.get(requests.actionMovies)
    return response
}
const getComedy = async()=>{
    const response =await instance.get(requests.comedyMovies)
    return response
}
const getDrama = async()=>{
    const response =await instance.get(requests.dramaMovies)
    return response
}
const getHorror = async()=>{
    const response =await instance.get(requests.horrorMovies)
    return response
}
const getRomance = async()=>{
    const response =await instance.get(requests.romanceMovies)
    return response
}
const getSciFi = async()=>{
    const response =await instance.get(requests.scifiMovies)
    return response
}

const getMoviesByGenre = async(genreId)=>{
    const response = await instance.get(requests.moviesByGenre + genreId)
    return response
}

const getMovieById = async(movieId)=>{
    const response = await instance.get(`/movie/${movieId}${requests.custom}`)
    return response.data
}

const getCastByMovie = async(movieId)=>{
    const response = await instance.get(`/movie/${movieId}/credits${requests.custom}`)
    return response
}

const getProvidersByMovie = async(movieId)=>{
    const response = await instance.get(`/movie/${movieId}/watch/providers${requests.custom}`)
    return response
}

const getReviewsByMovie = async(movieId)=>{
    const response = await instance.get(`/movie/${movieId}/reviews${requests.custom}`)
    return response
}
const getMoviesBySearch = async(movieTitle)=>{
    const response = await instance.get(`/search/movie${requests.custom}&query=${movieTitle}`)
    return response.data.results
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
    getMovies
}

export default exportedObject;
