export const Config = {
    auth: {
      clientId: "d94c13fd-e3c0-4b26-9d2f-7dcd4c8c0903",
      authority:
        "https://login.microsoftonline.com/21ad8092-c236-4396-a571-c20e2efef093",
      redirectUri: "http://localhost:3001/apps/admin/technician-listing", // Your React app's URI
    },
  };
  
  export const loginRequest = {
    scopes: ["User.Read"],
  };

