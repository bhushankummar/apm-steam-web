import { Button, Col, Select, Typography, Input } from "antd";
import { StyledOrderTable } from "../../Orders/index.styled";
import { ellipsisLines } from "@crema/helpers/StringHelper";
import {  useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { StyledTitle5 } from "../index.styled";
import AppRowContainer from "@crema/components/AppRowContainer";
import AppCard from "@crema/components/AppCard";
import { useState } from "react";

type FormData = {
  id: number;
  logType: string;
  message: string;
  dateAdded: string;
};

const ErrorLogInformation = () => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    property: null as keyof FormData | null, 
    operator: null as string | null,
    filterValue: "",
  });
  
  const [filteredData, setFilteredData] = useState<FormData[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const logData: FormData[] = [
    {
      id: 1,
      logType: "UPLOAD_SURVEY_SERVER_SFDC_FAILED",
      message: "Error - saloni@iqudtek.com has been not logged in into the mobile app",
      dateAdded: "18th Sept 2024 at 03:35 pm",
    },
    {
      id: 2,
      logType: "UPLOAD_SURVEY_SERVER_SFDC_FAILED",
      message: "Error - akash@iqudtek.com has been logged out from the web portal",
      dateAdded: "19th Sept 2024 at 05:21 am",
    },
  ];

  const properties = ["logType", "dateAdded"];

  const getColumns = (): ColumnsType<FormData> => [
    {
      title: "Log Type",
      dataIndex: "logType",
      key: "logType",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (message) => (
        <Typography.Link style={{ display: "flex", alignItems: "center" }}>
          {ellipsisLines(message)}
        </Typography.Link>
      ),
    },
    {
      title: "Date Added",
      dataIndex: "dateAdded",
      key: "dateAdded",
    },
  ];

  const handleApplyFilter = () => {
    let newFilteredData = [...logData];

    const matchesProperty = (item: FormData) => {
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
            return itemValue > filterValue;
          case "less":
            return itemValue < filterValue;
          default:
            return true;
        }
      }
      return true;
    };

    newFilteredData = newFilteredData.filter(matchesProperty);
    setFilteredData(newFilteredData);
    setIsFiltered(true);
  };

  const handleCancelFilter = () => {
    setFilterData({
      property: null,  // Reset property to null
      operator: null,  // Reset operator to null
      filterValue: "", // Clear the filter value
    });
    setFilteredData([]);
    setIsFiltered(false);
  };

  return (
    <>
      <StyledTitle5>Log Information</StyledTitle5>
      <AppRowContainer>
        <Col xs={24} lg={24} style={{ position: "relative", width: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <AppCard title="Filter">
              <div style={{ display: "flex", width: "100%" }}>
                <Select
                  placeholder="Select Property"
                  style={{ flex: 1, marginRight: "10px" }}
                  value={filterData.property} // Set the value for the property select
                  onChange={(value) =>
                    setFilterData({ ...filterData, property: value })
                  }
                >
                  {properties.map((property) => (
                    <Select.Option key={property} value={property}>
                      {property}
                    </Select.Option>
                  ))}
                </Select>
                <Select
                  placeholder="Select Operator"
                  style={{ flex: 1, marginRight: "10px" }}
                  value={filterData.operator} // Set the value for the operator select
                  onChange={(value) =>
                    setFilterData({ ...filterData, operator: value })
                  }
                >
                  <Select.Option value="equal">Equal</Select.Option>
                  <Select.Option value="greater">Greater Than</Select.Option>
                  <Select.Option value="less">Less Than</Select.Option>
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
              onClick={() => navigate("/apps/admin/add-products")}
              style={{
                width: "180px",
                marginTop: "10px",
              }}
            >
              New Technician
            </Button>
          </div>
        </Col>

        <Col xs={24} lg={24}>
          <AppCard>
            <StyledOrderTable
              hoverColor
              data={isFiltered ? filteredData : logData}
              columns={getColumns()}
              scroll={{ x: "auto" }}
            />
          </AppCard>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default ErrorLogInformation;
