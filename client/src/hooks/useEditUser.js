import {useEffect, useContext} from 'react';
import apiUser from '../api/apiUser';
import {CancelToken} from 'apisauce';
import  {AppContext} from '../context/AppContext';
import {useNavigate} from 'react-router-dom'

export default function useEditUser(userInfo){
    const {user, setUser, setAlert} = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(()=>{
        const source =CancelToken.source();
        const editUser = async()=>{
            const response = await apiUser.putUser(user.token,userInfo, source.token)
            if (response){
                setUser(response)
                setAlert({msg: `Your profile has been updated successfully${userInfo.first_name}!`, color: "secondary"})
                navigate('/login')
            }else if(response === false && response !== undefined){
                setAlert({msg: `Please reauthorize you account`, color:"danger"})
            }
            
        }
        if(userInfo.first_name){
            editUser()
        }
        return ()=>{source.cancel()}
    },
    [userInfo]
    )
}