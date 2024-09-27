import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">User Details</h2>
      <div className="space-y-4">
        <p className="text-gray-800">
          <strong>Name:</strong> <span className="text-gray-600">{user.name}</span>
        </p>
        <p className="text-gray-800">
          <strong>Email:</strong> <span className="text-gray-600">{user.email}</span>
        </p>
        <p className="text-gray-800">
          <strong>Role:</strong> <span className="text-gray-600">{user.role}</span>
        </p>
        <p className="text-gray-800">
          <strong>Registered At:</strong> <span className="text-gray-600">{new Date(user.registeredAt).toLocaleString()}</span>
        </p>
      </div>
      <div className="mt-6 text-center">
        <button 
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
