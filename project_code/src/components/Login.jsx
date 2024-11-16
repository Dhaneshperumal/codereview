import { Button, Container, Grid, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Header from './Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState(''); 
  const navigate = useNavigate();

  // Email validation with regex
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(!validateEmail(e.target.value) ? 'Please enter a valid email' : '');
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(e.target.value.length < 8 ? 'Password must be at least 8 characters' : '');
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(''); 
  
    if (email && password && !emailError && !passwordError) {
      try {
        const response = await axios.post('http://localhost:8080/api/users/login', { email, password });
        const token = response.data.token;
        
        // Store token in local storage
        localStorage.setItem('token', token);

        // Decode role from token
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userRole = decodedToken.role;

        // Redirect based on user role
        switch (userRole) {
          case 'Admin':
            navigate('/admin');
            break;
          case 'Senior Developer':
            navigate('/senior');
            break;
          case 'Junior Developer':
            navigate('/junior');
            break;
          default:
            navigate('/unauthorized');
        }
      } catch (error) {
        setLoginError(error.response && error.response.status === 401 ? 'Invalid credentials, please try again.' : 'An error occurred. Please try again later.');
      }
    } else {
      setLoginError('Please fill in all fields correctly.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper className='paper' elevation={3} style={{ padding: '20px' }}>
        <img src='./Code_review logo.png' alt='logo' style={{ display: 'block', margin: '10px auto' }} />
        
        <form onSubmit={handleSubmit}>
          <TextField
            label='Email'
            variant='outlined'
            fullWidth
            value={email}
            onChange={handleEmailChange}
            error={Boolean(emailError)}
            helperText={emailError}
            margin='normal'
          />
          <TextField
            label='Password'
            variant='outlined'
            fullWidth
            type='password'
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
            margin='normal'
          />
          
          {loginError && (
            <p style={{ color: 'red', marginTop: '10px' }}>{loginError}</p>
          )}

          <Button
            variant='contained'
            color='primary'
            type='submit'
            fullWidth
            style={{ marginTop: '10px' }}
          >
            Login
          </Button>
        </form>

        <Grid container justifyContent='center' style={{ marginTop: '10px' }}>
          <Link to='/signup' style={{ textDecoration: 'none', color: '#3f51b5' }}>
            Don't have an account? Sign up
          </Link>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
