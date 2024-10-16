import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, notification, Row, Col } from "antd";
import { deleteUser } from "../../../../@crema/services/common/commonService"; // Assuming you have this function
import logo from "../../../../assets/images/apmLogo.png"; // Import logo from the assets folder

const DeleteComponent = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      notification.error({
        message: "Error",
        description: "User ID is missing from the URL.",
      });
      navigate(`/apps/admin/technician-listing`);
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteUser(id as string);

      if (response.data) {
        notification.success({
          message: "Success",
          description: "Technician deleted successfully.",
        });
      }

      navigate(`/apps/admin/technician-listing`);
    } catch (error) {
      console.error("Error deleting technician:", error);

      notification.error({
        message: "Error",
        description: error.response?.data?.message || "Failed to delete technician.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card
        title={
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={logo} alt="Company Logo" style={{ width: "50px", marginRight: "10px" }} />
            <span>Delete Technician</span>
          </div>
        }
        bordered={false}
        style={{ width: 500, padding: "40px", textAlign: 'center' }} // Increased width and padding
      >
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Are you sure you want to delete this technician? This action cannot be undone.
        </p>
        <Row justify="center" gutter={16}>
          <Col span={11}>
            <Button
              type="primary"
              danger
              loading={isDeleting}
              onClick={() => handleDelete()}
              style={{ width: "100%", fontSize: "18px" }} // Full width for better alignment
            >
              Yes, Delete
            </Button>
          </Col>
          <Col span={11}>
            <Button
              onClick={() => navigate(`/apps/admin/technician-listing`)}
              style={{ width: "100%", fontSize: "18px" }} // Full width for better alignment
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DeleteComponent;
