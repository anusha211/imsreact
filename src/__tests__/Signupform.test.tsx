import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '../Components/Signupform';

describe('Signup Component', () => {
 

  test('shows validation errors if form is submitted with empty fields', () => {
    render(<Signup />);

    // Click on the register button without entering any field
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Check for validation error messages
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('shows validation error if passwords do not match', () => {
    render(<Signup />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password321' } });

    // Click on the register button
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Check for password mismatch validation error
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  test('does not show validation errors if form is filled correctly', () => {
    render(<Signup />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });

    // Click on the register button
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Validation error messages should not be present
    expect(screen.queryByText('Username is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Passwords do not match')).not.toBeInTheDocument();
  });
});
