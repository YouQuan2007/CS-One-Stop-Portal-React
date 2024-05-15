import { useState } from 'react'
import '../App.css'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png'

const RegisterAsLecturers = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:5000/register-as-Lecturers', {
            username, 
            email, 
            password,
            }).then((response) => {
                if(response.data.status){
                    navigate('/login')
                    alert("Sign up successful!")
                }
                console.log(response)
            }).catch((err) => {
                console.log(err)
            })  

    }
  return (
    <div className = 'sign-up-container'>
        <img src={logo}/>
        <h1>CS One Stop Portal</h1>
        <h2>Sign Up as Lecturers</h2>
            <form className = 'sign-up-form' onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" placeholder="Username" 
                onChange = {(e) => setUsername(e.target.value)}
                required/>

                <label htmlFor="email">Email:</label>
                <input type="email" placeholder="Email" 
                onChange = {(e) => setEmail(e.target.value)}
                autoComplete="off" required/>

                <label htmlFor="password">Password:</label>
                <input type="password" placeholder="********" 
                onChange = {(e) => setPassword(e.target.value)}
                required/>
                <p></p>
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to ="/login">Login here!</Link></p>
            </form>

    </div>
    
  )
}

export default RegisterAsLecturers