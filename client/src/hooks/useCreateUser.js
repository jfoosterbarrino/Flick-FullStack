import {useEffect, useContext} from 'react';
import apiUser from '../api/apiUser';
import {CancelToken} from 'apisauce';
import {useNavigate} from 'react-router-dom'
import {AppContext} from '../context/AppContext'

export default function useCreateUser(userData){

    const navigate = useNavigate()
    const {setAlert} = useContext(AppContext)

    useEffect(()=>{

            const source = CancelToken.source()
            const createUser = async()=>{
                const response = await apiUser.postUser(userData, source.token);
                console.log(response);
                if (response){
                    setAlert({msg: `Welcome to Flick ${userData.first_name}! Your account has been created.`, color: "secondary"})
                    navigate('/login')
                }else if(response === false && response !== undefined){
                    setAlert({msg: `Please reauthorize you account`, color: "warning"})
                }
            }
            if(userData.first_name){
                createUser()
            }
            return ()=>{source.cancel()}
            
        },
        [userData]
    )
}