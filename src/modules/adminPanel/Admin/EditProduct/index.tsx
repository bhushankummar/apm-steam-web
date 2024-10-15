import { useEffect, useState } from "react";
import AppLoader from "@crema/components/AppLoader";
import AppAnimate from "@crema/components/AppAnimate";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Radio } from "antd";
import { notification } from "antd";
import {
  StyledUserCard,
  StyledUserCardHeader,
  StyledUserCardLogo,
  StyledUserContainer,
  StyledUserPages,
} from "../AddEditProduct/index.styled";
import { getUserById, updateUser } from "../../../../@crema/services/common/commonService"; // Import API functions

// Updated User interface to include isActive
interface User {
  id: string ;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean; // New field added
}

const ProductEditPage = () => {
  const { id } = useParams(); // Extract user ID from the URL
  const [currentProduct, setCurrentProduct] = useState<User | null>(null); // Define type for state
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        // Handle the case where id is undefined
        notification.error({
          message: "Error",
          description: "User ID is not provided.",
        });
        navigate("/error-page"); // Or any fallback route
        return;
      }

      try {
        console.log(`Fetching product with ID: ${id}`);
        const product = await getUserById(id);
        if (product) {
          setCurrentProduct(product);
        } else {
          notification.error({
            message: "Error",
            description: "Product not found.",
          });
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        notification.error({
          message: "Error",
          description: "Failed to load product data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSave = async (values: Omit<User, 'id'>) => {
    try {
      if (!currentProduct) {
        notification.error({
          message: "Error",
          description: "Current product data is not available.",
        });
        return;
      }

      // Prepare the data for update, including isActive
      const updatedValues = {
        ...values,
        id: currentProduct.id, // Retain the current product ID for the update
      };

      // Call API to update user
      const updatedProduct = await updateUser(currentProduct.id, updatedValues); // Use currentProduct.id
      notification.success({
        message: "Success",
        description: "Technician updated successfully.",
      });
      setCurrentProduct(updatedProduct);
      navigate("/apps/admin/technician-listing");
    } catch (error) {
      console.error("Error updating product:", error);
      notification.error({
        message: "Error",
        description: "Failed to update product data.",
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
                <img
                  src={"/assets/images/logo.png"}
                  alt="crema"
                  title="crema"
                />
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
                name="isActive"
                rules={[{ required: true, message: "Please select a status!" }]}
              >
                <Radio.Group>
                  <Radio value={true}>Active</Radio>
                  <Radio value={false}>Inactive</Radio>
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
