import AppCard from '@crema/components/AppCard';
import React, { useState } from 'react';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Col, Select, Input, Button } from 'antd';
import { StyledFormWrapper } from './index.styled';

const { Option } = Select;

const operatorList = [
  { value: 'equal', label: 'Equal to' },
  { value: 'greater', label: 'Greater than' },
  { value: 'less', label: 'Less than' },
];

type FilterData = {
  status: "Active" | "InActive" | null;
  property: string | null;
  operator: string | null;
  filterValue: string;
};

type Props = {
  filterData: FilterData;
  setFilterData: React.Dispatch<React.SetStateAction<FilterData>>;
  properties: string[];
};

const FilterItem = ({ filterData, setFilterData, properties = [] }: Props) => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [value, setValue] = useState('');

  const handleApply = () => {
    setFilterData(prev => ({
      ...prev,
      property: selectedProperty,
      operator: selectedOperator,
      filterValue: value,
    }));

    console.log(filterData,'filterData',selectedProperty,selectedOperator,value);
  };

  const handleCancel = () => {
    setSelectedProperty(null);
    setSelectedOperator(null);
    setValue('');
    setFilterData(() => ({
      status: null,
      property: null,
      operator: null,
      filterValue: '',
    }));
  };

  return (
    <AppCard title='Filter' style={{ height: '200px' }}>
      <StyledFormWrapper>
        <AppRowContainer style={{ marginTop: "40px", display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Col xs={24} style={{ display: 'flex', gap: '10px' }}>
            <Select
              placeholder='Property'
              onChange={setSelectedProperty}
              allowClear
              style={{ flex: 1 }}
            >
              {properties.length > 0 ? (
                properties.map((property, index) => (
                  <Option key={index} value={property}>
                    {property}
                  </Option>
                ))
              ) : (
                <Option disabled>No properties available</Option>
              )}
            </Select>

            <Select
              placeholder='Operator'
              onChange={setSelectedOperator}
              allowClear
              style={{ flex: 1 }}
            >
              {operatorList.map(operator => (
                <Option key={operator.value} value={operator.value}>
                  {operator.label}
                </Option>
              ))}
            </Select>

            <Input
              placeholder='Value'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ flex: 1 }}
            />
          </Col>

          <Col xs={24} style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px' }}>
            <Button type="primary" onClick={handleApply}>
              Apply
            </Button>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </AppRowContainer>
      </StyledFormWrapper>
    </AppCard>
  );
};

export default FilterItem;

