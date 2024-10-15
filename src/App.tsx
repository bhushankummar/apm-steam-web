import {BrowserRouter} from 'react-router-dom';
import AppContextProvider from '@crema/context/AppContextProvider';
import AppThemeProvider from '@crema/context/AppThemeProvider';
import AppLocaleProvider from '@crema/context/AppLocaleProvider';
import AppAuthProvider from '@crema/core/AppAuthProvider';
import AuthRoutes from '@crema/components/AuthRoutes';
import AppLayout from '@crema/core/AppLayout';
// import '@crema/mockapi';
import {GlobalStyles} from '@crema/core/theme/GlobalStyle';
import {Normalize} from 'styled-normalize';
import {useThemeContext} from '@crema/context/AppContextProvider/ThemeContextProvider';
import './styles/index.css';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

function App() {
    const {theme} = useThemeContext();

    const msalConfig = {
        auth: {
          clientId: "d94c13fd-e3c0-4b26-9d2f-7dcd4c8c0903",
          authority:
            "https://login.microsoftonline.com/21ad8092-c236-4396-a571-c20e2efef093",
          redirectUri: "http://localhost:3001", // Your React app's URI
        },
      };
      

    const msalInstance = new PublicClientApplication(msalConfig); // Create MSAL instance


  return (
    <MsalProvider instance={msalInstance}>
      <AppContextProvider>
          <AppThemeProvider>
              <AppLocaleProvider>
                  <BrowserRouter>
                      <AppAuthProvider>
                          <AuthRoutes>
                              <GlobalStyles theme={theme} />
                              <Normalize />
                              <AppLayout />
                          </AuthRoutes>
                      </AppAuthProvider>
                  </BrowserRouter>
              </AppLocaleProvider>
          </AppThemeProvider>
      </AppContextProvider>
      </MsalProvider>
  )
}

export default App


// import {BrowserRouter} from 'react-router-dom';
// import AppContextProvider from '@crema/context/AppContextProvider';
// import AppThemeProvider from '@crema/context/AppThemeProvider';
// import AppLocaleProvider from '@crema/context/AppLocaleProvider';
// import AppLayout from '@crema/core/AppLayout';
// // import '@crema/mockapi';
// import {GlobalStyles} from '@crema/core/theme/GlobalStyle';
// import {Normalize} from 'styled-normalize';
// import {useThemeContext} from '@crema/context/AppContextProvider/ThemeContextProvider';
// import './styles/index.css';

// function App() {
//   const {theme} = useThemeContext();

//   return (
//     <AppContextProvider>
//       <AppThemeProvider>
//         <AppLocaleProvider>
//           <BrowserRouter>
//             <GlobalStyles theme={theme} />
//             <Normalize />
//             <AppLayout />
//           </BrowserRouter>
//         </AppLocaleProvider>
//       </AppThemeProvider>
//     </AppContextProvider>
//   );
// }

// export default App;
