import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useMsal } from "@azure/msal-react"; // Import MSAL React
import { loginRequest } from "./authConfig"; // Import login request configuration
import {
  StyledSign,
  StyledSignContent,
  StyledSignForm,
  StyledSignLogo, // Add styling for the logo
  StyledSignTitle, // Add styling for the title
} from "./index.styled";
import companyLogo from "../../../assets/images/apmLogo.png"; // Replace with your actual path to the logo

const SignInAzure = () => {
  const navigate = useNavigate();
  const { instance } = useMsal(); // Get MSAL instance

  // Handle Azure login using MSAL's loginPopup
  const handleAzureLogin = () => {
    instance
      .loginPopup(loginRequest)
      .then((response) => {
        console.log("Logged in:", response);
        navigate("/apps/admin/technician-listing");

      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <StyledSign>
      <StyledSignContent>
        {/* Add the company logo at the top */}
        <StyledSignLogo>
          <img src={companyLogo} alt="Company Logo" />
        </StyledSignLogo>

        {/* Add a title for the login form */}
        <StyledSignTitle>Sign in with Microsoft Azure</StyledSignTitle>

        <StyledSignForm>
          <div className="form-btn-field">
            <Button type="primary" onClick={handleAzureLogin} block>
              Signin With Microsoft Azure
            </Button>
          </div>
        </StyledSignForm>
      </StyledSignContent>

    
    </StyledSign>
  );
};

export default SignInAzure;
