export const Config = {
    issuer: 'https://login.microsoftonline.com/common',
    auth: {
      clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID as string,
      authority:
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
      redirectUri: `${import.meta.env.VITE_MS_Redirection_URL as string}`, 
    },
 
  };
  
  export const loginRequest = {
    scopes: ['openid', 'profile', 'email', 'User.Read'],
  };
