// src/utils/validation.ts

type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

/**
 * Validates a required field.
 * @param value - The value to validate.
 * @param fieldName - The name of the field for error messages.
 * @returns ValidationResult
 */
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  const errors: string[] = [];
  if (!value.trim()) {
    errors.push(`${fieldName} is required.`);
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validates an email address.
 * @param email - The email address to validate.
 * @returns ValidationResult
 */
export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errors.push('Invalid email address.');
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validates a password based on length and complexity.
 * @param password - The password to validate.
 * @returns ValidationResult
 */
export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long.');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter.');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter.');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number.');
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validates a field against a maximum length.
 * @param value - The value to validate.
 * @param maxLength - The maximum length allowed.
 * @param fieldName - The name of the field for error messages.
 * @returns ValidationResult
 */
export const validateMaxLength = (value: string, maxLength: number, fieldName: string): ValidationResult => {
  const errors: string[] = [];
  if (value.length > maxLength) {
    errors.push(`${fieldName} must be at most ${maxLength} characters long.`);
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validates a field against a minimum length.
 * @param value - The value to validate.
 * @param minLength - The minimum length required.
 * @param fieldName - The name of the field for error messages.
 * @returns ValidationResult
 */
export const validateMinLength = (value: string, minLength: number, fieldName: string): ValidationResult => {
  const errors: string[] = [];
  if (value.length < minLength) {
    errors.push(`${fieldName} must be at least ${minLength} characters long.`);
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
};