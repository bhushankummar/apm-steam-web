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

const SignInAzure = () => {
  const navigate = useNavigate();
  const { logInWithEmailAndPassword } = useAuthMethod(); // Firebase login method
  const { instance } = useMsal(); // MSAL instance for Azure login

  // Handle Azure login
  const handleAzureLogin = async () => {
    try {
      const response = await instance.loginPopup(loginRequest); // Azure login
      console.log("Azure login successful:", response);

      const userRole = await verifyUser("saloni.kale.1117@gmail.com");
      console.log(userRole.success, "saloni");

      if (userRole.success ) {
        const idToken = response.accessToken; // Use the Azure access token
        sessionStorage.setItem("idToken", idToken); // Save token to session storage

        await logInWithEmailAndPassword({ email: "", password: "" }); // Firebase login with empty credentials

        navigate("/apps/admin/technician-listing"); // Redirect on successful login
      } else {
        // Display an error notification
        notification.error({
          message: "Access Denied",
          description: "You do not have access to the admin dashboard.",
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
