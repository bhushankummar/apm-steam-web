import { useNavigate } from "react-router-dom";
import { Button, Form, notification } from "antd"; // Import notification from Ant Design
import { useMsal } from "@azure/msal-react"; // Import MSAL for Azure authentication
import { loginRequest } from "./authConfig"; // Import Azure login request configuration
import { useAuthMethod } from "@crema/hooks/AuthHooks"; // Firebase Auth Method
import {
  StyledSign,
  StyledSignContent,
  StyledSignForm,
  StyledSignLogo,
  StyledSignTitle,
} from "./index.styled";
import companyLogo from "../../../assets/images/apmLogo.png"; // Replace with your actual path to the logo
import { verifyUser } from "@crema/services/common/commonService";
import { useEffect } from "react";



const SignInAzure = () => {

  const navigate = useNavigate();
  const { logInWithEmailAndPassword } = useAuthMethod(); // Firebase login method
  const { instance } = useMsal(); // MSAL instance for Azure login

  useEffect(()=>{
    handleClearSession();
  })

  const handleClearSession = () => {
    sessionStorage.clear();
    console.log('Session storage cleared');
  };

// Handle Azure login
const handleAzureLogin = async () => {
  try {
    const response = await instance.loginPopup({
      ...loginRequest,
      prompt: "login",  // Forces prompt for credentials
    }); // Azure login
    console.log("Azure login successful:", response);

    const userRole = await verifyUser(response.account.username);
    console.log(userRole.success, "saloni");

    if (userRole.success && userRole.userDetail.role === 'ADMIN') {
      notification.success({
        message: "Login Successful!",
        description: "Welcome back! You now have access to the admin dashboard.",
        duration: 5,  // Optional: duration in seconds (default: 4.5)
      });
      
      const idToken = response.accessToken; // Use the Azure access token
      sessionStorage.setItem("idToken", idToken); // Save token to session storage

      await logInWithEmailAndPassword({ email: response.account.username, password: "" }); // Firebase login with empty credentials

        navigate("/apps/admin/technician-listing"); // Redirect on successful login
      } else {
        // Display an error notification
        notification.error({
          message: "Access Denied",
          description: "You are not authorized to access this application.",
        });
      }
  } catch (error) {
    console.error("Azure login failed:", error);
    notification.error({
      message: "Login Failed",
      description: "Azure login failed. Please try again later.",
    });
  }
};


  return (
    <StyledSign>
      <StyledSignContent>
        {/* Company Logo */}
        <StyledSignLogo>
          <img src={companyLogo} alt="Company Logo" />
        </StyledSignLogo>

        {/* Sign in Title */}
        <StyledSignTitle>Sign in with Microsoft Azure</StyledSignTitle>

        <StyledSignForm
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={handleAzureLogin}
        >
          {/* Only Azure Sign-In button */}
          <div className="form-btn-field">
            <Button type="primary" htmlType="submit" block>
              Sign in with Microsoft Azure
            </Button>
          </div>
        </StyledSignForm>
      </StyledSignContent>
    </StyledSign>
  );
};

export default SignInAzure;
