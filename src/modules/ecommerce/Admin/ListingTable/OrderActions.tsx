import { useNavigate } from "react-router-dom";
import { Button, Dropdown, notification, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";

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
          title: 'Are you sure you want to delete this agent?',
          onOk: () => handleDelete(id),
        });
        break;
      default:
        break;
    }
  };

  const handleDelete = (id: number) => {
    const storedData = localStorage.getItem("AgentData");
    if (storedData) {
      try {
        const products = JSON.parse(storedData);
        const productToDelete = products.find((p: any) => p.id === id);
        const updatedProducts = products.filter((p: any) => p.id !== id);

        if (productToDelete) {
          // Store the deleted product in a separate array in local storage
          const deletedAgents = JSON.parse(localStorage.getItem("deletedAgents") || "[]");
          deletedAgents.push(productToDelete);
          localStorage.setItem("deletedAgents", JSON.stringify(deletedAgents));

          // Update the original products in local storage
          localStorage.setItem("AgentData", JSON.stringify(updatedProducts));
          
          notification.success({
            message: "Success",
            description: "Technician deleted successfully.",
          });
        } else {
          notification.error({
            message: "Error",
            description: "Technician not found.",
          });
        }
      } catch (error) {
        console.error("Error parsing stored data:", error);
        notification.error({
          message: "Error",
          description: "Failed to delete Technician data.",
        });
      }
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
