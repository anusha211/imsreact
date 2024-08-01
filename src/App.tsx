import React, { useState } from 'react';
import Login from './Components/Loginform'
import './App.css';
import Signup from './Components/Signupform';
import Welcome from './Components/Welcome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App: React.FC = () => {

  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const toggleForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/"
            element={

              <>
                <div className='Maincontainer'>
                  <div className="form-box">
                    {isLoginFormVisible ? <Login /> : <Signup />}
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
              </>

            }

          />
          
          <Route path="/home" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
