import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.div`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const NavLinks = styled.div`
  display: flex;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 1rem;
  font-size:18px;
  &:hover {
    text-decoration: underline;
  }
`;

const UserInfo = styled.div`
  display: flex;
  font-size:18px;
  align-items: center;
`;

const Username = styled.span`
  margin-right: 1rem;
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size:18px;
  &:hover {
    background-color: #c82333;
  }
`;



const Dashboard = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      localStorage.setItem("username", "Ragupathy");
      setUsername("Ragupathy");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    navigate("/login");
  };

  return (
    <div>
      <Navbar>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/employee">Employee List</NavLink>
        </NavLinks>
        <UserInfo>
          {username && <Username>{username}</Username>}
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </UserInfo>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Dashboard;
