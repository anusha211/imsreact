import React, { useState } from 'react';
import './Forms.css';

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Signing up with:', username, email, password, confirmPassword);
        } else {
            console.log(errors);
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors: { [key: string]: string } = {};
        if (!username.trim()) {
            newErrors.username = 'Username is required';
            valid = false;
        }
        if (!email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        }
        if (!password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    return (
        <div>
            <h3 style={{ color: "darkolivegreen", marginBottom: "40px", marginTop: "0px" }}>Register as an Intern</h3>
            <form onSubmit={handleSubmit} id="signupform">
                <div className="input-group">
                    <div className="input-field">
                        <input type="text" placeholder="Full Name" value={username} required onChange={(e) => setUsername(e.target.value)} />
                        {errors.username && <span className="error">{errors.username}</span>}
                    </div>
                    <div className="input-field">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    </div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
