//import React from 'react'
//import { Link } from 'react-router-dom';
//import Axios from 'axios';
//import { useEffect, useState } from 'react'
import { useEffect } from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
// import DataTable from 'react-data-table-component';
// import { Form, InputGroup } from 'react-bootstrap';

const Competitions = () => {
  // const [image, setImage] = useState('')
  // const [description, setDescription] = useState('')
  // const [data, setData] = useState([])
  // const [searchTerm, setSearchTerm] = useState('');


//   const columns = [

//     {
//         name: 'Title',
//         selector: row => row.title,
//         sortable: true,
//         maxWidth: '20%'
//     },
//     {
//         name: 'File',
//         selector: row => row.file,
//         sortable: true,
//         maxWidth: '20%'
//     },
//     {
//         name: 'Uploaded Date',
//         selector: 'uploadedDate',
//         sortable: true,
//         //format: row => new Date(row.date).toLocaleString(),
//         //format: row => new Date(row.uploadedDate).toLocaleString().split(',')[0],
//         format: row => new Date(row.uploadedDate).toLocaleString().split(',')[0],
//         maxWidth: '20%',

//     },
//     {
//         name: 'Action',
//         //maxwidth: '30%',
//         cell: row => 
//         <>
//             <button className="btn btn-primary btn-sm" onClick={() => handleView(row)}>View</button>
//             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
//             <button className="btn btn-warning btn-sm" onClick={() => handleEdit(row)}>Edit</button>
//             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
//             <button className="btn btn-danger btn-sm"  onClick={() => handleDelete(row)}>Delete</button>
            
//         </>
        
        
//     }

// ];

useEffect(() => {
    
  fetchData();

},[]);


const fetchData = async () => {

  try{
    const result = await Axios.get('http://localhost:5000/get-competitions');
    console.log("This is result",result.data.data);
    //setData(result.data.data);

  }catch(err){
    console.log("Hello this is error",err);
  }


};
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
                className="form-control" accept="application/image"
                
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