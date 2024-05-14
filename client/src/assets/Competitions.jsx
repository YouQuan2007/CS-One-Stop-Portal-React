//import React from 'react'
//import { Link } from 'react-router-dom';
//import Axios from 'axios';


const Competitions = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
    // Axios.post('http://localhost:5000/auth/login', {
        
    //     email, 
    //     password}).then((response) => {
    //         if(response.data.status){
    //             navigate('/dashboard')
    //             alert("Login successful!")
    //         }
    //         console.log(response)
    //     }).catch((err) => {
    //         alert("Invalid email or password!")
    //         console.log(err)
    //     })  

}


  return (
    <div className = 'competition-container'>
    <form className = 'sign-up-form' onSubmit={handleSubmit}>
                <h2>Upload competitions</h2>
                <label htmlFor="image">Select file:</label>
                <input type="image" placeholder="Image" 
                className="form-control" accept="image/*"
                
                autoComplete="off" required/>

                <label htmlFor="description">Description:</label>
                <input type="description" placeholder="Description" 
                
                required/>
                <p></p>
        <button type="submit">Upload</button>
                <p></p>
                
            </form>
      </div>
  )
}


export default Competitions