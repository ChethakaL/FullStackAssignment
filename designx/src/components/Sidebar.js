// Sidebar.js
import React from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useNavigate } from 'react-router-dom';

function Sidebar({ height }) {
  const navigate = useNavigate();

  const handleItemClick = (category) => {
    // Redirect to the result page with the selected category
    navigate(`/result/${category}`);
  };

  return (
    <div style={{ display: 'flex', height: { height }, minHeight: '400px' }}>
      <ProSidebar>
        <h2 style={{ padding: '20px' }}>Filter</h2>
        <Menu iconShape="square">
          <MenuItem onClick={() => handleItemClick('T-Shirt')}>T-Shirt</MenuItem>
          <MenuItem onClick={() => handleItemClick('Shirt')}>Shirt</MenuItem>
          <MenuItem onClick={() => handleItemClick('Dress')}>Dresses</MenuItem>
          <MenuItem onClick={() => handleItemClick('Crop')}>Crop Tops</MenuItem>
          <MenuItem onClick={() => handleItemClick('Trouser')}>Trousers</MenuItem>
          <MenuItem onClick={() => handleItemClick('Skirt')}>Skirt</MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
}

export default Sidebar;
