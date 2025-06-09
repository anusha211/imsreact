import React, { useState } from 'react';
import './Forms.css';
import axios from 'axios'; // Import axios for HTTP requests

const Signup: React.FC = () => {
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState(''); // New state for age input
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // State to hold success message

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/register', {
                    name,
                    email,
                    password,
                    age: Number(age), // Include age in the API request
                });

                if (response.status === 201) {
                    setSuccessMessage('Registration successful! Please check your email to verify your account.');
                    setErrors({}); // Clear any existing errors
                    setname(''); // Reset form fields
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setAge(''); // Reset age field
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const backendError = error.response?.data?.message || 'An unexpected error occurred.';
                    setErrors({ apiError: backendError });
                } else {
                    setErrors({ apiError: 'An unexpected error occurred.' });
                }
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors: { [key: string]: string } = {};
        if (!name.trim()) {
            newErrors.name = 'Username is required';
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
        if (!age.trim()) {
            newErrors.age = 'Age is required';
            valid = false;
        } else if (isNaN(Number(age)) || Number(age) <= 0) {
            newErrors.age = 'Age must be a valid positive number';
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
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            required
                            onChange={(e) => setname(e.target.value)}
                        />
                        {errors.username && <span className="error">{errors.name}</span>}
                    </div>
                    <div className="input-field">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                        {errors.age && <span className="error">{errors.age}</span>}
                    </div>
                    {errors.apiError && <span className="error">{errors.apiError}</span>}
                    {successMessage && <span className="success">{successMessage}</span>}
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
