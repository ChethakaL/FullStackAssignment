// components/ReviewTable.js
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from your API endpoint
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/review/all');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Product Code</TableCell>
            <TableCell>Review</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((review) => (
              <TableRow key={review._id}>
                <TableCell>{review.username}</TableCell>
                <TableCell>{review.productCode}</TableCell>
                <TableCell>{review.review}</TableCell>
                <TableCell>{review.rating}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No reviews available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReviewTable;
