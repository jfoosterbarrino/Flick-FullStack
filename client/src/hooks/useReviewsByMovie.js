import {useEffect, useState, useContext} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext';

export default function useReviewsByMovie(movieId){
    const [reviews, setReviews] = useState([])
    const {user} = useContext(AppContext)

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showReviews=async()=>{
                const response = await apiMovie.getReviewsByMovie(user.token, movieId, source.token)
                setReviews(response.data?.data?.results)
            }
            showReviews()
            return ()=>{source.cancel();}
        },
        [user.token, movieId]
    )
    return reviews
}