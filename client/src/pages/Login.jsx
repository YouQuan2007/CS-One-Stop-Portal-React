// Import necessary libraries
import { useState } from 'react';
import '../App.css';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:5000/auth1/login', { email, password })
      .then((response) => {
        if (response.data.status) {
          setAlertMessage("Login Successful!");
          setShowAlertModal(true);
          //localStorage.setItem('username', response.data.userName);
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          localStorage.setItem('role', response.data.role);
        } else {
          setAlertMessage("Login Failed!");
          setShowAlertModal(true);
        }
        console.log(response);
      }).catch((err) => {
        console.log("this is error", err);
        setAlertMessage("Invalid email or password! Please try again.");
        setShowAlertModal(true);
      });
  };

  const handleCloseAlert = () => {
    setShowAlertModal(false);
    if (alertMessage === "Login Successful!") {
      navigate('/dashboard');
    }
  };

  return (
    <div className='sign-up-container'>
      <img src={logo} alt="Logo" />
      <h1>CS One Stop Portal</h1>
      <h2>Log In</h2>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p></p>
        <button type="submit">Login</button>

        <p></p>
        <Link to="/forgotPassword">Forgot Password?</Link>
        <p>New user? <Link to="/signup">Sign up here!</Link></p>
      </form>

      <AlertModal
        show={showAlertModal}
        handleClose={handleCloseAlert}
        message={alertMessage}
      />
    </div>
  );
};

export default Login;
