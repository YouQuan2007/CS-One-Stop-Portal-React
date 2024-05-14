//import React from 'react'

import { useState } from 'react'
import '../App.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png'

const ForgotPassword = () => {

    
    const [email, setEmail] = useState('')
    

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:5000/auth/forgot-password', {
             
            email, 
            }).then((response) => {
                if(response.data.status){
                    alert("Please check your email for the reset password link!")
                    navigate('/login')
                }
                console.log(response.data)
            }).catch((err) => {
                console.log(err)
            })  

    }
  return (
    
    <div className = 'sign-up-container'>
        
        <img src={logo}/>
        <h1>CS One Stop Portal</h1>
        <form className = 'sign-up-form' onSubmit={handleSubmit}>
            
            <h2>Forgot Password</h2>
            

                <label htmlFor="email">Email:</label>
                <input type="email" placeholder="Email" 
                onChange = {(e) => setEmail(e.target.value)}
                autoComplete="off" required/>
        <button type="submit">Send Reset Password Link</button>
        </form>
    </div>
  )
}

export default ForgotPassword