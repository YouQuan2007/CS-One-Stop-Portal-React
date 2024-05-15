//import React
import { useState } from 'react'
import '../App.css'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png'

const Login = () => {

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
        Axios.post('http://localhost:5000/auth/login', {
            
            email, 
            password}).then((response) => {
                if(response.data.status){
                    navigate('/dashboard');
                    <div className='alert alert-success' role='alert'>
                        Welcome!
                        You have successfully logged in.
                    </div>
                    localStorage.setItem('email', email)
                    localStorage.setItem('password', password)
                    //console.log("this is user",email,password)
                }
                console.log(response)
            }).catch((err) => {
                alert("Invalid email or password!")
                console.log(err)
            })  

    }
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
                <button type="submit">Login</button>
                <p></p>
                <Link to ="/forgotPassword">Forgot Password?</Link>
                <p>New user? <Link to ="/signup">Sign up here!</Link></p>
            </form>

    </div>
    
  )
}

export default Login