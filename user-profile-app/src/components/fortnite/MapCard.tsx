```tsx
import React from 'react';
import { FiCopy } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

interface MapCardProps {
  name: string;
  code: string;
  creator: string;
  description: string;
  tags: string[];
  imageUrl?: string;
}

const MapCard: React.FC<MapCardProps> = ({
  name,
  code,
  creator,
  description,
  tags,
  imageUrl,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success(`Copied map code: ${code}`);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-sm">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 space-y-3">
        <h3 className="text-xl font-bold text-white truncate">{name}</h3>
        <p className="text-sm text-gray-400">By: {creator}</p>
        <p className="text-sm text-gray-300 line-clamp-2">{description}</p>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-mono text-yellow-400">{code}</span>
          <button
            onClick={handleCopy}
            className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            title="Copy map code"
          >
            <FiCopy className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapCard;
```