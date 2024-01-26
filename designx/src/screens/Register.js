import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
function CustomerLogin() {
    const navigate = useNavigate();
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDateOfBirth] = useState('');
    const [userID, setUserID] = useState('');

    const handleFirstNameChange = (e) => {
        setFName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLName(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleDateOfBirthChange = (e) => {
        setDateOfBirth(e.target.value);
    };

    const handleUserIDChange = (e) => {
        setUserID(e.target.value);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        // Add logic to send registration data to the server using axios
        try {
          // Make a POST request to your registration endpoint with the user data
          const response = await axios.post('http://localhost:4000/api/customer', {
            userId: userID, // Update to userId
            fname,
            lname,
            username,
            password,
            email,
            phone,
            address,
            dob,
          });
      
          // Handle the response accordingly, e.g., redirect to login page on successful registration
          console.log(response.data);
          navigate('/customer-login'); // Redirect to the login page
        } catch (error) {
          // Handle registration error
          console.error('Registration failed:', error);
        }
      };
      


  return (
    <div className='login-container'>
        <div className='glass-container' style={{height:'90%',}}>
            <div className='row' style={{width:'100%', justifyContent:'space-between', alignItems:'center', marginBottom:'3%'}}>
                <h1 style={{margin:0, padding:0}}>Register</h1>
                <img src='../assets/Logo.png' width='100px' height='30px'/>
            </div>
            <form className='ui form' style={{marginTop: '10px'}}>
                <div className='one field'>
                    <label>first Name</label>
                    <div className='field'>
                        <input type='text' value={fname} onChange={handleFirstNameChange} style={{width:'400px'}}/>
                    </div>
                </div>
                <div className='one field'>
                    <label>Last Name</label>
                    <div className='field'>
                        <input type='text' value={lname} onChange={handleLastNameChange} style={{width:'400px'}}/>
                    </div>
                </div>
                <div className='one field'>
                    <label>Username</label>
                    <div className='field'>
                        <input type='text' value={username} onChange={handleUsernameChange} style={{width:'400px'}}/>
                    </div>
                </div>
                <div className='one field'>
                    <label>Password</label>
                    <div className='field'>
                        <input type='password' value={password} onChange={handlePasswordChange} style={{width:'400px'}}/>
                    </div>
                </div>
                <div className='one field'>
                    <label>Email</label>
                    <div className='field'>
                        <input type='text' value={email} onChange={handleEmailChange} style={{width:'400px'}}/>
                    </div>
                </div>
                <div className='one field'>
                    <label>Phone</label>
                    <div className='field'>
                        <input type='text' value={phone} onChange={handlePhoneChange} style={{width:'400px'}}/>
                    </div>
                </div>
                <div className='one field'>
                    <label>Address</label>
                    <div className='field'>
                        <input type='text' value={address} onChange={handleAddressChange} style={{width:'400px'}}/>
                    </div>
                </div>
                <div className='one field'>
                    <label>Date of Birth</label>
                    <div className='field'>
                        <input type='date' value={dob} onChange={handleDateOfBirthChange} style={{width:'400px'}}/>
                    </div>
                </div>
                <div className='one field'>
                    <label>UserID</label>
                    <div className='field'>
                        <input type='text' value={userID} onChange={handleUserIDChange} style={{width:'400px'}}/>
                    </div>
                </div>
                <button class="ui secondary button" onClick={handleRegister} style={{justifyContent:'center', width: '400px'}}>Register</button>
            </form>
        </div>   
    </div>
  )
}

export default CustomerLogin