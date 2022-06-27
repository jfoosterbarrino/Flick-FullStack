import apiClientNoAuth from './clientNoAuth';
import apiClientTokenAuth from './clientTokenAuth';

const endpoint ='/api/user'

// REGULAR USER 

const getUsers = async(token, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint)
    return response?.data?.users
}

const getUser = async(token, userId, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).get(endpoint + "/"+userId)
    return response?.data
}

const postUser = async(userInfo, cancelToken) => {
    const response = await apiClientNoAuth(cancelToken).post(endpoint, userInfo)
    return response
}

const putUser = async(token, userInfo, cancelToken) => {
    const response =await apiClientTokenAuth(token, cancelToken).put(endpoint, userInfo)
    return response
}

const delUser = async(token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint)
    return response
}

// ADMIN REQUIRED



const putUserById = async(token, userId, userInfo, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).put(endpoint +"/"+userId, userInfo)
    return response
}

const delUserById = async(token, userId, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint+"/"+userId)
    return response
}

const exportedObject={
    postUser,
    putUser,
    delUser,
    getUsers,
    getUser,
    putUserById,
    delUserById
}

export default exportedObject;
