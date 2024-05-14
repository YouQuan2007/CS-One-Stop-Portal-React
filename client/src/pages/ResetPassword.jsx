//import React from 'react'

import { useState } from 'react'
import '../App.css'
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/images/Logo.png'

const ResetPassword = () => {

    
    const [password, setPassword] = useState('')
    const {token} = useParams()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:5000/auth/reset-password/'+token, {
             
            password, 
            }).then((response) => {
                if(response.data.status){
                    alert("Password has been reset successfully!")
                    navigate('/login')
                }
                console.log("hello this is response",response.data)
            }).catch((err) => {
                alert("Password reset failed!")
                console.log(err)
            })  

    }
  return (
    
    <div className = 'sign-up-container'>
        
        <img src={logo}/>
        <h1>CS One Stop Portal</h1>
        <form className = 'sign-up-form' onSubmit={handleSubmit}>
            
            <h2>Reset Password</h2>
            

            <label htmlFor="password">New password:</label>
                <input type="password" placeholder="********" 
                onChange = {(e) => setPassword(e.target.value)}
                required/>


        <button type="submit">Reset</button>
        </form>
    </div>
  )
}

export default ResetPassword