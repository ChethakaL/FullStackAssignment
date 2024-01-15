// components/PurchaseTable.js
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PurchaseTable = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Fetch purchases from your API endpoint
    const fetchPurchases = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/purchase/all');
        const data = await response.json();
        setPurchases(data);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer ID</TableCell>
            <TableCell>Product Code</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Transaction ID</TableCell>
            {/* <TableCell>Time Stamp</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(purchases) && purchases.length > 0 ? (
            purchases.map((purchase) => (
              <TableRow key={purchase._id}>
                <TableCell>{purchase.customerId.userId || ''}</TableCell>
                <TableCell>{purchase.productCode}</TableCell>
                <TableCell>{purchase.quantity}</TableCell>
                <TableCell>{purchase.color}</TableCell>
                <TableCell>{purchase.size}</TableCell>
                <TableCell>{purchase.totalAmount}</TableCell>
                <TableCell>{purchase.status}</TableCell>
                <TableCell>{purchase.transactionId}</TableCell>
                {/* <TableCell>{purchase.createdAt}</TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No purchases available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PurchaseTable;
