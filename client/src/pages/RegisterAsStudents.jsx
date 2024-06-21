import { useState } from 'react'
import '../App.css'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png'
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
//import { set } from 'mongoose';

// AlertModal Component
const AlertModal = ({ show, handleClose, message }) => (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );

  AlertModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
  }; 


const RegisterAsStudents = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:5000/auth2/register-as-Students', {
            username, 
            email, 
            password,
            }).then((response) => {
                if(response.data.status){
                    setAlertMessage("Sign up Successful!");
                    setShowAlertModal(true);
                    navigate('/loginasstudents')
                    
                }else {
                    setAlertMessage("Sign Up Failed!");
                    setShowAlertModal(true);
                  }
                console.log(response)
                setAlertMessage("Sign up Successful!");
                    setShowAlertModal(true);
                    navigate('/loginasstudents')
          
            }).catch((err) => {
                console.log("this is error", err);
                setAlertMessage("An error occurred. Please try again.");
                setShowAlertModal(true);
            })  

    }

    const handleCloseAlert = () => {
        setShowAlertModal(false);
        if (alertMessage === "Login Successful!") {
          navigate('/dashboard');
        }
      };
  return (
    <div className = 'sign-up-container'>
        <img src={logo}/>
        <h1>CS One Stop Portal</h1>
        <h2>Sign Up as Students</h2>
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


            <AlertModal
        show={showAlertModal}
        handleClose={handleCloseAlert}
        message={alertMessage}
      />
    </div>
    
  )
}

export default RegisterAsStudents