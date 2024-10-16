import { useEffect, useState } from "react";
import AppLoader from "@crema/components/AppLoader";
import AppAnimate from "@crema/components/AppAnimate";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Radio } from "antd";
import { notification } from "antd";
import { StyledUserCard, StyledUserCardHeader, StyledUserCardLogo, StyledUserContainer, StyledUserPages } from "../AddEditProduct/index.styled";
import { updateUser, getUserById } from "@crema/services/common/commonService";

// Define Product type to specify the shape of the product object
interface Product {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}

const ProductEditPage = () => {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);  // Type currentProduct as Product | null
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getUserById(id);
        if (response.data) {
          setCurrentProduct(response.data);
        } else {
          notification.error({
            message: "Error",
            description: "Technician not found.",
          });
        }
      } catch (error) {
        console.error("Error fetching technician data:", error);
        notification.error({
          message: "Error",
          description: "Failed to load technician data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSave = async (values: any) => {
    try {
      const response = await updateUser(id, values);

      if (response.data) {
        notification.success({
          message: "Success",
          description: "Technician updated successfully.",
        });
        setCurrentProduct({ ...currentProduct, ...values });
        navigate('/apps/admin/technician-listing');
      }
    } catch (error) {
      console.error("Error updating technician:", error);
      notification.error({
        message: "Error",
        description: "Failed to update technician data.",
      });
    }
  };

  return loading || !currentProduct ? (
    <AppLoader />
  ) : (
    <StyledUserPages>
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <StyledUserContainer>
          <StyledUserCard>
            <StyledUserCardHeader>
              <StyledUserCardLogo>
                <img src={"/assets/images/logo.png"} alt="crema" title="crema" />
              </StyledUserCardLogo>
              <h3>Edit Technician</h3>
            </StyledUserCardHeader>

            <Form
              name="editProduct"
              initialValues={currentProduct}
              onFinish={handleSave}
            >
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: "Please input your First Name!" }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>

              <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Please input your Last Name!" }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please input your Email!" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="status"
                rules={[{ required: true, message: "Please select a status!" }]}
              >
                <Radio.Group>
                  <Radio value="Active">Active</Radio>
                  <Radio value="InActive">InActive</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </StyledUserCard>
        </StyledUserContainer>
      </AppAnimate>
    </StyledUserPages>
  );
};

export default ProductEditPage;
