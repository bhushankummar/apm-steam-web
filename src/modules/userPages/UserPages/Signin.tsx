
import AppAnimate from "@crema/components/AppAnimate";
import { Button } from "antd";
import {  FaUserCircle } from "react-icons/fa"; // Importing a login icon
import microsoftLogo from "./microsoftLogo.png";

import AppPageMeta from "@crema/components/AppPageMeta";
import {
  StyledUserPages,
  StyledUserContainer,
  StyledUserCard,
  StyledUserCardHeader,
} from "../index.styled";

const Signin = () => {

  const handleMicrosoftLogin = () => {
    // Logic for Microsoft Azure authentication will go here
    console.log("Sign in with Microsoft Azure");
  };

  return (
    <StyledUserPages>
      <AppPageMeta title="Signin" />
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <StyledUserContainer key="a">
          <StyledUserCard>
            <StyledUserCardHeader>
              <h3 style={{ display: "flex", alignItems: "center" }}>
              <FaUserCircle style={{ marginRight: 8 }} /> {/* User icon */}
              Sign in
              </h3>
            </StyledUserCardHeader>

            <Button
  type="primary"
  onClick={handleMicrosoftLogin}
  style={{
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 20px", // Increased padding for more height
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#F25022", // Microsoft orange
    borderColor: "#F25022",
    borderRadius: "19px", // Increased border radius for more curve
    marginTop: "20px",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  }}
>
  <img
    src={microsoftLogo} // Path to the Microsoft logo
    alt="Sign in with Microsoft"
    style={{ marginRight: 10, height: "20px", width: "auto" }} // Adjust size as needed
  />
  <span style={{ color: "#fff" }}>
    Sign in With Microsoft Azure
  </span>
</Button>

          </StyledUserCard>
        </StyledUserContainer>
      </AppAnimate>
    </StyledUserPages>
  );
};

export default Signin;
