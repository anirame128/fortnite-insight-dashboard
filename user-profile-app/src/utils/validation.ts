// src/utils/validation.ts

/**
 * Utility functions for form validation.
 */

/**
 * Validates if a string is not empty.
 * @param value - The string value to validate.
 * @returns True if the value is not empty, otherwise false.
 */
export const isNotEmpty = (value: string): boolean => {
    return value.trim().length > 0;
};

/**
 * Validates if an email address is in a valid format.
 * @param email - The email address to validate.
 * @returns True if the email is valid, otherwise false.
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates if a password meets the required criteria.
 * @param password - The password to validate.
 * @returns True if the password is valid, otherwise false.
 */
export const isValidPassword = (password: string): boolean => {
    // Example criteria: at least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};

/**
 * Validates if a value is a number.
 * @param value - The value to validate.
 * @returns True if the value is a number, otherwise false.
 */
export const isNumber = (value: any): boolean => {
    return !isNaN(value) && !isNaN(parseFloat(value));
};

/**
 * Validates if a string matches a specific length.
 * @param value - The string value to validate.
 * @param length - The required length.
 * @returns True if the value matches the length, otherwise false.
 */
export const hasLength = (value: string, length: number): boolean => {
    return value.length === length;
};

/**
 * Validates if a string is within a specified length range.
 * @param value - The string value to validate.
 * @param min - The minimum length.
 * @param max - The maximum length.
 * @returns True if the value is within the length range, otherwise false.
 */
export const isLengthInRange = (value: string, min: number, max: number): boolean => {
    return value.length >= min && value.length <= max;
};