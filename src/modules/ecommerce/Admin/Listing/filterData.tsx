import React from 'react';
import { Modal } from 'antd';
import ListingTable from '../ListingTable'; // Adjust the import path based on your structure

// interface FilteredDataModalProps {
//   open: boolean;
//   onClose: () => void;
//   data: Product[];
// }

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
