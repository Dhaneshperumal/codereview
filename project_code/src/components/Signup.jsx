import { Button, Container, Grid, MenuItem, Paper, Select, TextField, FormControl, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value.length < 8) {
      setConfirmPasswordError('Password must be at least 8 characters');
    } else if (e.target.value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password && confirmPassword && !Boolean(emailError) && !Boolean(passwordError) && !Boolean(confirmPasswordError)) {
      try {
        const response = await axios.post('http://localhost:8080/api/users/register', {
          email,
          password,
          role,
        });
        console.log(response.data);
        
        alert('Signup Successfully');
        navigate('/login');
      } catch (error) {
        alert('Signup failed. Please try again.');
        console.error('Signup error:', error);
      }
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <>
    <Container maxWidth="xs">
      <Paper className="paper p-2" elevation={3}>
        <img src="./Code_review logo.png" alt="Code Review Logo" style={{ display: 'block', margin: '10px auto' }} />
        <form onSubmit={handleSubmit}>
          <TextField
            className="email mb-3"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            error={Boolean(emailError)}
            helperText={emailError}
          />
          <FormControl fullWidth className='mb-3'>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              value={role}
              label="Role"
              onChange={handleRoleChange}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Senior Developer">Senior Developer</MenuItem>
              <MenuItem value="Junior Developer">Junior Developer</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className="password mb-3"
            label="Password"
            variant="outlined"
            type='password'
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
          />
          <TextField
            className="confirmpassword mb-3"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type='password'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={Boolean(confirmPasswordError)}
            helperText={confirmPasswordError}
          />
          <Button className="loginButton" variant="contained" color="primary" type="submit" fullWidth>
            Signup
          </Button>
        </form>
      </Paper>
    </Container>
    </>
  );
};

export default Signup;