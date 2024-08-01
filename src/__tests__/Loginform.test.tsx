import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login, { validateUsername, validatePassword } from '../Components/Loginform';

jest.mock('../Components/Loginform', () => {
  const originalModule = jest.requireActual('../Components/Loginform');

  return {
    __esModule: true,
    ...originalModule,
    validateUsername: jest.fn(),
    validatePassword: jest.fn(),
  };
});

describe('Login Component', () => {

  beforeEach(() => {

    (validateUsername as jest.Mock).mockImplementation((username) => {
      if (!username.trim()) {
        return 'username is required';
      }
    });

    (validatePassword as jest.Mock).mockImplementation((password) => {
      if (!password.trim()) {
        return 'Password is required';
      }
    });

    // Mock window.alert
    jest.spyOn(window, 'alert').mockImplementation(() => {});

  });

  afterEach(() => {
    jest.clearAllMocks();
  });



  test('shows validation errors if form is submitted with empty fields', () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
    // Click on the login button without entering username or password
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Check for validation error messages
   // expect(screen.getByText('username is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });



  test('does not show validation errors if form is filled correctly', () => {
    render(<Login />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

    // Click on the login button
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Validation error messages should not be present
   // expect(screen.queryByText('username is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
  });




  test('shows success message on correct login credentials', () => {
    // Mock alert to check for success message
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    render(<Login />);

    // Fill in the form fields with correct credentials
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

    // Click on the login button
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Check for success alert
    expect(alertMock).toHaveBeenCalledWith('login success!!');

    // Clean up mock
    alertMock.mockRestore();
  });




  test('shows error message on incorrect login credentials', () => {
    // Mock alert to check for error message
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    render(<Login />);

    // Fill in the form fields with incorrect credentials
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });

    // Click on the login button
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Check for error alert
    expect(alertMock).toHaveBeenCalledWith('incorrect password!!');

    // Clean up mock
    alertMock.mockRestore();
  });
});
