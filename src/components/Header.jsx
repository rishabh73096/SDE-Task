import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link className="text-white text-lg font-bold" to="/">Admin Panel</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-200 transition duration-200">User List</Link>
          <Link to="/add" className="text-white hover:text-gray-200 transition duration-200">Add User</Link>
          <Link to="/analytics" className="text-white hover:text-gray-200 transition duration-200">Analytics</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
