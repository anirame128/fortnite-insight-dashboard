'use client';

import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import SocialMediaIcons from './icons/SocialMediaIcons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="flex justify-center space-x-4">
        <SocialMediaIcons />
      </div>
      <div className="text-center mt-4">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;