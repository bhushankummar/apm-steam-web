import { Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const items = [
  { key: 1, label: <span style={{ fontSize: 14 }}>View Order</span> },
  { key: 2, label: <span style={{ fontSize: 14 }}>Edit</span> },
  { key: 3, label: <span style={{ fontSize: 14 }}>Delete</span> },
];

const OrderActions = () => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
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
