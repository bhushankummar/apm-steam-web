import OrderActions from "./OrderActions";
import { Typography } from "antd";
import { StyledListingStatus } from "../index.styled";
import { StyledOrderTable } from "../../Orders/index.styled";
import { ellipsisLines } from "@crema/helpers/StringHelper";
import type { ColumnsType } from "antd/es/table";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment"; // Importing moment for date formatting

type FormData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string; // Assuming this property exists
  isActive: boolean; // Assuming this property exists as a boolean
};

// Helper function to format dates using moment
const formatDate = (dateString: string): string => {
  // Check if the date is a Unix timestamp
  const timestamp = parseInt(dateString, 10);
  
  if (!isNaN(timestamp)) {
    // Convert Unix timestamp (in seconds) to a formatted date
    const formattedDate = moment.unix(timestamp).format("MM/DD/YYYY");
    return formattedDate;
  }
  
  // If it's not a timestamp, attempt to format it as a regular date
  const formattedDate = moment(dateString).format("MM/DD/YYYY");
  return formattedDate;
};

const getColumns = (): ColumnsType<FormData> => [
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
    title: "Date Added",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt: string) => {
      console.log("Record createdAt:", createdAt); // Debugging log for createdAt
      return <span>{formatDate(createdAt)}</span>; // Using moment here
    },
  },
  {
    title: "Status",
    key: "status",
    render: (record: FormData) => {
      const status = record.isActive ? "Active" : "InActive";

      return (
        <StyledListingStatus
          style={{
            color: status === "Active" ? "#43C888" : "#F84E4E",
            fontWeight: status === "InActive" ? "bold" : "normal",
            textAlign: "left",
          }}
        >
          {status === "Active" ? (
            <>
              <span style={{ marginRight: 5, color: "#43C888", fontWeight: "bold" }}>
                <CheckCircleOutlined />
              </span>
              <span style={{ color: "#43C888", fontWeight: "bold" }}>Active</span>
            </>
          ) : (
            <>
              <span style={{ marginRight: 5 }}>
                <CloseCircleOutlined />
              </span>
              InActive
            </>
          )}
        </StyledListingStatus>
      );
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    className: "order-table-action",
    fixed: "right",
    render: (_, record: FormData) => <OrderActions id={record.id} />,
  },
];

const ProductTable = ({ filteredData }: { filteredData: FormData[] }) => {
  return (
    <StyledOrderTable
      hoverColor
      data={filteredData}
      columns={getColumns()}
      scroll={{ x: "auto" }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        total: filteredData.length,
        showTotal: (total: number) => `Total ${total} items`,
      }}
    />
  );
};

export default ProductTable;
