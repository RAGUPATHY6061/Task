import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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
  padding: 2rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;

  & label {
    display: block;
    margin-bottom: 0.5rem;
  }

  & input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }

  & button {
    width: 100%;
    padding: 0.5rem;
    background-color: #3b82f6;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  & button:hover {
    background-color: #2563eb;
  }
`;

const Heading = styled.h4`
  text-align: center;
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  margin-left: 0.5rem;
  color: #3b82f6;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const RegisterText = styled.p`
  text-align: center;
  margin-top: 1rem;
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/');
        // Handle successful login (e.g., redirect to dashboard)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login error:', errorMessage);
        alert('Login error:', errorMessage);
      });
  };

  return (
    <Section>
      <FormContainer onSubmit={handleLogin}>
        <Heading>Login</Heading>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        <div>
          <button type="submit">Login</button>
        </div>
      </FormContainer>
      <RegisterText>
        Not a member yet? <StyledLink to="/register">Register</StyledLink>
      </RegisterText>
    </Section>
  );
};

export default Login;
