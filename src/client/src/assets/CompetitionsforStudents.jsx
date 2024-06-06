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
        <>
            <button className="btn btn-primary btn-sm" onClick={() => handleView(row)}>View</button>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

            
        </>
        
        
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
    <main className='main-container'>
    <div className = "resources-container">
    <div className="w-80">
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
data={data.filter((item)=>{
  return searchTerm.toLowerCase() === ''
  ? item
  : item.description.toLowerCase().includes(searchTerm.toLowerCase())
})}
pagination
fixedHeader>
</DataTable>

{/* <Card 
data={data.filter((item)=>{
  return searchTerm.toLowerCase() === ''
  ? item
  : item.title.toLowerCase().includes(searchTerm.toLowerCase())
  })} >
  <Card.Header as="h5">Competitions</Card.Header>
  <p></p>
    <Card>
  <Card.Body>
    <Card.Title> {file} </Card.Title>
    <Card.Text>
      {description}
    </Card.Text>
    <a href="" className="btn btn-primary" onClick={handleView}>View</a>
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <a href="" className="btn btn-warning" onClick={handleEdit}>Edit</a>
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <a href="" className="btn btn-danger" onClick={handleDelete}>Delete</a>
  </Card.Body>
    </Card>
  <p></p>
</Card> */}
</div>
    </div>
    </main>
    </>
  )
}


export default CompetitionsforStudents