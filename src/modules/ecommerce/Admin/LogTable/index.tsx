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

const LogInformation = () => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    property: null as string | null,
    operator: null as string | null,
    filterValue: "",
  });
  const [filteredData, setFilteredData] = useState<FormData[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const logData: FormData[] = [
    {
      id: 1,
      logType: "USER_LOGGED_IN",
      message: "saloni@iqudtek.com has been logged in at 18th Sept 2024 at 03:35 pm.",
      dateAdded: "18th Sept 2024 at 03:35 pm",
    },
    {
      id: 2,
      logType: "USER_LOGGED_OUT",
      message: "akash@iqudtek.com has been logged out at 19th Sept 2024 at 05:21 am.",
      dateAdded: "19th Sept 2024 at 05:21 am",
    },
    {
      id: 3,
      logType: "SFDC_PROJECT_SYNC_COMPLETED",
      message: "Project sync completed at 29th Sept 2024 at 03:35 pm. Total projects 100.",
      dateAdded: "29th Sept 2024 at 03:35 pm",
    },
    {
      id: 4,
      logType: "UPLOAD_SURVEY_MOBILE_SERVER_SUCCESS",
      message: "Survey uploaded by bhushan@iqudtek.com at 24th Sept 2024 at 07:02 pm.",
      dateAdded: "24th Sept 2024 at 07:02 pm",
    },
    {
      id: 5,
      logType: "UPLOAD_SURVEY_SERVER_SFDC_SUCCESS",
      message: "Survey uploaded to Salesforce by bhushan@iqudtek.com at 24th Sept 2024 at 08:55 pm.",
      dateAdded: "24th Sept 2024 at 08:55 pm",
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
        // Type guard to ensure filterData.property is a key of FormData
        if (filterData.property in item) {
          const value = item[filterData.property as keyof FormData];
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
      }
      return true;
    };
    
    newFilteredData = newFilteredData.filter(matchesProperty);
    setFilteredData(newFilteredData);
    setIsFiltered(true);
  };

  const handleCancelFilter = () => {
    setFilterData({
      property: null,
      operator: null,
      filterValue: "",
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
                  value={filterData.property} // Set value for property select
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
                  value={filterData.operator} // Set value for operator select
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

export default LogInformation;
