import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register all necessary components

const Analytics = () => {
  const [userCounts, setUserCounts] = useState({});

  useEffect(() => {
    const fetchUserCounts = async () => {
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;

      const now = new Date();
      const metrics = {
        last24h: 0,
        last7d: 0,
        last15d: 0,
        last30d: 0,
      };

      users.forEach(user => {
        const registeredAt = new Date(user.registeredAt);
        const diffDays = Math.ceil((now - registeredAt) / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) metrics.last24h++;
        if (diffDays <= 7) metrics.last7d++;
        if (diffDays <= 15) metrics.last15d++;
        if (diffDays <= 30) metrics.last30d++;
      });

      setUserCounts(metrics);
    };

    fetchUserCounts();
  }, []);

  const data = {
    labels: ['Last 24h', 'Last 7d', 'Last 15d', 'Last 30d'],
    datasets: [
      {
        label: 'User Registrations',
        data: [
          userCounts.last24h || 0,
          userCounts.last7d || 0,
          userCounts.last15d || 0,
          userCounts.last30d || 0,
        ],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">User Registration Analytics</h2>
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <Bar data={data} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Registration Metrics</h3>
        <ul className="list-disc ml-5 mt-2">
          <li>Last 24h: {userCounts.last24h || 0} users</li>
          <li>Last 7d: {userCounts.last7d || 0} users</li>
          <li>Last 15d: {userCounts.last15d || 0} users</li>
          <li>Last 30d: {userCounts.last30d || 0} users</li>
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
