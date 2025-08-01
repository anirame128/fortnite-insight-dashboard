// src/utils/validation.ts

type ValidationResult = {
    isValid: boolean;
    errors: string[];
};

export const validateEmail = (email: string): ValidationResult => {
    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        errors.push("Email is required.");
    } else if (!emailRegex.test(email)) {
        errors.push("Email is invalid.");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

export const validatePassword = (password: string): ValidationResult => {
    const errors: string[] = [];

    if (!password) {
        errors.push("Password is required.");
    } else if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

export const validateUsername = (username: string): ValidationResult => {
    const errors: string[] = [];

    if (!username) {
        errors.push("Username is required.");
    } else if (username.length < 3) {
        errors.push("Username must be at least 3 characters long.");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

export const sanitizeInput = (input: string): string => {
    const tempElement = document.createElement("div");
    tempElement.innerText = input;
    return tempElement.innerHTML;
};

export const validateForm = (formData: { email: string; password: string; username: string }): ValidationResult => {
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const usernameValidation = validateUsername(formData.username);

    const isValid = emailValidation.isValid && passwordValidation.isValid && usernameValidation.isValid;
    const errors = [
        ...emailValidation.errors,
        ...passwordValidation.errors,
        ...usernameValidation.errors,
    ];

    return {
        isValid,
        errors,
    };
};