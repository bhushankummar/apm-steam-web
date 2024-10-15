import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { useMsal, useAccount, AuthError } from "@azure/msal-react";
  import { AuthenticationResult } from "@azure/msal-browser";
  import { AuthUserType } from "@crema/types/models/AuthUser";  // Adjust according to your types
  
  type MicrosoftAzureContextProps = {
    user: AuthUserType | null | undefined;
    isAuthenticated: boolean;
    isLoading: boolean;
  };
  
  const MicrosoftAzureContext = createContext<MicrosoftAzureContextProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  
  export const useMicrosoftAzure = () => useContext(MicrosoftAzureContext);
  
  export const MicrosoftAzureAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [azureData, setAzureData] = useState<MicrosoftAzureContextProps>({
      user: undefined,
      isAuthenticated: false,
      isLoading: true,
    });
  
    useEffect(() => {
      if (account) {
        setAzureData({
          user: {
            username: account.username,
            id: account.homeAccountId,
            name: account.name,
            tenantId: account.tenantId,
          } as AuthUserType,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setAzureData({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    }, [account, inProgress]);
  
    return (
      <MicrosoftAzureContext.Provider value={azureData}>
        {children}
      </MicrosoftAzureContext.Provider>
    );
  };
  