import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import AppRowContainer from "@crema/components/AppRowContainer";
import AppCard from "@crema/components/AppCard";
import { Col, Button, Select, Input } from "antd";
import { StyledTitle5 } from "../index.styled";
import { useNavigate } from "react-router-dom";
import ProductTable from "../ListingTable";
import axios from "@crema/services/axios";

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
    };
  
    fetchUsers(); 
  }, [filterData, page, pageSize]);
  

  const handleApplyFilter = () => {
    setPage(0); 
  };

  const handleCancelFilter = () => {
    setFilterData({
      status: null,
      property: null,
      operator: null,
      filterValue: "",
    });
    setPage(0); // Reset to first page
  };

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  // Mapping for properties
  const propertyMapping: Record<string, string> = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    createdAt: "Date Added",
    status: "Status",
  };

  const properties = Object.keys(propertyMapping); // Use the keys for filtering

  const handleAddClient = () => {
    navigate("/apps/admin/add-products");
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      <StyledTitle5 style={{textAlign:'center',color:'#0076CE',fontSize:20}}>
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
            <ProductTable filteredData={filteredData}  />
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
