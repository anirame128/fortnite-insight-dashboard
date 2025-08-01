// src/app/dashboard/components/CreativeMapsButton.tsx

'use client';

import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const CreativeMapsButton: React.FC = () => {
    return (
        <a
            href="https://fortnite.gg/creative"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
        >
            <FaExternalLinkAlt className="mr-2" />
            Creative Maps
        </a>
    );
};

export default CreativeMapsButton;