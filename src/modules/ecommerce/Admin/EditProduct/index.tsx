import { useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom"; // Import useParams from react-router-dom
import { Form, Input, Button, Radio, notification } from "antd";
import { findOne, updateUser } from "@crema/services/common/commonService"; // Assuming findOne is imported
import { StyledUserCard, StyledUserCardHeader, StyledUserCardLogo, StyledUserContainer, StyledUserPages } from "../AddEditProduct/index.styled";
import companyLogo from "../../../../assets/images/apmLogo.png"; // Replace with your actual path to the logo

const ProductEditPage = () => {
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL
  const [currentProduct, setCurrentProduct] = useState<any>(null); // Initialize with null to show loading
  const [loading, setLoading] = useState(true); // Loading state to show a loading indicator
  const navigate = useNavigate();

  // Fetch the product data based on the id from the URL
  const fetchProductById = async (id: string) => {
    setLoading(true); // Set loading to true while fetching the data
    try {
      const fetchedProduct = await findOne(id); // Fetch product details by ID
      setCurrentProduct(fetchedProduct); // Set the fetched data to state
    } catch (error) {
      console.error("Error fetching product:", error);
      notification.error({
        message: "Error",
        description: "Failed to load product data.",
      });
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  // Load the product data when the component mounts or when the id changes
  useEffect(() => {
    if (id) {
      fetchProductById(id); // Fetch the product details on component mount
    }
  }, [id]);

  // Handle save form data
  const handleSave = async (values: any) => {
    try {
      if (!id) {
        throw new Error("No product ID available for updating.");
      }

      // Exclude the email field from the payload since it's read-only
      const { email, ...updatedValues } = values;

      // Call the API to update the product details based on the form values
      const response = await updateUser(id, updatedValues);

      // Directly use the response (not response.data), based on the response structure
      if (response && response.id) {
        notification.success({
          message: "Technician Updated",
          description: `Technician was updated successfully!`,
        });

        // Update local state with the updated values (bypass fetchProductById)
        setCurrentProduct({ ...currentProduct, ...updatedValues, email: currentProduct.email });
        navigate('/apps/admin/technician-listing');

      } else {
        throw new Error("Invalid response from the server.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      notification.error({
        message: "Error",
        description: "Failed to update product data.",
      });
    }
  };

  return loading || !currentProduct ? (
    <div>Loading...</div> // Show a loading message while fetching product data
  ) : (
    <StyledUserPages>
      <StyledUserContainer>
        <StyledUserCard style={{ width: '600px', padding: '40px' }}> {/* Enhanced size and padding */}
          <StyledUserCardHeader>
            <StyledUserCardLogo>
              <img src={companyLogo} alt="crema" title="crema" />
            </StyledUserCardLogo>
            <h3>Edit Technician</h3>
          </StyledUserCardHeader>

          <Form
            name="editProduct"
            initialValues={currentProduct} // Set the initial values here, including email
            onFinish={handleSave} // Call handleSave on form submission
          >
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: "Please input your First Name!" }]}
            >
              <Input placeholder="First Name" style={{ padding: '10px' }} />
            </Form.Item>

            <Form.Item
              name="lastName"
              rules={[{ required: true, message: "Please input your Last Name!" }]}
            >
              <Input placeholder="Last Name" style={{ padding: '10px' }} />
            </Form.Item>

            <Form.Item
              name="isActive"
              rules={[{ required: true, message: "Please select a status!" }]}
            >
              <Radio.Group style={{ width: '100%', padding: '10px' }}>
                <Radio value={true}>Active</Radio>
                <Radio value={false}>InActive</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%', padding: '10px' }}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </StyledUserCard>
      </StyledUserContainer>
    </StyledUserPages>
  );
};

export default ProductEditPage;
