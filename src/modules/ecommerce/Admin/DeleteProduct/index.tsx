import { useEffect, useState } from "react";
import AppLoader from "@crema/components/AppLoader";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { StyledListingStatus } from "../index.styled";
import { Typography } from "antd";
import { ellipsisLines } from "@crema/helpers/StringHelper";
import { ColumnsType } from "antd/es/table";
import { StyledOrderTable } from "./index,styled";


type FormData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
};

const getColumns = (navigate: NavigateFunction): ColumnsType<FormData> => [
  {
    title: "Full Name",
    key: "fullName",
    render: (record:any) => (
      <span>{`${record.firstName} ${record.lastName}`}</span>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email:string) => (
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
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <StyledListingStatus
        style={{
          color: status === "Active" ? "#43C888" : "#F84E4E",
          backgroundColor: status === "Active" ? "#43C88844" : "#F84E4E44",
          fontWeight: status === "InActive" ? 'bold' : 'normal',
        }}
      >
        {status === "Active" ? "Active" : "InActive"}
      </StyledListingStatus>
    ),
  },
];

const ProductArchivedPage = () => {
  const [archivedProducts, setArchivedProducts] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch archived product data from local storage
    const storedData = localStorage.getItem("deletedAgents"); // Ensure this is the correct key
    console.log("Fetching Archived Technician data...",storedData); // Console log for debugging

    if (storedData) {
      try {
        const products: FormData[] = JSON.parse(storedData);
        console.log("Archived Technician data retrieved:", products); // Log the retrieved data
        setArchivedProducts(products);
      } catch (error) {
        console.error("Error parsing stored data:", error); // Log any parsing errors
      }
    } else {
      console.warn("No Archived Technician data found in local storage."); // Warn if no data is found
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <AppLoader />; // Show loader while fetching data
  }

  return (
    <>
    <h2 style={{textAlign:'center',marginBottom:'30px'}}> Archieved Products</h2>
    <StyledOrderTable
      hoverColor
      data={archivedProducts}
      columns={getColumns(navigate)}
      scroll={{ x: "auto" }}
    />
    </>
  );
};

export default ProductArchivedPage;
