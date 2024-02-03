import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';

const ManageOrders = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/purchase/all');
        setPurchases(response.data);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, []);

  const handleUpdateStatus = async (purchaseId, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/api/purchase/update-status/${purchaseId}`, {
        purchaseId,
        newStatus,
      });

      // Update the local state after successful status update
      setPurchases((prevPurchases) =>
        prevPurchases.map((purchase) =>
          purchase._id === purchaseId ? { ...purchase, status: newStatus } : purchase
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'customerId.username', headerName: 'Customer', width: 200 },
    { field: 'productCode', headerName: 'Product Code', width: 200 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    { field: 'color', headerName: 'Color', width: 150 },
    { field: 'size', headerName: 'Size', width: 150 },
    { field: 'totalAmount', headerName: 'Total Amount', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          {params.row.status === 'Pending' && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdateStatus(params.row._id, 'Processing')}
            >
              Prepare
            </Button>
          )}
          {params.row.status === 'Processing' && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdateStatus(params.row._id, 'Dispatched')}
            >
              Dispatch
            </Button>
          )}
          {params.row.status === 'Dispatched' && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdateStatus(params.row._id, 'Arrival')}
            >
              Arrival
            </Button>
          )}
          {params.row.status === 'Arrival' && (
            <Button
              variant="contained"
              color="primary"
              style={{backgroundColor:'green'}}
              onClick={() => handleUpdateStatus(params.row._id, 'Completed')}
            >
              Completed
            </Button>
          )}
          {/* Add more buttons for other status transitions */}
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={purchases}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        getRowId={(row) => row._id} // Specify the custom id property
      />
    </div>
  );
};

export default ManageOrders;
