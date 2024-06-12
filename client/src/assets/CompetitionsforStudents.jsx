//import React from 'react'
import Axios from 'axios';
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { Form, InputGroup } from 'react-bootstrap';
//import Card from 'react-bootstrap/Card'

const CompetitionsforStudents = () => {
  // const [file, setFile] = useState([]);
  //const [image, setImage] = useState('')
  //const [description, setDescription] = useState('')
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
        
            <button className="btn btn-primary btn-sm" onClick={() => handleView(row)}>View</button>,
            maxWidth: '20%'
    }

];

useEffect(() => {
    
  fetchData();

},[]);


const fetchData = async () => {

  try{
    const result = await Axios.get('http://localhost:5000/get-competitions');
    setData(()=>result.data.data);

  }catch(err){
    console.log("Hello this is error",err);
  }


};


  const handleView = row => {
  //Handle view action
  window.open(`http://localhost:5000/competitions/${row.file}`, '_blank');
  };



  return (
    <>
    <main className='main-container-resource'>
    <div className = "dataTable-container">
    
  <Form>
    <InputGroup className='my-3'>
      <Form.Control 
      type="text" 
      placeholder="Search by Description" 
      onChange={e => setSearchTerm(e.target.value)}
      onSubmit={fetchData} />
    </InputGroup>
  </Form>
  <DataTable
        columns={columns}
        data={data.filter((item) => {
        const normalizedSearchTerm = searchTerm?.toLowerCase() || ''; // Ensure searchTerm is a string
        const normalizedDescription = item.description?.toLowerCase() || ''; // Ensure item.description is a string
    
        return normalizedSearchTerm === ''
        ? item
        : normalizedDescription.includes(normalizedSearchTerm);
        })}
        pagination
/>
    </div>
    </main>
    </>
  )
}


export default CompetitionsforStudents