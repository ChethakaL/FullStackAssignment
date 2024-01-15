import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Review({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');

  const fetchProductReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/review/product/${productId}`);
      console.log(productId);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching product reviews:', error);
    }
  };

  useEffect(() => {
    fetchProductReviews();
  }, [productId]);

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/review',
        {
          productCode: productId,
          review: reviewText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 201) {
        console.log('Review submitted successfully:', response.data);
        fetchProductReviews();
      } else {
        console.error('Error submitting review:', response.data.error);
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error scenarios
    }
  };

  return (
    <div className='review-container'>
      {reviews.map((review) => (
        <div key={review._id} className='review-item'>
          <div className='profile'>
            <div className='circle'></div>
            <div className='user-status' style={{textAlign:'left'}}>
              <p style={{ fontSize: 16, margin: 0, padding: 0 }}>{review.username}</p>
              <p style={{ fontSize: 10, padding:0 }}>Customer</p>
            </div>
          </div>
          <div style={{ width: '40%', color: 'white' }}>
            {review.review}
          </div>
        </div>
      ))}
      <form className='ui form' style={{ width: '100vh' }}>
        <div className='field'>
          <div className='four fields'>
            <div className="twelve wide field">
              <label>Write Your Review</label>
              <div className='field'>
                <input
                  type='text'
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="ui secondary button" onClick={handleReviewSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Review;
