// src/app/dashboard/components/CreativeMapsButton.tsx

'use client';

import React from 'react';

const CreativeMapsButton: React.FC = () => {
    return (
        <a
            href="/creative-maps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
            Creative Maps
        </a>
    );
};

export default CreativeMapsButton;