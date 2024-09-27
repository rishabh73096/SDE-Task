import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`http://localhost:3001/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Link to="/add" className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
        Add User
      </Link>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Role</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">No users found.</td>
            </tr>
          ) : (
            filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-100 transition duration-200">
                <td className="border border-gray-200 px-4 py-2">{user.name}</td>
                <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                <td className="border border-gray-200 px-4 py-2">{user.role}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <Link to={`/edit/${user.id}`} className="text-blue-600 hover:underline">Edit</Link>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="text-red-600 hover:underline ml-4"
                  >
                    Delete
                  </button>
                  <Link to={`/user/${user.id}`} className="text-blue-600 hover:underline ml-4">View</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
