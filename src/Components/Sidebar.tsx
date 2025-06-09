import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="mt-2">
            <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li className="mt-2">
            <Link to="/users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              Users
            </Link>
          </li>
          <li className="mt-2">
            <Link to="/reports" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              Reports
            </Link>
          </li>
          <li className="mt-2">
            <Link to="/settings" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
