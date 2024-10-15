// // src/services/apiService.js

// import axios from 'axios';

// // Set up axios instance with base URL
// export const apiClient = axios.create({
//   baseURL: 'http://localhost:3000', // Replace with your API base URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Function to create a user
// export const createUser = async (userData:any) => {
//   try {
//     const response = await apiClient.post('/users', userData);
//     return response.data;
//   } catch (error) {
//     // Handle error (you can customize this further)
//     console.error('Error creating user:', error);
//     throw error;
//   }
// };

// export const updateUser = async (userId: string, updatedData: any) => {
//     try {
//       const response = await apiClient.put(`/users/${userId}`, updatedData); 
//       return response.data;
//     } catch (error) {
//       console.error('Error updating user:', error);
//       throw error;
//     }
//   };
  

//   export const deleteUser = async (userId: string) => {
//     try {
//       const response = await apiClient.delete(`/users/${userId}`);
//       return response.data;
//     } catch (error: any) {
//       console.error('Error deleting user:', error.response || error.message);
//       throw new Error(error.response?.data?.message || 'Failed to delete user');
//     }
//   };
  
  
//   export const getAllUsers = async () => {
//     try {
//       const response = await apiClient.get('/users');
//       return response.data; // Assuming the API returns the list of users in the data field
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       throw error;
//     }
//   };
  
//   export const getUserById = async (id: string) => {
//     try {
//       const response = await apiClient.get(`/users/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching user by ID:", error);
//       throw error;
//     }
//   };


import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

// Define User type (you can extend this based on the actual user model)
interface User {
  id: string;
  name: string;
  email: string;
  // Add more fields as per your actual User data
}

// Define response types for API calls
interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Set up axios instance with base URL
export const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the Bearer token to the headers of each request
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = await getToken(); // Assuming a function to retrieve the token

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

// Function to retrieve token from storage (localStorage here, change as needed)
const getToken = async (): Promise<string | null> => {
  // Example token retrieval from localStorage
  return localStorage.getItem('accessToken');
};

// Function to create a user
export const createUser = async (userData: User): Promise<ApiResponse<User>> => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await apiClient.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, updatedData: Partial<User>): Promise<ApiResponse<User>> => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await apiClient.put(`/users/${userId}`, updatedData); 
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await apiClient.delete(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting user:', error.response || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
};

export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<User[]>> = await apiClient.get('/users');
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
