import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

// Define User type (you can extend this based on the actual user model)
interface User {
  id: string;
  createdAt: string;  // Using string to match the format in your data (timestamp as a string)
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  ssoPlatform: string | null;
  uniqueSsoProfileId: string | null;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}


// Set up axios instance with base URL
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the Bearer token (idToken) from session storage to the headers of each request
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = await getToken(); // Assuming a function to retrieve the token from session
    console.log(token,'tokentoken');

    if (token) {
      // If headers exist, ensure proper type casting and set the Authorization header
      if (config.headers instanceof AxiosHeaders) {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        // Fallback in case headers aren't already an instance of AxiosHeaders
        config.headers = new AxiosHeaders();
        config.headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to retrieve token from session (localStorage to sessionStorage here)
const getToken = async (): Promise<string | null> => {
  // Example token retrieval from sessionStorage
  return sessionStorage.getItem('idToken');
};

// Function to create a user
export const createUser = async (userData: User): Promise<any> => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await apiClient.post('/api/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, updatedData: Partial<User>): Promise<any> => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await apiClient.put(`api/users/${userId}`, updatedData); 
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await apiClient.delete(`api/users/delete/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting user:', error.response || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
};

export const findUsers = async (
  searchString?: string,
  currentPage: number = 1,
  pageSize: number = 10,
  filter?: {
    columnName: string;
    value: string;
    operator: string;
  }
): Promise<any> => {
  try {
    const payload = {
      searchString,
      currentPage,
      pageSize,
      filter, // add the filter object here
    };

    const response: AxiosResponse<ApiResponse<User[]>> = await apiClient.post('/api/users/find', payload);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};


export const getUserById = async (id: string): Promise<ApiResponse<User>> => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

export const verifyUser = async (email: string) => {
  try {
    const response = await apiClient.get('/api/users/verify-user', { // Replace with your correct API URL
      params: {
        email: email,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error calling verify-user API:', error);
    throw error;
  }
};

export const findOne = async (id: string) => {
  try {
    // Make the request using Axios
    const response = await apiClient.get(`/api/users/details/${id}`);
    
    // Check if the response status is OK
    if (response.status === 200) {
      return response.data;  // Return the product data
    } else {
      console.error(`Error fetching product (status ${response.status}):`, response.data);
      throw new Error("Failed to fetch product data.");
    }
  } catch (error) {
    console.error("findOne Error:", error);
    throw error;  // Rethrow the error to be caught in the component
  }
};
