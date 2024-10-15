import React from 'react';
import { Modal } from 'antd';
import ListingTable from '../ListingTable'; 

const FilteredDataModal: React.FC<any> = ({ open, onClose, data }) => {
    return (
      <Modal 
        title="Filtered Data" 
        open={open} 
        onCancel={onClose} 
        footer={null} 
        width={800} // Set the desired width here
      >
        <ListingTable data={data} loading={data.length === 0} />
      </Modal>
    );
  };

export default FilteredDataModal;
