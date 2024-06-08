import { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { Form, InputGroup } from 'react-bootstrap';

const Resources = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState([]);
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
      cell: row =>
        <>
          <button className="btn btn-primary btn-sm" onClick={() => handleView(row)}>View</button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <button className="btn btn-warning btn-sm" onClick={() => handleEdit(row)}>Edit</button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row)}>Delete</button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <button className="btn btn-success btn-sm" onClick={() => handleGrantAccess(row)}>Grant Access</button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <button className="btn btn-secondary btn-sm" onClick={() => handleRemoveAccess(row)}>Remove Access</button>
        </>
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await Axios.get('http://localhost:5000/get-files');
      setData(result.data.data);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('fileName', file.name);
  
    try {
      const result = await Axios.post('http://localhost:5000/upload-files', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (result.status === 200) {
        alert(result.data.message);
        const updatedFiles = await Axios.get('http://localhost:5000/get-files');
        setData(updatedFiles.data.data);
      } else {
        alert(result.data.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleView = row => {
    window.open(`http://localhost:5000/files/${row.file}`);
  };

  const handleEdit = row => {
    const newTitle = prompt("Enter new title", row.title);
    if (newTitle) {
      Axios.put(`http://localhost:5000/update-files/${row._id}`, { id: row._id, title: newTitle })
        .then((response) => {
          if (response.data.success) {
            alert("Title has been updated!");
            fetchData();
          }
        }).catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = row => {
    Axios.delete(`http://localhost:5000/delete-files/${row._id}`).then((response) => {
      if (response.data.status) {
        alert("Data has been deleted!");
        fetchData();
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleGrantAccess = row => {
    const email = prompt("Enter the email of the user to grant access");
    if (email) {
      Axios.put(`http://localhost:5000/grant-access/${row._id}`, { email })
        .then(response => {
          if (response.data.status) {
            alert(response.data.status);
            fetchData();
          }
        }).catch(err => {
          console.log(err);
        });
    }
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
        }).catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div className="main-container-resource">
      <form className="resource-form" onSubmit={handleSubmit}>
        <h2>Upload resources</h2>
        <label htmlFor="title">Title:</label>
        <input type="text" className="form-control" placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          autoComplete="off" required />
        <label htmlFor="file">Select file: (ONLY PDF is accepted)</label>
        <input type="file" className="form-control" accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          autoComplete="off" required />
        <p></p>
        <button type="submit">Upload</button>
        <p></p>
      </form>

      <div className="resources-container">
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
          data={data.filter((item) => {
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
  );
};

export default Resources;
