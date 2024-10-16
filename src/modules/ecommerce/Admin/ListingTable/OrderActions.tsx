import { useNavigate } from "react-router-dom";
import { Button, Dropdown, notification, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { deleteUser } from "@crema/services/common/commonService";

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
        Modal.confirm({
          title: 'Are you sure you want to Delete this Technician?',
          onOk: () => handleDelete(id),
        });
        break;
      default:
        break;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteUser(id.toString());  
      if (response.data) {
        notification.success({
          message: "Success",
          description: "Technician deleted successfully.",
        });
  
      }
    } catch (error) {
      console.error("Error deleting technician:", error);
  
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "Failed to delete technician.",
      });
    }
  };

  return (
    <Dropdown menu={{ items, onClick: onMenuClick }} trigger={["click"]}>
      <Button shape="circle">
      <MoreOutlined
          onClick={() => console.log('More options clicked')}
          onPointerEnterCapture={() => console.log('Pointer entered')}
          onPointerLeaveCapture={() => console.log('Pointer left')}
        />
      </Button>
    </Dropdown>
  );
};

export default OrderActions;
