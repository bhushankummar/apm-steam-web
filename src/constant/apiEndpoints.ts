export const API_ENDPOINTS = {
    USERS: {
      FIND: '/api/users/find',
      GET_BY_ID: (id: string) => `/api/users/${id}`,
      CREATE: '/api/users/create',
      UPDATE: (id: string) => `/api/users/update/${id}`,
      DELETE: (id: string) => `/api/users/delete/${id}`,
    },
    AUTH: {
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
      REFRESH_TOKEN: '/api/auth/refresh-token',
    },
  };
  
  export default API_ENDPOINTS;
  