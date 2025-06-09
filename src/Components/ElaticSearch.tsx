import axios from 'axios';
import React, { useState } from 'react';

const UserSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchUsers = async () => {
    const response = await axios.get(`http://localhost:5000/search?q=${query}`);
    setResults(response.data);
  };

  const handleEdit = (id: string) => {
    // Add your edit logic here
    console.log(`Edit user with ID: ${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setResults(results.filter((user: any) => user._id !== id));
      console.log(`Deleted user with ID: ${id}`);
    } catch (error) {
      console.error(`Failed to delete user with ID: ${id}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        className="border px-4 py-2 rounded"
      />
      <button onClick={searchUsers} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>

      {results.length > 0 && (
        <div className="mt-4">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Age</th>
              </tr>
            </thead>
            <tbody>
              {results.map((user: any) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 border-b">{user._id}</td>
                  <td className="px-4 py-2 border-b">{user._source.name}</td>
                  <td className="px-4 py-2 border-b">{user._source.email}</td>
                  <td className="px-4 py-2 border-b">{user._source.age}</td>
                  <td className="px-4 py-2 border-b">

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
