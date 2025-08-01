// src/components/icons/SocialMediaIcons.tsx

import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const SocialMediaIcons: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <a 
        href="https://www.instagram.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Instagram"
        className="text-gray-600 hover:text-gray-800 transition-colors"
      >
        <Instagram className="h-6 w-6" />
      </a>
      <a 
        href="https://twitter.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Twitter"
        className="text-gray-600 hover:text-gray-800 transition-colors"
      >
        <Twitter className="h-6 w-6" />
      </a>
      <a 
        href="https://www.facebook.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Facebook"
        className="text-gray-600 hover:text-gray-800 transition-colors"
      >
        <Facebook className="h-6 w-6" />
      </a>
    </div>
  );
};

export default SocialMediaIcons;