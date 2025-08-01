'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface MapInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onValidCode?: (code: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

const MAP_CODE_REGEX = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i;

export default function MapInput({
  value,
  onChange,
  onValidCode,
  placeholder = "Enter map code (e.g., ABCD-1234-EFGH)",
  label = "Map Code",
  required = false,
  className = "",
}: MapInputProps) {
  const [internalValue, setInternalValue] = useState(value || "");
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const validateMapCode = (code: string): boolean => {
    return MAP_CODE_REGEX.test(code);
  };

  const formatMapCode = (code: string): string => {
    // Remove non-alphanumeric characters and convert to uppercase
    const cleaned = code.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    
    // Insert hyphens at positions 4 and 8
    let formatted = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i === 4 || i === 8) {
        formatted += '-';
      }
      formatted += cleaned[i];
    }
    
    return formatted.slice(0, 14); // Max length: 4-4-4
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatMapCode(rawValue);
    
    setInternalValue(formatted);
    setError(null);
    
    const valid = validateMapCode(formatted);
    setIsValid(valid);
    
    onChange?.(formatted);
    
    if (valid) {
      onValidCode?.(formatted);
    }
  };

  const handleBlur = () => {
    if (required && !internalValue) {
      setError("Map code is required");
    } else if (internalValue && !validateMapCode(internalValue)) {
      setError("Invalid map code format. Use format: XXXX-XXXX-XXXX");
    } else {
      setError(null);
    }
  };

  if (!mounted) {
    return <div className="w-full h-20" />;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="map-code" className="text-[var(--foreground)]">
        {label}
        {required && <span className="text-[var(--destructive)] ml-1">*</span>}
      </Label>
      
      <div className="relative">
        <Input
          id="map-code"
          type="text"
          value={internalValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`font-mono tracking-wider ${
            error ? 'border-[var(--destructive)]' : ''
          } ${isValid ? 'border-[var(--success)]' : ''}`}
          maxLength={14}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'map-code-error' : undefined}
        />
        
        {isValid && (
          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--success)]" />
        )}
      </div>
      
      {error && (
        <Alert variant="destructive" className="bg-[var(--destructive)]/10 border-[var(--destructive)]">
          <AlertCircle className="h-4 w-4 text-[var(--destructive)]" />
          <AlertDescription className="text-[var(--destructive)]">
            {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}