export const Config = {
    auth: {
      clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID as string,
      authority:
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
      redirectUri: "http://localhost:3001/apps/admin/technician-listing", 
    },
  };
  
  export const loginRequest = {
    scopes: ['openid', 'profile', 'email', 'User.Read'],
  };

