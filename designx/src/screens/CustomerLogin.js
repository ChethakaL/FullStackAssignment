import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
function CustomerLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
      };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

    // Update the handleLogin function
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/customer/login', {
                username,
                password,
            });
    
            if (response.data.token) {
                // Save the token in localStorage or a state management solution (like Redux)
                localStorage.setItem('token', response.data.token);
                navigate('/');
            } else {
                console.log('Authentication failed');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    const handleRegister = () => {
        navigate("/customer-register");
    }

  return (
    <div className='login-container'>
        <div className='glass-container'>
            <div className='row' style={{width:'100%', justifyContent:'space-between', alignItems:'center', marginBottom:'3%'}}>
                <h1 style={{margin:0, padding:0}}>Login Page</h1>
                <img src='../assets/Logo.png' width='100px' height='30px'/>
            </div>
            <img src='https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=826&t=st=1704448559~exp=1704449159~hmac=692c016000f5b44f4fe7781c9153ef2bd339649cb93e9592d3a49b352fa2d1f7' width='300px' style={{borderRadius:20}}/>
            <form className='ui form' style={{marginTop: '10px'}}>
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
                <button class="ui secondary button" onClick={handleLogin} style={{justifyContent:'center', width: '400px'}}>Login</button>
            </form>
            <button class="ui primary button" onClick={handleRegister} style={{justifyContent:'center', width: '400px', marginTop:'10px'}}>Register</button>
        </div>   
    </div>
  )
}

export default CustomerLogin