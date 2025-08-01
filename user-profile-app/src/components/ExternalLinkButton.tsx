// src/components/ExternalLinkButton.tsx

'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ExternalLinkButtonProps {
  url: string;
  label: string;
}

const ExternalLinkButton: React.FC<ExternalLinkButtonProps> = ({ url, label }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
    >
      <span>{label}</span>
      <ExternalLink className="ml-2" />
    </a>
  );
};

export default ExternalLinkButton;