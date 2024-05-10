import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Heading = styled.h1`
  font-size: 4rem;
  margin-bottom: 2rem;
  color: #333;
`;

const Home = () => {
  return (
    <Container>
      <Heading>Welcome Admin Panel</Heading>
      {/* Content of the dashboard */}
    </Container>
  );
};

export default Home;
