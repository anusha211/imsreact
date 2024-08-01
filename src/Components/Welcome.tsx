import React, { useState } from 'react';
import Navbar from './Navbar';

interface User {
    id: number;
    name: string;
    email: string;
}

const HomePage: React.FC = () => {
    const initialUsers: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    ];

    const [users, setUsers] = useState<User[]>(initialUsers);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const handleEditClick = (user: User) => {
        setIsEditing(true);
        setCurrentUser(user);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentUser) {
            setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
        }
    };

    const handleUpdateUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentUser) {
            setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
            setIsEditing(false);
            setCurrentUser(null);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentUser(null);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
           <Navbar></Navbar>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl font-semibold mb-6">Users</h1>
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
