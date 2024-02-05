import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from './apiService'

function Login() {
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
            const result = await loginUser(username, password);
            console.log('Login Result:', result);

            if (result.token) {
                // Assuming you have a function setAdminToken to save the admin token
                setAdminToken(result.token);
                navigate('/admin');
            } else {
                console.log(username, password);
                console.log('Authentication failed');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    // Assuming you have a function to save the admin token
    const setAdminToken = (token) => {
        // Implement your logic to save the admin token (e.g., in localStorage)
        localStorage.setItem('adminToken', token);
    };

  return (
    <div className='login-container'>
        <div className='glass-container'>
            <div className='row' style={{width:'100%', justifyContent:'space-between', alignItems:'center', marginBottom:'3%'}}>
                <h1 style={{margin:0, padding:0}}>Admin Panel</h1>
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
        </div>   
    </div>
  )
}

export default Login