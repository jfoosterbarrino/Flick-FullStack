import React, {useState, useContext} from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import useCreateUser from '../hooks/useCreateUser';
import useEditUser from '../hooks/useEditUser';
import {AppContext} from '../context/AppContext';
import DarkButton from '../components/DarkButton';
import {Link} from 'react-router-dom';
import Typography from '@mui/material/Typography';



const ValidationSchema = Yup.object(
    {
        first_name: Yup.string().required(),
        last_name: Yup.string().required(),
        email: Yup.string().email("Please check your email. Must be valid format.").required(),
        password: Yup.string().required(),
        confirmPassword: Yup.string().required().oneOf([Yup.ref('password')], 'Your passwords do not match'),
        img: Yup.string()

    }
)



export default function RegisterForm(){
    const {user, setLogin, setSignUp} = useContext(AppContext)

    const [newUser, setNewUser] = useState({})
    const [editUser, setEditUser] = useState({})

    useCreateUser(newUser)
    useEditUser(editUser)
    
    const initialValues ={
        first_name:user?.first_name ?? "",
        last_name:user?.last_name ?? "",
        email:user?.email ?? "",
        password:user?.password ?? "",
        confirmPassword:user?.confirmPassword ?? "",
        img:user?.img ?? ""
    }

    const handleSubmit=(values, resetForm) => {
        if(user.token){
            setEditUser(values)
        }else{
            setNewUser(values)
        }
        console.log(values)
        resetForm(initialValues)
    }


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: ValidationSchema,
        onSubmit:(values, {resetForm}) => {handleSubmit(values, resetForm)},
        enableReinitialize : true
    })

    const handleLogin = ()=>{
        setLogin(true)
        setSignUp(false)
    }


    return(
    
        <form onSubmit={formik.handleSubmit}>
            
            <TextField
                id = "first_name"
                name="first_name"
                fullWidth
                sx={{mb:2,mt:2,width:"100%", backgroundColor:"rgba(255,154,64,.2)", input:{color:"white"}}}
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error ={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText = {formik.touched.firstName && formik.errors.firstName}
            />
<br/>
            <TextField
                id = "last_name"
                name="last_name"
                fullWidth
                sx={{mb:2,mt:2,width:"100%", backgroundColor:"rgba(255,154,64,.2)", input:{color:"white"}}}
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error ={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText = {formik.touched.lastName && formik.errors.lastName}
            />
<br/>
            <TextField
                id = 'email'
                name = 'email'
                fullWidth
                sx = {{mb:2,mt:2, width:"100%", backgroundColor:"rgba(255,154,64,.2)", input:{color:"white"}}}
                placeholder = "Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error = {formik.touched.email && Boolean(formik.errors.email)}
                helperText = {formik.touched.email && formik.errors.email}
            />
<br/>
            <TextField
                id = 'password'
                name = 'password'
                type = 'password'
                fullWidth
                sx = {{mb:2, mt:2, width:"100%", backgroundColor:"rgba(255,154,64,.2)", input:{color:"white"}}}
                placeholder = "Password"
                value = {formik.values.password}
                onChange = {formik.handleChange}
                error = {formik.touched.password && Boolean(formik.errors.password)}
                helperText = {formik.touched.password && formik.errors.password}
            />

            <TextField
                id = 'confirmPassword'
                name = 'confirmPassword'
                type = 'password'
                fullWidth
                sx = {{mb:2, mt:2, width:"100", backgroundColor:"rgba(255,154,64,.2)", input:{color:"white"}}}
                placeholder = "Confirm Password"
                value = {formik.values.confirmPassword}
                onChange = {formik.handleChange}
                error = {formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText = {formik.touched.confirmPassword && formik.errors.confirmPassword}
            />

            <TextField
                id = 'img'
                name = 'img'
                fullWidth
                sx = {{mb:2, mt:2, width:"100", backgroundColor:"rgba(255,154,64,.2)", input:{color:"white"}}}
                placeholder = "Paste Image Url"
                value = {formik.values.img}
                onChange = {formik.handleChange}
                error = {formik.touched.img && Boolean(formik.errors.img)}
                helperText = {formik.touched.img && formik.errors.img}
            />
      
            <Typography sx={{display: 'flex', justifyContent: 'space-around', pt:3}}>
            <DarkButton type="submit" sx={{mb:1}}>{user.token ? "Update" : "Get Started"}</DarkButton>
            
            
            {user.token? 
            ""
            :
            <Link to="/login" onClick={()=>handleLogin()}style={{textDecoration:"none"}}><DarkButton>Login</DarkButton></Link>}
            </Typography>
        </form>
        
    )
}
