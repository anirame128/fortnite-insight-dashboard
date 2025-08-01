'use client';

import React from 'react';
import { Link } from 'react-router-dom'; // Adjust import based on your routing library
import './styles.module.css'; // Import the CSS module for styling

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/dashboard/settings">Settings</Link> {/* New settings page link */}
          </li>
        </ul>
      </nav>
      <main>
        {/* Render children components here */}
      </main>
    </div>
  );
};

export default DashboardLayout;