// src/utils/validation.ts

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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    errors.push('Please enter a valid email address.');
  }
  return { isValid: errors.length === 0, errors };
};

export const validateMinLength = (value: string, minLength: number): ValidationResult => {
  const errors: string[] = [];
  if (value.length < minLength) {
    errors.push(`Minimum length is ${minLength} characters.`);
  }
  return { isValid: errors.length === 0, errors };
};

export const validateMaxLength = (value: string, maxLength: number): ValidationResult => {
  const errors: string[] = [];
  if (value.length > maxLength) {
    errors.push(`Maximum length is ${maxLength} characters.`);
  }
  return { isValid: errors.length === 0, errors };
};

export const validatePattern = (value: string, pattern: RegExp): ValidationResult => {
  const errors: string[] = [];
  if (!pattern.test(value)) {
    errors.push('Value does not match the required pattern.');
  }
  return { isValid: errors.length === 0, errors };
};

export const validateForm = (fields: Record<string, any>, validations: Record<string, (value: any) => ValidationResult>): ValidationResult => {
  const errors: string[] = [];
  let isValid = true;

  for (const [field, validate] of Object.entries(validations)) {
    const result = validate(fields[field]);
    if (!result.isValid) {
      isValid = false;
      errors.push(...result.errors);
    }
  }

  return { isValid, errors };
};