import IntlMessages from "@crema/helpers/IntlMessages";
import AppAnimate from "@crema/components/AppAnimate";
import { Form, Input, notification } from "antd"; // Import notification
import { useIntl } from "react-intl";
import AppPageMeta from "@crema/components/AppPageMeta";
import { v4 as uuidv4 } from "uuid";
import {
  StyledUserCard,
  StyledUserCardHeader,
  StyledUserCardLogo,
  StyledUserContainer,
  StyledUserForm,
  StyledUserFormBtn,
  StyledUserPages,
} from "./index.styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getAllUsers } from '../../../../@crema/services/common/commonService'; // Import the API service

type FormData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  status: string;
};

const Signup = () => {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const [ setForm] = useState<any>({
    id: uuidv4(),
    firstName: "",
    lastName: "",
    email: "",
    createdAt: new Date().toISOString().split('T')[0],
    status: 'Active',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const savedData = await getAllUsers();
        console.log("savedData", savedData);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
    
  };

const onFinish = async () => {
  // Prepare the new data to be sent to the server
  // const newData = {
  //   ...form,
  //   id: uuidv4(), // Assuming the server will handle ID generation
  //   createdAt: new Date().toISOString().split('T')[0],
  // };

  try {
    // Call the createUser function to send the new data to the API
    // await createUser(newData);

    // Show success notification
    notification.success({
      message: "Success",
      description: "Technician has been created successfully.",
    });

    // Navigate to the technician listing page
    navigate('/apps/admin/technician-listing');

    // Reset the form after successful submission
    setForm({
      id: uuidv4(),
      firstName: "",
      lastName: "",
      email: "",
      createdAt: new Date().toISOString().split('T')[0],
      status: "Active",
    });
  } catch (error) {
    console.error("Failed to create user:", error);

    // Show error notification
    notification.error({
      message: "Error",
      description: "Failed to create technician. Please try again.",
    });
  }
};

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <StyledUserPages>
      <AppPageMeta title="Signup" />
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <StyledUserContainer key="a">
          <StyledUserCard>
            <StyledUserCardHeader>
              <StyledUserCardLogo>
                <img src={"/assets/images/logo.png"} alt="crema" title="crema" />
              </StyledUserCardLogo>
              <h3>
                <IntlMessages id="common.addAgent" />
              </h3>
            </StyledUserCardHeader>

            <StyledUserForm
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="firstName"
                className="form-field"
                rules={[{ required: true, message: "Please input your First Name!" }]}
              >
                <Input
                  name="firstName" 
                  placeholder={messages["common.firstName"] as string}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                className="form-field"
                rules={[{ required: true, message: "Please input your Last Name!" }]}
              >
                <Input
                  name="lastName"
                  placeholder={messages["common.lastName"] as string}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="email"
                className="form-field"
                rules={[{ required: true, message: "Please input your Email!" }]}
              >
                <Input
                  name="email"
                  placeholder={messages["common.email"] as string}
                  onChange={handleChange}
                />
              </Form.Item>

              <StyledUserFormBtn type="primary" htmlType="submit">
                Save
              </StyledUserFormBtn>
            </StyledUserForm>
          </StyledUserCard>
        </StyledUserContainer>
      </AppAnimate>
    </StyledUserPages>
  );
};

export default Signup;
