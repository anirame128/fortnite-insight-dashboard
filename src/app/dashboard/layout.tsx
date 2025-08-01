// src/app/dashboard/layout.tsx

import React from 'react';
import { Link } from 'react-router-dom'; // Adjust import based on your routing library
import { Navbar } from './Navbar'; // Assuming you have a Navbar component

const DashboardLayout: React.FC = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className="dashboard-content">
                {children}
            </div>
            <footer>
                <Link to="/settings">Settings</Link>
            </footer>
        </div>
    );
};

export default DashboardLayout;