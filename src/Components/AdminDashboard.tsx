import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Signup from './Signupform';
import UserSearch from './ElaticSearch';

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  internshipId?: string;
  roleId?: string;
  password?: string; // Optional in case of editing
}

const HomePage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false); // State for adding a new user
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    password: '',
    age: undefined,
    internshipId: '',
    roleId: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const transformedUsers: User[] = response.data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
          internshipId: user.internshipId,
          roleId: user.roleId,
        }));

        setUsers(transformedUsers);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
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

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

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

        setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)));
        setIsEditing(false);
        setCurrentUser(null);
      } catch (error) {
        setError('Failed to update user. Please try again.');
      }
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      await axios.post('http://localhost:5000/api/users/admincreate', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers([...users, newUser]);
      setIsAdding(false);
      setNewUser({
        id: 0,
        name: '',
        email: '',
        password: '',
        age: undefined,
        internshipId: '',
        roleId: '',
      });
    } catch (error) {
      setError('Failed to create user. Please try again.');
    }
  };

  const handleDelete = async (user: User) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`http://localhost:5000/api/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((u) => u.id !== user.id));
    } catch (error) {
      setError('Failed to delete user. Please try again.');
    }
  };

  const handleAddUser = () => {
    setIsAdding(true);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewUser({
      id: 0,
      name: '',
      email: '',
      password: '',
      age: undefined,
      internshipId: '',
      roleId: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar logout={handleLogout}></Navbar>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 bg-white shadow-md rounded-lg mb-6">
          <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">Total Users</h2>
              <p className="text-3xl">{users.length}</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg shadow cursor-pointer" onClick={handleAddUser}>
              <h2 className="text-xl font-semibold">Add New User</h2>
              <p className="text-3xl">+</p>
            </div>
          </div>
        </div>
        <UserSearch></UserSearch>
        <div className="px-4 py-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-semibold mb-6">User List</h1>
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
                        <button onClick={() => handleEditClick(user)} className="text-blue-500 hover:underline">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(user)} className="text-red-500 hover:underline ml-4">
                          Delete
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

      {isAdding && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
            <form onSubmit={handleCreateUser}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleNewUserChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleNewUserChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleNewUserChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={newUser.age || ''}
                  onChange={handleNewUserChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Internship ID</label>
                <input
                  type="text"
                  name="internshipId"
                  value={newUser.internshipId || ''}
                  onChange={handleNewUserChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role ID</label>
                <input
                  type="text"
                  name="roleId"
                  value={newUser.roleId || ''}
                  onChange={handleNewUserChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCancelAdd}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={currentUser.password || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={currentUser.age || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Internship ID</label>
                <input
                  type="text"
                  name="internshipId"
                  value={currentUser.internshipId || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role ID</label>
                <input
                  type="text"
                  name="roleId"
                  value={currentUser.roleId || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
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
