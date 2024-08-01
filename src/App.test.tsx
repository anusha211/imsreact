import {act} from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import Login from './Components/Loginform';
import { Router } from 'react-router-dom';


describe('App Component', () => {

  test('renders login form by default', () => {
    render(
        <App />  
    );
    // Check if the login form is initially rendered
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('toggles between login and signup forms', () => {
    render(
        <App />
    );

    // Click on the toggle link to switch between forms
    fireEvent.click(screen.getByText(/Signup/i));

    // Check if the signup form is displayed after clicking toggle
    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();

    // Click again to toggle back to the login form
    fireEvent.click(screen.getByText(/Login/i));

    // Check if the login form is displayed again
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
