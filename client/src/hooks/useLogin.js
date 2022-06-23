import React, {useEffect, useContext} from 'react';
import {getUser} from '../api/apiLogin';
import {CancelToken} from 'apisauce';
import {useNavigate} from 'react-router-dom'
import {AppContext} from '../context/AppContext'

export default function useLogin(loginCreds, setLoginCreds, setError, setUser){

    const {setAlert} = useContext(AppContext)

    const navigate = useNavigate()


    const login = async(cancelToken)=>{
        const response = await getUser(loginCreds.email, loginCreds.password, cancelToken)
        if(response.user?.token){
            console.log(response)
            setAlert({msg: `Login Successful! Welcome back ${response.user.first_name}!`, color:"background"})
            setUser(response.user);
            setLoginCreds({})
            console.table(response.user)
            navigate('/')
        }
        setError(response.error);
    }

    useEffect(
        ()=>{
            const source = CancelToken.source()
            if(loginCreds.email && loginCreds.password)
                login(source.token)
                return ()=>{source.cancel()}
        },
        [loginCreds, setLoginCreds, setError, setUser]
    )
}