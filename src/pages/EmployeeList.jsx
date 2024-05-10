import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getDatabase, ref, set, onValue, get, remove } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  & label {
    margin-right: 10px;
    font-weight: bold;
  }

  & input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
`;

const TotalEmployees = styled.p`
margin-left:16px;
  font-size: 16px;
  font-weight: bold;
`;

const CreateButton = styled.button`
margin-bottom: 15px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
`;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [courses, setCourses] = useState([]);
  const [file, setFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const employeesRef = ref(db, 'employees');
    onValue(employeesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const employeesList = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setEmployees(employeesList);
      } else {
        console.log('No data available');
      }
    }, (error) => {
      console.error('Error fetching employees:', error.message);
    });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleEdit = (employeeId) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    setName(employee.name);
    setEmail(employee.email);
    setMobile(employee.mobile);
    setDesignation(employee.designation);
    setGender(employee.gender);
    setCourses(employee.courses);
    setEditEmployeeId(employeeId);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (employeeId) => {
    const db = getDatabase();
    await remove(ref(db, `employees/${employeeId}`));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data (client-side validation)
    if (!name || !email || !mobile || !designation || !gender || courses.length === 0 || !file) {
      alert('All fields are required.');
      return;
    }

    const db = getDatabase();
    const employeesRef = ref(db, 'employees');

    let employeeKey = editEmployeeId;
    if (!editMode) {
      const snapshot = await get(employeesRef);
      let lastKey = 0;
      if (snapshot.exists()) {
        const data = snapshot.val();
        const keys = Object.keys(data).map(Number).filter((key) => !isNaN(key));
        lastKey = keys.length > 0 ? Math.max(...keys) : 0;
      }
      employeeKey = String(lastKey + 1);
    }

    const employeeData = {
      name,
      email,
      mobile,
      designation,
      gender,
      courses,
      imageUrl: '',
      createDate: new Date().toLocaleDateString(),
    };
    await set(ref(db, `employees/${employeeKey}`), employeeData);

    const storage = getStorage();
    const storageRef2 = storageRef(storage, `images/${employeeKey}/${file.name}`);
    await uploadBytes(storageRef2, file);

    const imageUrl = await getDownloadURL(storageRef2);
    await set(ref(db, `employees/${employeeKey}/imageUrl`), imageUrl);

    setName('');
    setEmail('');
    setMobile('');
    setDesignation('');
    setGender('');
    setCourses([]);
    setFile(null);
    setEditMode(false);
    setEditEmployeeId(null);
    setShowForm(false);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateEmployee = () => {
    setShowForm(true);
    setName('');
    setEmail('');
    setMobile('');
    setDesignation('');
    setGender('');
    setCourses([]);
    setFile(null);
    setEditMode(false);
    setEditEmployeeId(null);
  };

  return (
    <Container>
      <SearchContainer>
        <label>Search by Name:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter name to search"
        />
        <TotalEmployees>Total Employees: {employees.length}</TotalEmployees>
      </SearchContainer>
      <EmployeeTable
        employees={filteredEmployees}
        searchTerm={searchTerm}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      {showForm && (
        <EmployeeForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          mobile={mobile}
          setMobile={setMobile}
          designation={designation}
          setDesignation={setDesignation}
          gender={gender}
          setGender={setGender}
          courses={courses}
          setCourses={setCourses}
          file={file}
          setFile={setFile}
          editMode={editMode}
          setEditMode={setEditMode}
          editEmployeeId={editEmployeeId}
          setEditEmployeeId={setEditEmployeeId}
          setShowForm={setShowForm}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange} // Pass handleFileChange here
        />
      )}

      <CreateButton onClick={() => setShowForm(true)}>Create Employee</CreateButton>

     

    </Container>
  );
};

export default EmployeeList;