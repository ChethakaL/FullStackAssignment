import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAdminToken } from '../../utils/auth';
function Dashboard() {
    const navigate = useNavigate();
    
    const isAdminAuthenticated = () => {
        const adminToken = getAdminToken();
        console.log(adminToken);
        return !!adminToken;
      };
    // Function to check if an admin token is present
    useEffect(() => {
        // Check if the admin is authenticated, if not, redirect to login
        if (!isAdminAuthenticated()) {
          navigate('/login');
        }
      }, [navigate]);
    
      if (!isAdminAuthenticated()) {
        // This will be rendered briefly before the redirect happens
        return <div style={{ color: 'white' }}>Redirecting...</div>;
        
      }
  return (
    <div>
        <h1>Dashboard</h1>
        <div className='dash-row'>
            <div className='dash-container'>
                <div className='row'>
                    <h1>Products</h1>
                    <h1>00</h1>
                </div>
                <div className='row'>
                    <button>Add +</button>
                    <button>Delete -</button>
                    <button>Update 🔄</button>
                </div>
            </div>
            <div className='dash-container'>
                <div className='row'>
                    <h1>Orders</h1>
                    <h1>00</h1>
                </div>
            </div>
        </div>
        <div className='dash-row'>
            <div className='dash-container'>
            <div className='row'>
                    <h1>Payments</h1>
                </div>
            </div>
            <div className='dash-container'>

            <div className='row'>
                    <h1>Reviews</h1>
                    <h1>00</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard