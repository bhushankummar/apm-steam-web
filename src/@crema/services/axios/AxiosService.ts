import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor() {
    // Initialize Axios instance with base URL
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL as string , // Use your API base URL
    });

    // Set authorization token from storage if available
    this.setAuthTokenFromStorage();

    // Add a request interceptor to include the token for every request
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        await this.setAuthTokenFromStorage();
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // Method to retrieve and set the auth token from AsyncStorage
  private async setAuthTokenFromStorage() {
    const token = await sessionStorage.getItem('token');
    if (token) {
      this.setAuthToken(token);
    } else {
      this.removeAuthToken();
    }
  }

  // Method to set the authorization token in the header
  public setAuthToken(token: string) {
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Method to remove the authorization token from the header
  public removeAuthToken() {
    delete this.axiosInstance.defaults.headers.common['Authorization'];
  }

  // Generic method to make HTTP requests
  public async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.request<T>(config);
  }

  // HTTP GET method
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  // HTTP POST method
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  // HTTP PUT method
  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  // HTTP PATCH method
  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: 'PATCH', url, data });
  }

  // HTTP DELETE method
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }
}

export default new AxiosService();
