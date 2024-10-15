import { useEffect, useState } from "react";
import AppLoader from "@crema/components/AppLoader";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, notification } from "antd";
import { ellipsisLines } from "@crema/helpers/StringHelper";
import { ColumnsType } from "antd/es/table";
import { StyledOrderTable } from "./index.styled";
import { deleteUser } from "../../../../@crema/services/common/commonService"; // Import deleteUser function

type FormData = {
  id: string; // ID is of string type
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
};

const getColumns = (navigate: ReturnType<typeof useNavigate>, handleDelete: (id: string) => void): ColumnsType<FormData> => [
  {
    title: "Full Name",
    key: "fullName",
    render: (record: FormData) => (
      <span>{`${record.firstName} ${record.lastName}`}</span>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email: string) => (
      <Typography.Link style={{ display: "flex", alignItems: "center" }}>
        {ellipsisLines(email)}
      </Typography.Link>
    ),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Action",
    key: "action",
    render: (record: FormData) => (
      <Button type="link" onClick={() => handleDelete(record.id)}>
        Delete
      </Button>
    ),
  },
];

const ProductArchivedPage = () => {
  const [archivedProducts, setArchivedProducts] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      handleDelete(id); // Call handleDelete with the string ID
    } else {
      console.warn("No ID found in the URL");
    }
  }, [id]);

  const handleDelete = async (userId: string) => {
    console.log("Attempting to delete user with ID:", userId); // Logging the userId
    try {
      await deleteUser(userId); // Pass the userId to deleteUser API call
      notification.success({
        message: "Success",
        description: "User deleted successfully.",
      });
      // Redirect to the technician listing page after deletion
      navigate("/apps/admin/technician-listing"); // Use navigate function for redirect
    } catch (error) {
      console.error("Error deleting user:", error); // Log the error for debugging
      notification.error({
        message: "Error",
        description: "Failed to delete user.",
      });
    }
  };

  if (loading) {
    return <AppLoader />;
  }

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Archived Products</h2>
      <StyledOrderTable
        hoverColor
        data={archivedProducts}
        columns={getColumns(navigate, handleDelete)}
        scroll={{ x: "auto" }}
      />
    </>
  );
};

export default ProductArchivedPage;
