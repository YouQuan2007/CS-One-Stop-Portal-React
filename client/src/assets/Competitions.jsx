import Axios from 'axios';
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { Form, InputGroup } from 'react-bootstrap';

const Competitions = () => {
  const [file, setFile] = useState([]);
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
        maxWidth: '20%'
    },
    {
        name: 'Action',
        cell: row => 
        <>
            <button className="btn btn-primary btn-sm" onClick={() => handleView(row)}>View</button>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <button className="btn btn-warning btn-sm" onClick={() => handleEdit(row)}>Edit</button>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row)}>Delete</button>
        </>
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try{
      const result = await Axios.get('http://localhost:5000/get-competitions');
      setData(result.data.data);
    } catch(err){
      console.log("Hello this is error", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    
    try {
      const result = await Axios.post('http://localhost:5000/upload-competitions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (result.status === 200) {
        alert(result.data.message);
        const updatedFiles = await Axios.get('http://localhost:5000/get-competitions');
        setData(updatedFiles.data.data);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  const handleView = row => {
    window.open(`http://localhost:5000/competitions/${row.file}`, '_blank');
  };

  const handleEdit = row => {
    const newDescription = prompt("Enter new description", row.description);
    if(row.description){
      Axios.put(`http://localhost:5000/update-competitions/${row._id}`, 
      {id: row._id, description: newDescription})
      .then((response) => {
        if(response.data.success){
          alert("Description has been updated!");
          localStorage.setItem('description', newDescription);
          fetchData();
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  const handleDelete = row => {
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
    <div className='main-container-resource'>
        <form className='resource-form' onSubmit={handleSubmit}>
          <h2>Upload competitions</h2>
          <label htmlFor="file">Select file: (ONLY IMAGES are accepted)</label>
          <input
            type="file"
            className="form-control"
            accept="application/image/*"
            onChange={(e) => setFile(e.target.files[0])}
            autoComplete="off"
            required
          />
          <label htmlFor="description">Description:</label>
          <input
            type="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <p></p>
          <div className="upload-container">
          <button className="upload" type="submit">Upload</button>
          </div>
          <p></p>
        </form>
      

        <div className="resources-container">
       
       <Form>
         <InputGroup className='my-3'>
           <Form.Control
             type="text"
             placeholder="Search by Description"
             onChange={e => setSearchTerm(e.target.value)}
             onSubmit={fetchData}
           />
         </InputGroup>
       </Form>
       <DataTable
         columns={columns}
         data={data.filter((item)=>{
           return searchTerm.toLowerCase() === ''
           ? item
           : item.description.toLowerCase().includes(searchTerm.toLowerCase())
         })}
         pagination
         fixedHeader
       >
       </DataTable>
    
   </div>
  </div>
  );
}

export default Competitions;
