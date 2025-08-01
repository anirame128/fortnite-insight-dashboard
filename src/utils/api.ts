// src/utils/api.ts

import axios, { AxiosError } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

interface SettingsResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const fetchSettings = async (): Promise<SettingsResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/settings`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage = axiosError.response?.data?.error || axiosError.message || 'An error occurred';
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const updateSettings = async (settings: any): Promise<SettingsResponse> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/settings`, settings);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage = axiosError.response?.data?.error || axiosError.message || 'An error occurred';
    return {
      success: false,
      error: errorMessage,
    };
  }
};