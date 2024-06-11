import { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';
import Select from 'react-select';

const Resources = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // New state for edit modal
  const [currentRow, setCurrentRow] = useState(null);
  const [newTitle, setNewTitle] = useState(''); // New state for new title


  // State for general purpose modal
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
    fetchRoles();
  }, []);

  const fetchData = async () => {
    try {
      const result = await Axios.get('http://localhost:5000/get-files');
      setData(result.data.data);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const fetchRoles = async () => {
    try {
      const roles = [
        { value: 'lecturers', label: 'Lecturers' },
        { value: 'students', label: 'Students' }
      ];
      setRoles(roles);
    } catch (err) {
      console.log("Error fetching roles", err);
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
        setAlertMessage(result.data.message);
        setShowAlertModal(true);
        const updatedFiles = await Axios.get('http://localhost:5000/get-files');
        setData(updatedFiles.data.data);
      } else {
        setAlertMessage(result.data.error);
        setShowAlertModal(true);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleView = row => {
    window.open(`http://localhost:5000/files/${row.file}`);
  };

  // const handleEdit = row => {
  //   const newTitle = prompt("Enter new title", row.title);
  //   if (newTitle) {
  //     Axios.put(`http://localhost:5000/update-files/${row._id}`, { id: row._id, title: newTitle })
  //       .then((response) => {
  //         if (response.data.success) {
  //           setAlertMessage("Title has been updated!");
  //           setShowAlertModal(true);
  //           fetchData();
  //         }
  //       }).catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  const handleEdit = row => {
    setCurrentRow(row);
    setNewTitle(row.title); // Set the current title as the initial value
    setShowEditModal(true); // Show the edit modal
  };

  const handleEditSubmit = row => {
    Axios.put(`http://localhost:5000/update-files/${row._id}`, { id: currentRow._id, title: newTitle })
      .then((response) => {
        if (response.data.success) {
          setAlertMessage("Title has been updated!");
          setShowAlertModal(true);
          fetchData();
        }
      }).catch((err) => {
        console.log(err);
      });
    setShowEditModal(false); // Hide the edit modal after submission
  };

  const handleDelete = row => {
    Axios.delete(`http://localhost:5000/delete-files/${row._id}`).then((response) => {
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
        const response = await Axios.put(`http://localhost:5000/auth3/grant-access/${currentRow._id}`, { email: emails[0] }); // Assuming single email selection
        if (response.data.message) {
          setAlertMessage(response.data.message);
          setShowAlertModal(true);
          fetchData();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setAlertMessage("Please select at least one email");
      setShowAlertModal(true);
    }
    setShowGrantModal(false);
  };

  const handleRemoveAccessSubmit = async () => {
    if (selectedEmails.length > 0) {
      const emails = selectedEmails.map(email => email.value);
      try {
        const response = await Axios.put(`http://localhost:5000/auth3/remove-access/${currentRow._id}`, { email: emails[0] }); // Assuming single email selection
        if (response.data.message) {
          setAlertMessage(response.data.message);
          setShowAlertModal(true);
          fetchData();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setAlertMessage("Please select at least one email");
      setShowAlertModal(true);
    }
    setShowRemoveModal(false);
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
          
        >
        </DataTable>
      </div>


      {/* Edit Modal */}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditSubmit(currentRow)}>
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

      {/* General Purpose Alert Modal */}
      <Modal show={showAlertModal} onHide={() => setShowAlertModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alertMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowAlertModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Resources;
