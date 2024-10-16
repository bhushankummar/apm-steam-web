import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import AppRowContainer from "@crema/components/AppRowContainer";
import AppCard from "@crema/components/AppCard";
import { Col, Button, Select, Input } from "antd";
import { StyledTitle5 } from "../index.styled";
import { useNavigate } from "react-router-dom";
import ProductTable from "../ListingTable";
import { findUsers } from "../../../../@crema/services/common/commonService";

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
  const [productList, setProductList] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parsedData = await findUsers();

        console.log(parsedData, 'saloni');

        if (parsedData && Array.isArray(parsedData)) {
          setProductList(parsedData);
          applyFilters(parsedData);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  const applyFilters = (data: any[]) => {
    let newFilteredData = [...data];

    const matchesStatus = filterData.status
      ? (item: any) => item.status === filterData.status
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

        switch (filterData.operator) {
          case "equal":
            return itemValue === filterValue;
          case "greater":
            if (filterData.property === "createdAt") {
              return (
                new Date(value).getTime() >
                new Date(filterData.filterValue).getTime()
              );
            }
            return itemValue > filterValue;
          case "less":
            if (filterData.property === "createdAt") {
              return (
                new Date(value).getTime() <
                new Date(filterData.filterValue).getTime()
              );
            }
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
    const startIndex = page * 10; // Assuming default pageSize of 10
    const endIndex = startIndex + 10;
    const paginatedData = newFilteredData.slice(startIndex, endIndex);

    setFilteredData(paginatedData);
    setTotalCount(newFilteredData.length); // Update total count for pagination
  };

  const handleApplyFilter = () => {
    applyFilters(productList); // Apply filters to the stored product list
    setPage(0); // Reset to first page
  };

  const handleCancelFilter = () => {
    setFilterData({
      status: null,
      property: null,
      operator: null,
      filterValue: "",
    });
    setFilteredData(productList);
    setTotalCount(productList.length); // Reset total count
    setPage(0); // Reset to first page
  };

  const onChangePage = (newPage: number) => {
    setPage(newPage);
    applyFilters(productList); // Reapply filters on page change
  };

  // Mapping for properties
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

  const totalPages = Math.ceil(totalCount / 10); // Assuming pageSize is 10

  return (
    <>
      <StyledTitle5 style={{ textAlign: 'center', color: '#0076CE', fontSize: 20 }}>
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
                  <Option value="equal">Equal</Option>
                  <Option value="greater">Greater Than</Option>
                  <Option value="less">Less Than</Option>
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
