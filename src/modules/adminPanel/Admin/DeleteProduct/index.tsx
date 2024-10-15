import { useState } from "react";
import { Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../../@crema/services/common/commonService"; // Import the deleteUser function

const DeleteComponent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser("user-id-to-delete"); // Replace with actual user ID or logic to fetch it
      notification.success({
        message: "Success",
        description: "User deleted successfully.",
      });
      navigate("/apps/admin/technician-listing"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      notification.error({
        message: "Error",
        description: "Failed to delete user.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Delete User</h2>
      <Button type="primary" onClick={handleDelete} loading={loading}>
        Delete
      </Button>
    </div>
  );
};

export default DeleteComponent;
