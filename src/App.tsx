import React, { useState } from 'react';
import Login from './Components/Loginform'
import './App.css';
import Signup from './Components/Signupform';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Components/Welcome';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminDashboard from './Components/AdminDashboard';
import { useAuth } from './context/AuthContext';
import Unauthorized from './Components/Unauthorized';



const App: React.FC = () => {

  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);


  const toggleForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  const { isAuthenticated, userRole } = useAuth();

  return (
   
      <div className="App">
        <Routes>
          <Route path="/"
            element={ isAuthenticated ? (
              <Navigate to={userRole === 'ADMIN' ? "/admin" : "/home"} />
            ) : (
                <div className='Maincontainer'>
                  
                  <div className="form-box">
                    {isLoginFormVisible ? <Login  /> : <Signup />}
                    <p>
                      {isLoginFormVisible
                        ? "Don't have an account? "
                        : 'Already have an account? '}
                      <span onClick={toggleForm} className="toggle-link">
                        {isLoginFormVisible ? 'Signup' : 'Login'}
                      </span>
                    </p>
                  </div>
                </div>
            )

            }

          />
          
          <Route element={<ProtectedRoute  requiredRole="USER" />}>
            <Route path="/home" element={<HomePage  />} />
          </Route>

         <Route element={<ProtectedRoute  requiredRole="ADMIN" />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route
            path="/unauthorized"
            element={
             <Unauthorized></Unauthorized>
            }
          />

        </Routes>
      </div>
   
  );
}

export default App;



