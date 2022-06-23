import {useContext, useEffect} from 'react'
import {AppContext} from '../context/AppContext'
import {Navigate} from 'react-router-dom'

export default function Logout() {
    const {setUser, setAlert} = useContext(AppContext)

    useEffect(() => {
        setUser({})
        setAlert({msg:"You've been logged out. See you next time!", color:"background"})
    },[setUser]
    )
  return (
    <Navigate to='/login'/>
  )
}
