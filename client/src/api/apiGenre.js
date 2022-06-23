import instance from './axios';
import requests from './requests';

const getGenres = async()=>{
    const response = await instance.get(requests.allGenres)
    return response
}

const exportedObject={
    getGenres

}

export default exportedObject;