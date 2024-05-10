import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #dee2e6;
  padding: 8px;
  text-align: left;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  margin-bottom:5px;
  margin-right: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const EmployeeTable = ({ employees, handleEdit, handleDelete }) => (
  <Table>
    <thead>
      <tr>
        <Th>Unique Id</Th>
        <Th>Image</Th>
        <Th>Name</Th>
        <Th>Email</Th>
        <Th>Mobile No</Th>
        <Th>Designation</Th>
        <Th>Gender</Th>
        <Th>Course</Th>
        <Th>Create Date</Th>
        <Th>Action</Th>
      </tr>
    </thead>
    <tbody>
      {employees.map((employee) => (
        <tr key={employee.id}>
          <Td>{employee.id}</Td>
          <Td>{employee.imageUrl && <Image src={employee.imageUrl} alt={employee.name} />}</Td>
          <Td>{employee.name}</Td>
          <Td>{employee.email}</Td>
          <Td>{employee.mobile}</Td>
          <Td>{employee.designation}</Td>
          <Td>{employee.gender}</Td>
          <Td>{employee.courses ? employee.courses.join(', ') : ''}</Td>
          <Td>{employee.createDate}</Td>
          <Td>
            <ActionButton onClick={() => handleEdit(employee.id)}>Edit</ActionButton>
            <ActionButton onClick={() => handleDelete(employee.id)}>Delete</ActionButton>
          </Td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default EmployeeTable;
