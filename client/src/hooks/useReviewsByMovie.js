import {useEffect, useState} from 'react';
import apiMovie from '../api/apiMovie';
import {CancelToken} from 'apisauce';

export default function useReviewsByMovie(movieId){
    const [reviews, setReviews] = useState([])

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showReviews=async()=>{
                const response = await apiMovie.getReviewsByMovie(movieId)
                setReviews(response.data.results)
            }
            showReviews()
            return ()=>{source.cancel();}
        },
        []
    )
    return reviews
}