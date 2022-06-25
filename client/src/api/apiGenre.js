import apiClientTokenAuth from './clientTokenAuth';

const getGenres = async(token, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get('/api/genre')
    return response
}

const exportedObject={
    getGenres

}

export default exportedObject;