'use client';

import { useState, useEffect } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';

interface MapInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
}

export default function MapInput({
  value,
  onChange,
  placeholder = 'Enter map code (e.g., 1234-5678-9012)',
  label = 'Map Code',
  error,
  required = false,
}: MapInputProps) {
  const [mounted, setMounted] = useState(false);
  const [internalError, setInternalError] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateMapCode = (code: string): boolean => {
    // Remove all non-alphanumeric characters
    const cleanCode = code.replace(/[^a-zA-Z0-9]/g, '');
    
    // Check if it's exactly 12 characters
    if (cleanCode.length !== 12) {
      setInternalError('Map code must be 12 characters long');
      return false;
    }
    
    // Check if it's alphanumeric only
    if (!/^[a-zA-Z0-9]+$/.test(cleanCode)) {
      setInternalError('Map code can only contain letters and numbers');
      return false;
    }
    
    setInternalError('');
    return true;
  };

  const formatMapCode = (code: string): string => {
    // Remove all non-alphanumeric characters
    const cleanCode = code.replace(/[^a-zA-Z0-9]/g, '');
    
    // Format as XXXX-XXXX-XXXX
    const parts = [];
    for (let i = 0; i < cleanCode.length; i += 4) {
      parts.push(cleanCode.slice(i, i + 4));
    }
    
    return parts.join('-').toUpperCase();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatMapCode(e.target.value);
    onChange(formatted);
    
    if (formatted.length > 0) {
      validateMapCode(formatted);
    } else {
      setInternalError('');
    }
  };

  const handleBlur = () => {
    if (value.length > 0) {
      validateMapCode(value);
    }
  };

  const displayError = error || internalError;

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="w-full h-20" />;
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-[var(--destructive)] ml-1">*</span>}
      </label>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-[var(--muted-foreground)]" />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-4 py-2.5 rounded-lg border transition-colors
            bg-[var(--background)]
            text-[var(--foreground)]
            border-[var(--border)]
            placeholder:text-[var(--muted-foreground)]
            focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--ring)]
            ${displayError ? 'border-[var(--destructive)] focus:ring-[var(--destructive)]' : ''}
          `}
          aria-invalid={displayError ? 'true' : 'false'}
          aria-describedby={displayError ? 'map-input-error' : undefined}
        />
        
        {displayError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <AlertCircle className="h-5 w-5 text-[var(--destructive)]" />
          </div>
        )}
      </div>
      
      {displayError && (
        <p id="map-input-error" className="mt-2 text-sm text-[var(--destructive)]">
          {displayError}
        </p>
      )}
      
      <p className="mt-2 text-xs text-[var(--muted-foreground)]">
        Format: XXXX-XXXX-XXXX (12 characters)
      </p>
    </div>
  );
}