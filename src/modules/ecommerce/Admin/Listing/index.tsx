import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import AppRowContainer from "@crema/components/AppRowContainer";
import AppCard from "@crema/components/AppCard";
import { Col, Button, Select, Input, notification } from "antd";
import { StyledTitle5 } from "../index.styled";
import { useNavigate } from "react-router-dom";
import ProductTable from "../ListingTable";
import axios from "@crema/services/axios";
import moment from "moment";
import companyLogo from "../../../../assets/images/apmLogo.png"; 
import API_ENDPOINTS from "../../../../constant/apiEndpoints";
import axiosService from "@crema/services/axios/axiosService";
import { FindUsersResponse } from "../../../../constant/interfaces";

const { Option } = Select;

const ProductListing = () => {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const disableGreaterLessThan = ['firstName', 'lastName', 'email', 'isActive'];

  const [filterData, setFilterData] = useState({
    isActive: null as "active" | "inactive" | null,
    property: null as string | null,
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
        } else {
          console.error(
            "Failed to fetch users: savedData or savedData.users is undefined"
          );
        }
  
        const response = await axios.post(`${import.meta.env.VITE_API_URL as string}/api/users/find`, payload);
  
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
  }, [ page, pageSize]);
  
  
  const applyFilters = (data: any[]) => {
    let newFilteredData = [...data];
  
    const matchesStatus = filterData.isActive
  ? (item: any) => {
      if (filterData.isActive === "active") return item.isActive = true;
      if (filterData.isActive === "inactive") return item.isActive = false;
      return true;
    }
  : () => true;


    const matchesProperty = (item: any) => {
      if (
        filterData.property &&
        filterData.operator &&
        filterData.filterValue
      ) {
        const value = item[filterData.property];
        const filterValue = filterData.filterValue.toLowerCase();
        const itemValue = value ? value.toString().toLowerCase() : "";

        if (filterData.property === "createdAt") {
          // Convert filterValue (date in MM/DD/YYYY format) to Unix timestamp
          const filterUnixTimestamp =
            new Date(filterData.filterValue).getTime() / 1000; // in seconds

          switch (filterData.operator) {
            case "equal":
              return parseInt(itemValue) === filterUnixTimestamp;
            case "greater":
              return parseInt(itemValue) > filterUnixTimestamp;
            case "less":
              return parseInt(itemValue) < filterUnixTimestamp;
            default:
              return true;
          }
        }
  
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
  
  const handleApplyFilter = async () => {
    setLoading(true);
    setPage(0);
  
    try {
      let filter;
      let searchString;
      
      // Define filter based on filterData
      if (filterData.property === "isActive") {
        filter = {
          columnName: "isActive",
          value: filterData.filterValue.toLowerCase() === "active" ? "true" : "false",
          operator: "equals",
        };
      } else if (filterData.property && filterData.operator && filterData.filterValue) {
        let filterValue = filterData.filterValue;
  
        if (filterData.property === "createdAt") {
          console.log(filterData.operator, "Date Added (createdAt) filter value:", filterData.filterValue);
  
          // Ensure the value is a string and in the format DD/MM/YYYY
          const dateString = filterData.filterValue;
          console.log("Date string:", dateString); // Log to see the exact value
  
          // Convert string to moment object, ensuring the format is 'DD/MM/YYYY'
          const dateMoment = moment(dateString, 'DD/MM/YYYY', true); // The third parameter is strict mode
  
          if (dateMoment.isValid()) {
            const unixTimestamp = dateMoment.unix();
            console.log("Unix Timestamp:", unixTimestamp);
  
            // Set filter for 'createdAt' as Unix timestamp
            filter = {
              columnName: filterData.property,
              value: unixTimestamp.toString(),
              operator: filterData.operator,
            };
          } else {
            console.error("Invalid date format, unable to parse:", dateString);
            notification.error({
              message: "Date format is wrong",
              description: "Use format DD/MM/YYYY",
            });
            return;
          }
        } else {
          // For other properties, just use the provided filter value
          filter = {
            columnName: filterData.property,
            value: filterValue,
            operator: filterData.operator,
          };
        }
      }
  
      // Prepare the config for GET request
      const payload = {
        searchString,
        currentPage: 1,
        pageSize,
        filter,
      };
  
      // Make the GET request using axiosService
      const response = await axiosService.post<FindUsersResponse>(API_ENDPOINTS.USERS.FIND, payload);
      console.log(response,' filter response');
      
      // Update state with filtered data and total count
      setFilteredData(response.data.users);  
      setTotalCount(response.data.total);    
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelFilter = () => {
    setFilterData({
      isActive: null,
      property: null,
      // operator: "equals",
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
    isActive: "Status",
  };

  const properties = Object.keys(propertyMapping);

  const handleAddClient = () => {
    navigate("/apps/admin/add-products");
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
  <div style={{ marginRight: "10px" }}>
    <img 
      src={companyLogo} 
      alt="crema" 
      title="crema" 
      style={{ width: "60px", height: "20px",marginBottom:"10px" }} // Adjust the size here
    />
  </div>
  <StyledTitle5 style={{ color: "#0076CE", fontSize: 20 }}>
    {messages["sidebar.ecommerceAdmin.agentListing"] as string}
  </StyledTitle5>
</div>

      <AppRowContainer>
        <Col xs={24} lg={24} style={{ position: "relative", width: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <AppCard title="Filter">
              <div style={{ display: "flex", width: "100%" }}>
                <Select
                  placeholder="Select Property"
                  style={{ flex: 1, marginRight: "10px" }}
                  value={filterData.property}
                  onChange={(value) =>{
                    let newOperator = filterData.operator;
                    if (['firstName', 'lastName', 'email', 'isActive'].includes(value)) {
                      newOperator = 'equals';
                    } else if (value === 'createdAt') {
                      newOperator = 'greaterThan';
                    }
                    
                    setFilterData({
                      ...filterData,
                      property: value,
                      operator: newOperator
                    });
                  }}
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
                  <Option value="equals" disabled={filterData.property === "createdAt"}>Equal</Option>
                  <Option value="greaterThan" disabled={filterData.property ? disableGreaterLessThan.includes(filterData.property) : false}>Greater Than</Option>
                  <Option value="lessThan" disabled={filterData.property ? disableGreaterLessThan.includes(filterData.property) : false}>Less Than</Option>
                </Select>
                <Input
                  placeholder={filterData.property === "createdAt" ? "DD/MM/YYYY" : "Value"}
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
            <ProductTable filteredData={filteredData.map(user => ({
              ...user,
              createdAt: user.createdAt 
          }))} />
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
