import {useEffect, useState, useContext} from 'react';
import apiUser from '../api/apiUser';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext'

export default function useUsers(){
    const [users, setUsers] = useState([])
    const {user} = useContext(AppContext)

    useEffect(
        ()=>{ 
            const source=CancelToken.source();
            const showUsers=async()=>{
                const response = await apiUser.getUsers(user.token, source.token)
                setUsers(response)
            }
            showUsers()
            return ()=>{source.cancel();}
        },
        []
    )
    return users
}