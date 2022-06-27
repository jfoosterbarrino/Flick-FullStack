import React, {useContext, useState} from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import {AppContext} from '../context/AppContext';
import useLogin from '../hooks/useLogin';
import DarkButton from '../components/DarkButton';
import {Link} from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Error from '../components/Error';




const FormSchema=Yup.object(
    {
        email: Yup.string().email("Please check your email. Must be valid format.").required(),
        password: Yup.string().required()
    }
)

const initialValues = {
    email:'',
    password:''
}



export default function LoginForm(){

    const {user, setUser, setLogin, setSignUp} = useContext(AppContext)
    const [loginCreds, setLoginCreds] = useState({})
    const [error, setError] = useState('')

    useLogin(loginCreds, setLoginCreds, setError, setUser)

    const handleSubmit=(values)=>{
        console.log(values)
        setLoginCreds(values)
    }

    const handleSignUp = ()=>{
        setSignUp(true)
        setLogin(false)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema : FormSchema,
        onSubmit:(values)=>{handleSubmit(values)}
    })
    console.table(user)

    return(
        <form onSubmit={formik.handleSubmit}>
            <TextField
                id = 'email'
                name = 'email'
                fullWidth
                sx = {{mb:2,mt:2, width:"100%", backgroundColor:"rgba(255,154,64,.2)", input:{color:"white"}}}
                placeholder = "Email"
                color="primary"
                value={formik.values.email}
                onChange={formik.handleChange}
                error = {formik.touched.email && Boolean(formik.errors.email)}
                helperText = {formik.touched.email && formik.errors.email}
            />
            

            <TextField
                id = 'password'
                name = 'password'
                type = "password"
                fullWidth
                sx = {{mb:2, mt:2, width:"100%", backgroundColor:"rgba(255,154,64,.2)", input:{color:"white"}}}
                placeholder = "Password"
                color="primary"
                value = {formik.values.password}
                onChange = {formik.handleChange}
                error = {formik.touched.password && Boolean(formik.errors.password)}
                helperText = {formik.touched.password && formik.errors.password}
            />
         
         <Typography sx={{display: "flex", justifyContent: "space-around", pt:3}}>
            <DarkButton type="submit ">Login</DarkButton>
            <Link to="/signup" onClick={()=>handleSignUp()}style={{textDecoration:"none"}}><DarkButton>{user.token?"Edit Profile":"Sign Up"}</DarkButton></Link>
            </Typography>
            <Error>{error}</Error>
        </form>
    )
}
