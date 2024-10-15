import { useNavigate } from "react-router-dom";
import { Button, Dropdown, notification, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { deleteUser } from "../../../../@crema/services/common/commonService"; // Import the API function to delete user

type Props = {
  id: number;
};

const OrderActions = ({ id }: Props) => {
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: <span style={{ fontSize: 14 }}>Edit</span>,
    },
    { key: "2", label: <span style={{ fontSize: 14 }}>Delete</span> },
  ];

  const onMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "1":
        navigate(`/apps/admin/edit-products/${id}`);
        break;
      case "2":
        // Show confirmation dialog for deletion
        navigate(`/apps/admin/delete-products/${id}`);
        // Modal.confirm({
        //   title: "Are you sure you want to delete this agent?",
        //   onOk: () => handleDelete(id), // Call handleDelete with the current id
        // });
        break;
      default:
        break;
    }
  };

  const handleDelete = async (id: number) => {
    console.log("Deleting agent with id:", id); // Debugging: Log the ID before deletion

    try {
      // Call the API to delete the user by id
      await deleteUser(id.toString());

      notification.success({
        message: "Success",
        description: "Technician deleted successfully.",
      });

      console.log("Deletion successful for agent id:", id); // Debugging: Log successful deletion
    } catch (error) {
      console.error("Error occurred while deleting agent:", error); // Debugging: Log error details
      notification.error({
        message: "Error",
        description: "Failed to delete Technician data.",
      });
    }
  };

  return (
    <Dropdown menu={{ items, onClick: onMenuClick }} trigger={["click"]}>
      <Button shape="circle">
        <MoreOutlined />
      </Button>
    </Dropdown>
  );
};

export default OrderActions;
