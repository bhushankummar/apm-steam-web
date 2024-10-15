import OrderActions from "./OrderActions";
import { Typography } from "antd";
import { StyledListingStatus } from "../index.styled";
import { StyledOrderTable } from "../../Orders/index.styled";
import { ellipsisLines } from "@crema/helpers/StringHelper";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

type FormData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string; // Assuming this property exists
  status: "Active" | "InActive"; // Assuming this property exists
};

const getColumns = (): ColumnsType<FormData> => [
  {
    title: "Full Name",
    key: "fullName",
    render: (record) => <span>{`${record.firstName} ${record.lastName}`}</span>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email) => (
      <Typography.Link style={{ display: "flex", alignItems: "center" }}>
        {ellipsisLines(email)}
      </Typography.Link>
    ),
  },
  {
    title: "Date Added",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <StyledListingStatus
        style={{
          color: status === "Active" ? "#43C888" : "#F84E4E",
          fontWeight: status === "InActive" ? "bold" : "normal",
          textAlign: "left",
        }}
      >
        {status === "Active" ? (
          <>
            <CheckCircleOutlined
              style={{ marginRight: 5, color: "#43C888", fontWeight: "bold" }}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            />
            <span style={{ color: "#43C888", fontWeight: "bold" }}>Active</span>
          </>
        ) : (
          <>
            <CloseCircleOutlined
              style={{ marginRight: 5 }}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            />
            InActive
          </>
        )}
      </StyledListingStatus>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    className: "order-table-action",
    fixed: "right",
    render: (_, record) => <OrderActions id={record.id} />,
  },
];

const ProductTable = ({ filteredData }: { filteredData: FormData[] }) => {
  const navigate = useNavigate();

  return (
    <StyledOrderTable
      hoverColor
      data={filteredData}
      columns={getColumns()}
      scroll={{ x: "auto" }}
    />
  );
};

export default ProductTable;
