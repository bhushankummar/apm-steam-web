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
import { createUser, findUsers } from "@crema/services/common/commonService";
import companyLogo from "../../../../assets/images/apmLogo.png"; // Replace with your actual path to the logo

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
  const [form, setForm] = useState<FormData>({
    id: uuidv4(),
    firstName: "",
    lastName: "",
    email: "",
    createdAt: new Date().toISOString().split('T')[0],
    status: 'Active',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFinish = async () => {
    const newData = { 
      ...form, 
      // id: uuidv4(), 
      // createdAt: new Date().toISOString().split('T')[0],
      // status: form.status || 'Active'
    };
  
    try {
      const response = await createUser(newData as any); // Call the createUser function
  
      if (response) {
        notification.success({
          message: "Success",
          description: "Technician has been created successfully.",
        });
  
        navigate('/apps/admin/technician-listing');
      }
    } catch (error: any) {
      console.error("Error creating technician:", error);
      notification.error({
        message: "Error",
        description: error.message || "Failed to create technician.",
      });
    }
  
    setForm({
      id: uuidv4(),
      firstName: "",
      lastName: "",
      email: "",
      createdAt: new Date().toISOString().split('T')[0],
      status: "Active", 
    });
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
                <img src={companyLogo} alt="crema" title="crema" />
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
