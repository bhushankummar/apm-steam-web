import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Radio, notification } from "antd";
import { findOne, updateUser } from "@crema/services/common/commonService";
import { StyledUserCard, StyledUserCardHeader, StyledUserCardLogo, StyledUserContainer, StyledUserPages } from "../AddEditProduct/index.styled";
import companyLogo from "../../../../assets/images/apmLogo.png"; 

const TechnicianEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentTechnician, setCurrentTechnician] = useState<any>(null); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const fetchTechnicianById = async (id: string) => {
    setLoading(true); 
    try {
      const fetchedTechnician = await findOne(id); 
      setCurrentTechnician(fetchedTechnician); 
    } catch (error) {
      console.error("Error fetching technician:", error);
      notification.error({
        message: "Error",
        description: "Failed to load technician data.",
      });
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (id) {
      fetchTechnicianById(id); 
    }
  }, [id]);

  // Handle save form data
  const handleSave = async (values: any) => {
    try {
      if (!id) {
        throw new Error("No technician ID available for updating.");
      }

      // Exclude the email field from the payload since it's read-only
      const { email, ...updatedValues } = values;

      const response = await updateUser(id, updatedValues);

      // Directly use the response (not response.data), based on the response structure
      if (response && response.id) {
        notification.success({
          message: "Technician Updated",
          description: `Technician was updated successfully!`,
        });

        // Update local state with the updated values (bypass fetchTechnicianById)
        setCurrentTechnician({ ...currentTechnician, ...updatedValues, email: currentTechnician.email });
        navigate('/apps/admin/technician-listing');

      } else {
        throw new Error("Invalid response from the server.");
      }
    } catch (error) {
      console.error("Error updating technician:", error);
      notification.error({
        message: "Error",
        description: "Failed to update technician data.",
      });
    }
  };

  return loading || !currentTechnician ? (
    <div>Loading...</div> 
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
            initialValues={currentTechnician} // Set the initial values here, including email
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

export default TechnicianEditPage;
