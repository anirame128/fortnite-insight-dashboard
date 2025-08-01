// src/app/dashboard/settings/validation.ts

type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

export const validateSettingsForm = (formData: {
  username: string;
  email: string;
  password: string;
}): ValidationResult => {
  const errors: string[] = [];
  
  // Username validation
  if (!formData.username) {
    errors.push("Username is required.");
  } else if (formData.username.length < 3) {
    errors.push("Username must be at least 3 characters long.");
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    errors.push("Email is required.");
  } else if (!emailRegex.test(formData.email)) {
    errors.push("Email is not valid.");
  }

  // Password validation
  if (!formData.password) {
    errors.push("Password is required.");
  } else if (formData.password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};