// src/app/dashboard/settings/validation.ts

type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

export const validateRequired = (value: string): ValidationResult => {
  const errors: string[] = [];
  if (!value.trim()) {
    errors.push('This field is required.');
  }
  return { isValid: errors.length === 0, errors };
};

export const validateEmail = (value: string): ValidationResult => {
  const errors: string[] = [];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    errors.push('Please enter a valid email address.');
  }
  return { isValid: errors.length === 0, errors };
};

export const validateMinLength = (value: string, minLength: number): ValidationResult => {
  const errors: string[] = [];
  if (value.length < minLength) {
    errors.push(`Must be at least ${minLength} characters long.`);
  }
  return { isValid: errors.length === 0, errors };
};

export const validateMaxLength = (value: string, maxLength: number): ValidationResult => {
  const errors: string[] = [];
  if (value.length > maxLength) {
    errors.push(`Must be no more than ${maxLength} characters long.`);
  }
  return { isValid: errors.length === 0, errors };
};

export const validatePasswordStrength = (value: string): ValidationResult => {
  const errors: string[] = [];
  const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!strongPasswordPattern.test(value)) {
    errors.push('Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.');
  }
  return { isValid: errors.length === 0, errors };
};

export const validateForm = (formValues: Record<string, string>, validations: Record<string, (value: string) => ValidationResult>): ValidationResult => {
  const errors: string[] = [];
  let isValid = true;

  for (const [key, validate] of Object.entries(validations)) {
    const result = validate(formValues[key]);
    if (!result.isValid) {
      isValid = false;
      errors.push(...result.errors);
    }
  }

  return { isValid, errors };
};