import {useEffect, useContext} from 'react';
import apiUser from '../api/apiUser';
import {CancelToken} from 'apisauce';
import {AppContext} from '../context/AppContext';
import {useNavigate} from 'react-router-dom'

export default function useDeleteUser(){
    const {user, setUser, setAlert} = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(()=>{

            const source = CancelToken.source()
            const deleteUser = async()=>{
                const response = await apiUser.delUser(user.token, source.token);
                console.log(response)
                setUser({})
                setAlert({msg: "Your account has been deleted", color:"warning"})
                navigate('/login')
            }
            deleteUser()
            return ()=>{source.cancel()}
            
        },
        []
    )
}