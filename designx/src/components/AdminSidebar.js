import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';

function AdminSidebar( height) {
  return (
    <div style={{ display: 'flex', height: {height}, minHeight: '100vh' }}>
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem><Link to="/admin">Dashboard</Link></MenuItem>
          <SubMenu title="Products" icon={<span>🧥</span>}>
            <MenuItem><Link to="/admin/add-product">Add Products</Link></MenuItem>
            <MenuItem><Link to="/admin/update-product">Update Products</Link></MenuItem>
          </SubMenu>
          <MenuItem><Link to="/admin/purchase">Purchases</Link></MenuItem>
          <MenuItem><Link to="/admin/manage">Manage Order</Link></MenuItem>
          <MenuItem><Link to="/admin/review">Review</Link></MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  )
}

export default AdminSidebar