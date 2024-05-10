import React from "react";
import { useState, useEffect } from "react";
import { Home,Login,Register,EmployeeList, Dashboard } from "./pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA6blra7yara14ueDB1LwWvRxKHPk2Xp-s",
  authDomain: "manage-9378a.firebaseapp.com",
  databaseURL: "https://manage-9378a-default-rtdb.firebaseio.com",
  projectId: "manage-9378a",
  storageBucket: "manage-9378a.appspot.com",
  messagingSenderId: "257658063729",
  appId: "1:257658063729:web:5ab0a3b5fa1ae99de144d0",
  measurementId: "G-BF0FG49T48"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const router = createBrowserRouter([
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/",
    element:<Dashboard/>,
    children:[{
      index:true,
      element:<Home/>
    },
    {
      path:"employee",
      element:<EmployeeList/>
    },
    
  ]},
  
])

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #333;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay to show the loader
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {loading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
}

export default App;