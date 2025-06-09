import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  useAuth } from '../context/AuthContext';

interface User {
  id: number;
  name: string;
  email: string;
}

const HomePage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log('The token is:', token);

        const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Transform data to include only the required attributes
        const transformedUsers: User[] = response.data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
        }));

        // Set the transformed data in state
        setUsers(transformedUsers);
        console.log('After fetching data');
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs once after the initial render

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate to login page on logout
  };

  const handleEditClick = (user: User) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    }
  };

  // Update user on form submission
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      const token = localStorage.getItem('authToken');
      try {
        await axios.put(`http://localhost:5000/api/users/${currentUser.id}`, currentUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update users state with new data
        setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)));
        setIsEditing(false);
        setCurrentUser(null);
      } catch (error) {
        setError('Failed to update user. Please try again.');
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar logout={handleLogout}></Navbar>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-semibold mb-6">Users</h1>
          {isLoading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="border px-4 py-2">{user.id}</td>
                      <td className="border px-4 py-2">{user.name}</td>
                      <td className="border px-4 py-2">{user.email}</td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit User Form */}
      {isEditing && currentUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
            <form onSubmit={handleUpdateUser}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={currentUser.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={currentUser.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
