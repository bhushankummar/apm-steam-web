import { useNavigate } from "react-router-dom";
import { Button, Form } from "antd";
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

const SignInAzure = () => {
  const navigate = useNavigate();
  const { logInWithEmailAndPassword } = useAuthMethod(); // Firebase login method
  const { instance } = useMsal(); // MSAL instance for Azure login

  // Handle Azure login
  const handleAzureLogin = async () => {
    try {
      const response = await instance.loginPopup(loginRequest); // Azure login
      console.log("Azure login successful:", response);

      // Use the Azure token or adapt this to your Firebase setup if needed
      await logInWithEmailAndPassword({ email: '', password: '' }); // Pass empty email and password

      navigate("/apps/admin/technician-listing"); // Redirect after successful login
    } catch (error) {
      console.error("Azure login failed:", error);
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
          {/* Only Azure Sign-In button now, email and password are handled in the background */}
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


