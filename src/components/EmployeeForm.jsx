import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const RadioGroup = styled.div`
  margin-bottom: 10px;
`;

const CheckboxGroup = styled.div`
  margin-bottom: 10px;

  label {
    margin-right: 10px;
  }
`;

const FileInput = styled.input`
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 10px;
`;

const CancelButton = styled(Button)`
  background-color: #dc3545;
`;

const EmployeeForm = ({ 
  name, setName, 
  email, setEmail, 
  mobile, setMobile, 
  designation, setDesignation, 
  gender, setGender, 
  courses, setCourses, 
  file, setFile, 
  editMode, setEditMode, 
  setShowForm, 
  handleSubmit, handleFileChange
}) => (
  <Form onSubmit={handleSubmit}>
    <Label>Name:</Label>
    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />

    <Label>Email:</Label>
    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

    <Label>Mobile No:</Label>
    <Input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />

    <Label>Designation:</Label>
    <Select value={designation} onChange={(e) => setDesignation(e.target.value)}>
      <option value="HR">HR</option>
      <option value="Manager">Manager</option>
      <option value="Sales">Sales</option>
    </Select>

    <Label>Gender:</Label>
    <RadioGroup>
      <input type="radio" name="gender" value="M" checked={gender === 'M'} onChange={() => setGender('M')} />
      <label>Male</label>
      <input type="radio" name="gender" value="F" checked={gender === 'F'} onChange={() => setGender('F')} />
      <label>Female</label>
    </RadioGroup>

    <Label>Course:</Label>
    <CheckboxGroup>
      <input type="checkbox" value="MCA" checked={courses.includes('MCA')} onChange={(e) => setCourses(e.target.checked ? [...courses, 'MCA'] : courses.filter(course => course !== 'MCA'))} />
      <label>MCA</label>
      <input type="checkbox" value="BCA" checked={courses.includes('BCA')} onChange={(e) => setCourses(e.target.checked ? [...courses, 'BCA'] : courses.filter(course => course !== 'BCA'))} />
      <label>BCA</label>
      <input type="checkbox" value="BSC" checked={courses.includes('BSC')} onChange={(e) => setCourses(e.target.checked ? [...courses, 'BSC'] : courses.filter(course => course !== 'BSC'))} />
      <label>BSC</label>
    </CheckboxGroup>

    <Label>Img Upload:</Label>
    <FileInput type="file" onChange={handleFileChange} />

    <Button type="submit">{editMode ? 'Update Employee' : 'Submit'}</Button>
    <CancelButton type="button" onClick={() => setShowForm(false)}>Cancel</CancelButton>
  </Form>
);

export default EmployeeForm;
