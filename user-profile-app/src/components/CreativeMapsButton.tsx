// src/components/CreativeMapsButton.tsx

'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';

const CreativeMapsButton: React.FC = () => {
  return (
    <a
      href="https://fortnite.gg/creative"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Open Creative Maps"
    >
      <ExternalLink className="mr-2" />
      Creative Maps
    </a>
  );
};

export default CreativeMapsButton;