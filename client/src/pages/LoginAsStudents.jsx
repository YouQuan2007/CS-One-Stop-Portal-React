//import React
import { useState } from 'react'
import '../App.css'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LoginAsStudents = () => {

    //const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [error, setError] = useState(false)
    // const [loading, setLoading] = useState(false)
    //const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    //Axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:5000/auth2/login-as-students',{
            
            email, 
            password,
            }).then((response) => {
                if(response.data.status){
                    //toast.success("Login Successful!")
                    alert("Login Successful!")
                    navigate('/dashboardforstudents');
                    localStorage.setItem('email', email)
                    localStorage.setItem('password', password)
                    localStorage.setItem('role', response.data.role)
                    //console.log("this is role", response.data.role)
                }
                console.log(response)
            }).catch((err) => {
                toast.error("Invalid email or password!")
                console.log("this is error",err)
            })  

    }

    const notify = () => {
        Axios.post('http://localhost:5000/auth2/login-as-students', {
            email, 
            password}).then(() => {
        if(email === '' || password === ''){
            toast.error("Please fill in all fields!")
        
        } else {
            toast.success("Login Successful!")
        }
    }
    )}

  return (
    <div className = 'sign-up-container'>
        <img src={logo} alt="Logo"/>
        <h1>CS One Stop Portal</h1>
        <h2>Log In</h2>
            <form className = 'sign-up-form' onSubmit={handleSubmit}>  
                <label htmlFor="email">Email:</label>
                <input type="email" placeholder="Email" 
                onChange = {(e) => setEmail(e.target.value)}
                autoComplete="off" required/>

                <label htmlFor="password">Password:</label>
                <input type="password" placeholder="********" 
                onChange = {(e) => setPassword(e.target.value)}
                required/>
                <p></p>
                <button type="submit" onClick={notify}>Login</button>
                <ToastContainer autoClose={10000}/>
                <p></p>
                <Link to ="/forgotPassword">Forgot Password?</Link>
                <p>New user? <Link to ="/signup">Sign up here!</Link></p>
            </form>

    </div>
    
  )
}

export default LoginAsStudents