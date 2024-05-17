//import React from 'react'
import Axios from 'axios';
import { useEffect, useState } from 'react'
//import { useEffect } from 'react'
//import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { Form, InputGroup } from 'react-bootstrap';

const Competitions = () => {
  const [file, setFile] = useState('')
  //const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');


  const columns = [

    {
        name: 'File',
        selector: row => row.file,
        sortable: true,
        maxWidth: '20%'
    },
    {
        name: 'Description',
        selector: row => row.description,
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
    {
        name: 'Action',
        cell: row => 
        <>
            <button className="btn btn-primary btn-sm" onClick={() => handleView(row)}>View</button>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <button className="btn btn-warning btn-sm" onClick={() => handleEdit(row)}>Edit</button>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <button className="btn btn-danger btn-sm"  onClick={() => handleDelete(row)}>Delete</button>
            
        </>
        
        
    }

];

useEffect(() => {
    
  fetchData();

},[]);


const fetchData = async () => {

  try{
    const result = await Axios.get('http://localhost:5000/get-competitions');
    //console.log("This is result",result.data.data);
    setData(result.data.data);

  }catch(err){
    console.log("Hello this is error",err);
  }


};
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("This is uploaded image", file)
    console.log("This is description", description)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);  
    
    alert("File uploaded successfully!");
    fetchData();
    const result = await Axios.post('http://localhost:5000/upload-competitions', formData, 
    {
      headers: { 'Content-Type': 'multipart/form-data'},
    });
    
    console.log(result);
}

  const handleView = row => {
  // Handle view action
  window.open(`http://localhost:5000/competitions/${row.file}`);
  };

  const handleEdit = row => {
    // Handle edit action
    const newDescription = prompt("Enter new description", row.description);
    if(row.description){
      Axios.put(`http://localhost:5000/update-competitions/${row._id}`, 
      {id: row._id, description: newDescription})
      .then((response) => {
        if(response.data.success){
          alert("Description has been updated!");
          fetchData();
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  
  };

  const handleDelete = row => {
    // Handle delete action
      Axios.delete(`http://localhost:5000/delete-competitions/${row._id}`).then((response) => {
      if(response.data.status){
        alert("Data has been deleted!");
        fetchData();
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
    <div className = 'competition-container'>
    <form className = 'sign-up-form' onSubmit={handleSubmit}>
                <h2>Upload competitions</h2>
                <label htmlFor="image">Select file: (ONLY IMAGES are accepted)</label>
                <input type="file" 
                className="form-control" accept="application/image"
                onChange= {(e) => setFile(e.target.files[0])}
                autoComplete="off" required/>

                <label htmlFor="description">Description:</label>
                <input type="description" placeholder="Description" 
                onChange= {(e) => setDescription(e.target.value)}
                required/>
                <p></p>
        <button type="submit">Upload</button>
                <p></p>
                
            </form>
    </div>

    <div className = "resources-container">
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
fixedHeader>
</DataTable>

</div>
    </div>
    
    </>
  )
}


export default Competitions