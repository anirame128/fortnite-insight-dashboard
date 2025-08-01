// src/utils/logger.ts

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const logger = {
  logRequest: (config: AxiosRequestConfig) => {
    console.log('API Request:', {
      method: config.method,
      url: config.url,
      headers: config.headers,
      data: config.data,
    });
  },
  
  logResponse: (response: AxiosResponse) => {
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
  },

  logError: (error: any) => {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data,
        } : null,
      });
    } else {
      console.error('Unexpected Error:', error);
    }
  },
};

export default logger;

// Interceptors for automatic logging
axios.interceptors.request.use(
  (config) => {
    logger.logRequest(config);
    return config;
  },
  (error) => {
    logger.logError(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    logger.logResponse(response);
    return response;
  },
  (error) => {
    logger.logError(error);
    return Promise.reject(error);
  }
);