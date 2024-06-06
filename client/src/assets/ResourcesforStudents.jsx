import { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { Form, InputGroup } from 'react-bootstrap';

const ResourcesforStudents = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { name: 'Title', selector: row => row.title, sortable: true, maxWidth: '20%' },
    { name: 'File', selector: row => row.file, sortable: true, maxWidth: '20%' },
    { name: 'Uploaded Date', selector: 'uploadedDate', sortable: true, format: row => new Date(row.uploadedDate).toLocaleDateString(), maxWidth: '20%' },
    { name: 'Action', cell: row => <button className="btn btn-primary btn-sm" onClick={() => handleView(row)}>View</button>, maxWidth: '20%' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:5000/get-files');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleView = row => {
    window.open(`http://localhost:5000/files/${row.file}`);
  };

  return (
    <main className="main-container-resource">
      <div className="competition-container">
        <Form>
          <InputGroup className="my-3">
            <Form.Control
              type="text"
              placeholder="Search by Title"
              onChange={e => setSearchTerm(e.target.value)}
              onSubmit={fetchData}
            />
          </InputGroup>
        </Form>
        <DataTable
          columns={columns}
          data={data.filter(item => searchTerm.toLowerCase() === '' ? item : item.title.toLowerCase().includes(searchTerm.toLowerCase()))}
          pagination
          fixedHeader
          className="data-table-wrapper"
        />
      </div>
    </main>
  );
};

export default ResourcesforStudents;
