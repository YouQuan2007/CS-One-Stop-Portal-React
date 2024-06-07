//import React from 'react'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
//import FileUpload from '../components/FileUpload';
import { Form, InputGroup } from 'react-bootstrap';
//import { Button } from 'react-bootstrap';


const Resources = () => {

  const [title, setTitle] = useState('')
  const [file, setFile] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  //const [permittedUsers, setPermittedUsers] = useState(''); // New state for permitted users
  const columns = [

      {
          name: 'Title',
          selector: row => row.title,
          sortable: true,
          maxWidth: '20%'
      },
      {
          name: 'File',
          selector: row => row.file,
          sortable: true,
          maxWidth: '20%'
      },
      {
          name: 'Uploaded Date',
          selector: 'uploadedDate',
          sortable: true,
          format: row => new Date(row.uploadedDate).toLocaleString().split(',')[0],
          maxWidth: '20%',

      },
      // {
      //     name: 'Permitted Users',
      //     selector: 'permittedUsers',
      //     sortable: true,
      //     maxWidth: '20%',
          
      


      // },
      {
          name: 'Action',
          //maxwidth: '200%',
          cell: row => 
          <>
              <button className="btn btn-primary btn-sm" onClick={() => handleView(row)}>View</button>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <button className="btn btn-warning btn-sm" onClick={() => handleEdit(row)}>Edit</button>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <button className="btn btn-danger btn-sm"  onClick={() => handleDelete(row)}>Delete</button>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <button className="btn btn-success btn-sm" onClick={() => handleGrantAccess(row)}>Grant Access</button>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <button className="btn btn-secondary btn-sm" onClick={() => handleRemoveAccess(row)}>Remove Access</button>
              
          </>
          
          
      }

  ];


  useEffect(() => {
    
    fetchData();

  },[]);


  const fetchData = async () => {

    try{
      const result = await Axios.get('http://localhost:5000/get-files');
      setData(()=>result.data.data);

    }catch(err){
      console.log("Hello this is error",err);
    }


  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello", title, file);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('fileName', file.name);
    //formData.append('permittedUsers', permittedUsers);
    // alert("File uploaded successfully!");
  
    try {
      const result = await Axios.post('http://localhost:5000/upload-files', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (result.status === 200) {
        alert(result.data.message); // Display the success message from the backend
  
        // Fetch the updated list of files from the backend
        const updatedFiles = await Axios.get('http://localhost:5000/get-files');
  
        // Update the frontend state or data structure with the updated list of files
        setData(updatedFiles.data.data);
      } else {
        console.log("this is error", result.data.error) //Console log the error message from the backend
        alert(result.data.error); // Display the error message from the backend
      }

      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

const handleView = row => {
  // Handle view action
  window.open(`http://localhost:5000/files/${row.file}`);
};

const handleEdit = row => {
  // Handle edit action
  const newTitle = prompt("Enter new title", row.title);
  if(newTitle){
    Axios.put(`http://localhost:5000/update-files/${row._id}`, 
    {id: row._id, title: newTitle})
    .then((response) => {
      if(response.data.success){
        alert("Title has been updated!");
        fetchData();
      }
    }).catch((err) => {
      console.log(err);
    });
  }

};

const handleDelete = row => {
  // Handle delete action
    Axios.delete(`http://localhost:5000/delete-files/${row._id}`).then((response) => {
    if(response.data.status){
      alert("Data has been deleted!");
      fetchData();
      console.log("this is response", response);
    }
  }).catch((err) => {
    console.log(err);
  });
};

const handleGrantAccess = row => {
  const email = prompt("Enter the email of the user to grant access");
  Axios.put(`http://localhost:5000/grant-access/${row._id}`, { email })
  .then(response => {
    if (email){
      if (response.data.status){
        alert(response.data.status);
        fetchData();
    }
  }
}).catch(err => {
    console.log(err);
    console.log("this is error", err.response.data.error);
  });
};

const handleRemoveAccess = row => {
  const userEmail = prompt("Enter the email of the user to remove access");
  if (userEmail) {
    Axios.put(`http://localhost:5000/remove-access/${row._id}`, { userEmail })
      .then(response => {
        if (response.data.message) {
          alert(response.data.message);
          fetchData();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

  return (
    <>
    <div className = 'competition-container'>
    <form className = 'resource-form' onSubmit={handleSubmit}>
                <h2>Upload resources</h2>

                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" placeholder="Title"
                onChange = {(e) => setTitle(e.target.value)} 
                autoComplete="off" required/>

                <label htmlFor="file">Select file: (ONLY PDF is accepted)</label>
                <input type="file" className="form-control" accept = "application/pdf"
                onChange = {(e) => setFile(e.target.files[0])} 
                autoComplete="off" required/>

          {/* <label htmlFor="permittedUsers">Permitted Users (comma-separated emails):</label>
          <input type="text" className="form-control" placeholder="Enter emails separated by commas"
            onChange={(e) => setPermittedUsers(e.target.value)}
            autoComplete="off" required /> */}

          <p></p>
                
                <p></p>
        <button onSubmit="submit">Upload</button>
                <p></p>
                
    </form>
    </div>
    
    
    <div className="resources-container">
      <div className="w-80">
        <Form>
          <InputGroup className='my-3'>
            <Form.Control 
            type="text" 
            placeholder="Search by Title" 
            onChange={e => setSearchTerm(e.target.value)}
            onSubmit={fetchData} />
          </InputGroup>
        </Form>
      <DataTable
      columns={columns} 
      data={data.filter((item)=>{
        return searchTerm.toLowerCase() === ''
          ? item
          : item.title.toLowerCase().includes(searchTerm.toLowerCase())
      })}
      pagination
      fixedHeader
      >
      </DataTable>
      
      </div>
    </div>
    </>  
  )
}

export default Resources