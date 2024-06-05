//import React from 'react'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
//import FileUpload from '../components/FileUpload';
import { Form, InputGroup } from 'react-bootstrap';
//import { Button } from 'react-bootstrap';


const ResourcesforStudents = () => {


  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
      {
          name: 'Action',
          //maxwidth: '30%',
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

    try {
      const response = await Axios.get('http://localhost:5000/get-files');
      console.log("this is response", response);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }


  };


const handleView = row => {
  // Handle view action
  window.open(`http://localhost:5000/files/${row.file}`);
};


  return (
    <> 
      
    <div className="competition-container">
      <div className="w-70">
        
        <Form>
          <InputGroup className='my-3'>
            <Form.Control 
            type="text" 
            placeholder="Search by Title" 
            onChange={e => setSearchTerm(e.target.value)}
            onSubmit={fetchData} />
          </InputGroup>
        </Form>
      <DataTable tableStyle={{ minWidth: '50rem' }}
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

export default ResourcesforStudents