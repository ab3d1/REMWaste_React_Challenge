import axios from 'axios';

// Type definitions
interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// Configure axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://app.wewantwaste.co.uk/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle HTTP errors
      console.error('API Error:', error.response.status, error.response.data);
      return Promise.reject({
        message: error.response.data?.message || 'API request failed',
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      // Handle network errors
      console.error('Network Error:', error.request);
      return Promise.reject({
        message: 'Network connection failed',
        isNetworkError: true
      });
    }
    return Promise.reject(error);
  }
);

// API methods
export const skipApi = {
  getSkipsByLocation: async (postcode: string, area: string): Promise<ApiResponse<Skip[]>> => {
    try {
      const response = await apiClient.get('/skips/by-location', {
        params: { postcode, area }
      });
      return {
        data: response.data.skips || [],
        status: response.status,
        statusText: response.statusText
      };
    } catch (error) {
      console.error('Failed to fetch skips:', error);
      throw error;
    }
  },
  
  // Additional API methods can be added here
  // getSkipDetails: async (id: number) => {...}
};

// Utility functions
export const formatSkipPrice = (price: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(price);
};
