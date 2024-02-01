import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Truck } from 'react-feather'
import { useNavigate } from 'react-router-dom'
function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
        // Redirect to login if no token
        navigate('/customer-login');
        } else {
        // Fetch user data if token exists
        fetchUserProfile();
        }
    }, []);

    useEffect(() => {
        // Fetch purchases whenever the user state changes
        if (user) {
          fetchPurchaseOrders();
        }
      }, [user]);

    const fetchUserProfile = async () => {
        try {
        const response = await axios.get('http://localhost:4000/api/customer/profile', {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        setUser(response.data);
        fetchPurchaseOrders();
        } catch (error) {
        console.error('Error fetching user profile:', error.message);
        // Redirect to login on error
        navigate('/customer-login');
        }
    };

    const fetchPurchaseOrders = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/purchase/user-purchases/${user.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
      
          setPurchases(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching purchase orders:', error.message);
        }
      };
      


      const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        // Navigate to the home page
        navigate('/');
      };

      
  return (
    <div>
        <h1 className='heading-text'>Profile</h1>
        <div className='add-container' style={{display:'flex', flexDirection:'column'}}>
            <div className='form-container' style={{marginBottom:20}}>
                <form className='ui form'>
                    <h2 className='ui dividing header'>User Details</h2>
                    <div class="field">
                        <div className='four fields'>
                            <div className='two wide field'>
                                <label>User ID: </label>
                                <div className='field'>
                                    <input type='text' name='userId' value={user?.userId || ''} />
                                </div>
                            </div>
                            <div className='four wide field'>
                                <label>First Name: </label>
                                <div className='field'>
                                    <input type='text' name='fname' value={user?.fname || ''} />
                                </div>
                            </div>
                            <div className='four wide field'>
                                <label>Last Name: </label>
                                <div className='field'>
                                    <input type='text' name='lname' value={user?.lname || ''} />
                                </div>
                            </div>
                            <div className='four wide field'>
                                <label>Email: </label>
                                <div className='field'>
                                    <input type='text' name='email' value={user?.email || ''} />
                                </div>
                            </div>
                        </div>
                        <div className='three fields'>
                            <div className='seven wide field'>
                                <label>Address: </label>
                                <div className='field'>
                                    <input type='text' name='address' value={user?.address || ''} />
                                </div>
                            </div>
                            <div className='three wide field'>
                                <label>Phone: </label>
                                <div className='field'>
                                    <input type='text' name='phone' value={user?.phone || ''} />
                                </div>
                            </div>
                            <div className='three wide field'>
                                <label>Date Of Birth: </label>
                                <div className='field'>
                                    <input type='date' name='dob' value={user?.dob || ''} />
                                </div>
                            </div>
                        </div>
                        <div className='two fields'>
                            <div className='three wide field'>
                                <label>Username</label>
                                <div className='field'>
                                    <input type='text' name='username' value={user?.username || ''}/>
                                </div>
                            </div>
                            <div className='three wide field'>
                                <label>password</label>
                                <div className='field'>
                                    <input type='password' name='password' value={user?.password || ''}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="ui secondary button">
                      Update
                    </button>
                    <button class="ui primary button" onClick={handleLogout}>
                      Logout
                    </button>
                </form>
            </div>
            {/* Managing Orders */}
            <div className='form-container'>
                <h2 className='heading-text' style={{fontSize:25}}>Managing Orders</h2>
                {purchases.map((purchase) => (
                    <div key={purchase._id} className='order-item' style={{marginBottom:'10px'}}>
                        <div className='order-sec-one'>
                        <div className='circle'>
                            <Truck size={32} />
                        </div>
                        <div className='order-info'>
                            <h4>{purchase.productName}</h4>
                            <p>Order Id: {purchase._id}</p>
                            <p>Price: {purchase.totalAmount}</p>
                        </div>
                        </div>
                        <div className=''><h2 style={{ margin: 0, padding: 0, fontWeight: 50 }}>{purchase.status}</h2></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Profile