import Axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
//import { set } from 'mongoose';

const Competitions = () => {
  const [file, setFile] = useState([]);
  const [description, setDescription] = useState('');
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roles, setRoles] = useState([]);
  //const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // New state for edit modal
  const [currentRow, setCurrentRow] = useState(null);
  const [newDescription, setNewDescription] = useState('');

  // State for general purpose modal
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <button className="btn btn-success btn-sm" onClick={() => handleGrantAccess(row)}>Grant Access</button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <button className="btn btn-secondary btn-sm" onClick={() => handleRemoveAccess(row)}>Remove Access</button>
        </>
    }
  ];

  useEffect(() => {
    fetchData();
    fetchRoles();
    //fetchEmails();
  }, []);

  const fetchData = async () => {
    try {
      const result = await Axios.get('http://localhost:5000/get-competitions');
      setData(result.data.data);
    } catch (err) {
      console.log("Hello this is error", err);
    }
  };

  // const fetchEmails = async () => {
  //   try {
  //     const result = await Axios.get('http://localhost:5000/get-emails');
  //     setEmails(result.data.emails.map(email => ({ value: email, label: email })));
  //   } catch (err) {
  //     console.log("Error fetching emails", err);
  //   }
  // };

  const fetchRoles = async () => {
    
    try {
      const roles = [
        { value: 'lecturers', label: 'Lecturers' },
        { value: 'students', label: 'Students' }
      ];

    // Assuming setRoles is a state setter function
    setRoles(roles);


    } catch (err) {
      console.log("Error fetching roles", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a valid image file.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);

    try {
      const result = await Axios.post('http://localhost:5000/upload-competitions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (result.status === 200) {
        setAlertMessage(result.data.message);
        setShowAlertModal(true);
        const updatedFiles = await Axios.get('http://localhost:5000/get-competitions');
        setData(updatedFiles.data.data);
      } else {
        setAlertMessage(result.data.error);
        setShowAlertModal(true);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (file && validImageTypes.includes(file.type)) {
      setFile(file);
    } else {
      alert('Only image files (PNG, JPEG, JPG) are allowed.');
      e.target.value = ''; // Clear the input
    }
  };

  const handleView = row => {
    window.open(`http://localhost:5000/competitions/${row.file}`, '_blank');
  };

  // const handleEdit = row => {
  //   const newDescription = prompt("Enter new description", row.description);
  //   if (row.description) {
  //     Axios.put(`http://localhost:5000/update-competitions/${row._id}`,
  //       { id: row._id, description: newDescription })
  //       .then((response) => {
  //         if (response.data.success) {
  //           alert("Description has been updated!");
  //           localStorage.setItem('description', newDescription);
  //           fetchData();
  //         }
  //       }).catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  const handleEdit = row => {

    setCurrentRow(row);
    setNewDescription(row.description); //Set the current description as the initial description
    setShowEditModal(true); //Show the edit modal
  };

  const handleEditSubmit = row => {

    Axios.put(`http://localhost:5000/update-competitions/${row._id}`,
      { id: currentRow._id, description: newDescription })
      .then((response) => {
        if (response.data.success) {
          setAlertMessage("Description has been updated!");
          setShowAlertModal(true);
          fetchData();
        }
      }).catch((err) => {
        console.log(err);
      });
    setShowEditModal(false);
  };

  const handleDelete = row => {
    Axios.delete(`http://localhost:5000/delete-competitions/${row._id}`).then((response) => {
      if (response.data.status) {
        setAlertMessage("Data has been deleted!");
        setShowAlertModal(true);
        fetchData();
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleGrantAccess = row => {
    setCurrentRow(row);
    setShowGrantModal(true);
  };

  const handleRemoveAccess = row => {
    setCurrentRow(row);
    setShowRemoveModal(true);
  };

  const handleGrantAccessSubmit = async () => {
    if (selectedEmails.length > 0) {
      const emails = selectedEmails.map(email => email.value);
      try {
        const response = await Axios.put(`http://localhost:5000/auth3/grant-access/${currentRow._id}`, { emails });
        if (response.data.message) {
          alert(response.data.message);
          fetchData();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please select at least one email");
    }
    setShowGrantModal(false);
  };

  const handleRemoveAccessSubmit = async () => {
    if (selectedEmails.length > 0) {
      const emails = selectedEmails.map(email => email.value);
      try {
        const response = await Axios.put(`http://localhost:5000/auth3/remove-access/${currentRow._id}`, { emails });
        if (response.data.message) {
          alert(response.data.message);
          fetchData();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please select at least one email");
    }
    setShowRemoveModal(false);
  };

  return (
    <div className='main-container-resource'>
      <form className='resource-form' onSubmit={handleSubmit}>
        <h2>Upload competitions</h2>
        <label htmlFor="file">Select file: (ONLY IMAGES are accepted)</label>
        <input
          type="file"
          className="form-control"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => handleFileChange(e)}
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

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showGrantModal} onHide={() => setShowGrantModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Grant Access</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            isMulti
            options={roles}
            onChange={setSelectedEmails}
            className="mb-3"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGrantModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleGrantAccessSubmit}>
            Grant Access
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Access</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            isMulti
            options={roles}
            onChange={setSelectedEmails}
            className="mb-3"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRemoveModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRemoveAccessSubmit}>
            Remove Access
          </Button>
        </Modal.Footer>
      </Modal>

      {/* General purpose modal */}
      <Modal show={showAlertModal} onHide={() => setShowAlertModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{alertMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAlertModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Competitions;
