import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" color="error" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="body1" paragraph>
        You do not have the necessary permissions to view this page.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleBackToLogin}>
        Back to Login
      </Button>
    </Container>
  );
};

export default Unauthorized;
