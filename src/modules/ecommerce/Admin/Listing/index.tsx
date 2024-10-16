import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import AppRowContainer from "@crema/components/AppRowContainer";
import AppCard from "@crema/components/AppCard";
import { Col, Button, Select, Input } from "antd";
import { StyledTitle5 } from "../index.styled";
import { useNavigate } from "react-router-dom";
import ProductTable from "../ListingTable";
import axios from "@crema/services/axios";
import { findUsers } from "@crema/services/common/commonService";

const { Option } = Select;

const ProductListing = () => {
  const { messages } = useIntl();
  const navigate = useNavigate();

  const [filterData, setFilterData] = useState({
    status: null as "Active" | "InActive" | null,
    property: null as string | null,
    operator: null as string | null,
    filterValue: "",
  });

  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [productList, setProductList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        console.log('Fetching filtered data from backend...');

        let payload: any = {
          currentPage: page + 1,  
          pageSize: pageSize,    
        };

        if (filterData.property && filterData.operator && filterData.filterValue) {
          payload = {
            ...payload,
            filter: {
              columnName: filterData.property, 
              value: filterData.filterValue,    
              operator: filterData.operator,    
            }
          };
        }
  
        const response = await axios.post('http://localhost:3000/users/find', payload);
  
        setProductList(response.data.users);
        setFilteredData(response.data.users);
        setTotalCount(response.data.total); 
  
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
      setLoading(false);
    };
  
    fetchUsers(); 
  }, [filterData, page, pageSize]);
  
  
  const applyFilters = (data: any[]) => {
    let newFilteredData = [...data];
  
    const matchesStatus = filterData.status
      ? (item: any) => item.status === filterData.status
      : () => true;
  
    const matchesProperty = (item: any) => {
      if (filterData.property && filterData.operator && filterData.filterValue) {
        const value = item[filterData.property];
        const filterValue = filterData.filterValue.toLowerCase();
        const itemValue = value ? value.toString().toLowerCase() : "";
  
        if (filterData.property === "createdAt") {
          // Convert filterValue (date in MM/DD/YYYY format) to Unix timestamp
          const filterUnixTimestamp = new Date(filterData.filterValue).getTime() / 1000; // in seconds
          const itemUnixTimestamp = new Date(value).getTime() / 1000; // in seconds
  
          switch (filterData.operator) {
            case "equal":
              return itemUnixTimestamp === filterUnixTimestamp;
            case "greater":
              return itemUnixTimestamp > filterUnixTimestamp;
            case "less":
              return itemUnixTimestamp < filterUnixTimestamp;
            default:
              return true;
          }
        } else {
          // For other properties (non-date), continue with the string comparison
          switch (filterData.operator) {
            case "equal":
              return itemValue === filterValue;
            case "greater":
              return itemValue > filterValue;
            case "less":
              return itemValue < filterValue;
            default:
              return true;
          }
        }
      }
      return true;
    };
  
    newFilteredData = newFilteredData.filter(
      (item) => matchesStatus(item) && matchesProperty(item)
    );
  
    // Paginate the filtered data
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = newFilteredData.slice(startIndex, endIndex);
  
    setFilteredData(paginatedData);
    setTotalCount(newFilteredData.length);
  };
  

  const handleApplyFilter = () => {
    applyFilters(productList);
    setPage(0);
  };

  const handleCancelFilter = () => {
    setFilterData({
      status: null,
      property: null,
      operator: null,
      filterValue: "",
    });
    setFilteredData(productList);
    setTotalCount(productList.length);
    setPage(0);
  };

  const onChangePage = (newPage: number) => {
    setPage(newPage);
    applyFilters(productList);
  };

  const propertyMapping: Record<string, string> = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    createdAt: "Date Added",
    status: "Status",
  };

  const properties = Object.keys(propertyMapping);

  const handleAddClient = () => {
    navigate("/apps/admin/add-products");
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      <StyledTitle5 style={{ textAlign: "center", color: "#0076CE", fontSize: 20 }}>
        {messages["sidebar.ecommerceAdmin.agentListing"] as string}
      </StyledTitle5>
      <AppRowContainer>
        <Col xs={24} lg={24} style={{ position: "relative", width: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <AppCard title="Filter">
              <div style={{ display: "flex", width: "100%" }}>
                <Select
                  placeholder="Select Property"
                  style={{ flex: 1, marginRight: "10px" }}
                  value={filterData.property}
                  onChange={(value) =>
                    setFilterData({ ...filterData, property: value })
                  }
                >
                  {properties.map((property) => (
                    <Option key={property} value={property}>
                      {propertyMapping[property]}
                    </Option>
                  ))}
                </Select>
                <Select
                  placeholder="Select Operator"
                  style={{ flex: 1, marginRight: "10px" }}
                  value={filterData.operator}
                  onChange={(value) =>
                    setFilterData({ ...filterData, operator: value })
                  }
                >
                  <Option value="equals">Equal</Option>
                  <Option value="greaterThan">Greater Than</Option>
                  <Option value="lessThan">Less Than</Option>
                </Select>
                <Input
                  placeholder="Value"
                  style={{ flex: 1 }}
                  value={filterData.filterValue}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      filterValue: e.target.value,
                    })
                  }
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginTop: "10px",
                }}
              >
                <Button
                  type="primary"
                  onClick={handleApplyFilter}
                  style={{ marginRight: "10px" }}
                >
                  Apply
                </Button>
                <Button onClick={handleCancelFilter}>Cancel</Button>
              </div>
            </AppCard>
          </div>

          <div
            style={{
              position: "absolute",
              top: 1,
              right: 25,
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <Button
              type="primary"
              onClick={handleAddClient}
              style={{ width: "180px", marginTop: "10px" }}
            >
              New Technician
            </Button>
          </div>
        </Col>

        <Col xs={24} lg={24}>
          <AppCard>
            <ProductTable filteredData={filteredData} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Button
                disabled={page === 0}
                onClick={() => onChangePage(page - 1)}
              >
                Previous
              </Button>
              <span>
                Page {page + 1} of {totalPages}
              </span>
              <Button
                disabled={page >= totalPages - 1}
                onClick={() => onChangePage(page + 1)}
              >
                Next
              </Button>
            </div>
          </AppCard>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default ProductListing;
