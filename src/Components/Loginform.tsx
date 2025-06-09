// src/Components/Loginform.tsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Forms.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      login(email, password);
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  return (
    <div>
      <h3 style={{ color: "darkolivegreen", marginBottom: "40px", marginTop: "0px" }}>Login</h3>
      <form onSubmit={handleSubmit} id="signupform">
        <div className="input-group">
          <div className="input-field">
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="input-field">
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
          <button type="submit" style={{ marginTop: "10px" }}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
