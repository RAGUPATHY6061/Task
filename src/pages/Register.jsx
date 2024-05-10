import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

const LoginLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #3b82f6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered successfully');
      navigate('/');
    } catch (error) {
      const errorMessage = error.message;
      console.error('Registration error:', errorMessage);
      alert('Registration error:', errorMessage);
    }
  };

  return (
    <Section>
    <FormContainer onSubmit={handleRegister}>
      <Heading>Register</Heading>
      <InputLabel htmlFor="email">Email</InputLabel>
      <InputField type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
      <InputLabel htmlFor="password">Password</InputLabel>
      <InputField type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit">Register</Button>
      <LoginLink to="/login">Already a member? Login</LoginLink>
    </FormContainer>
    </Section>
  );
};

export default Register;
