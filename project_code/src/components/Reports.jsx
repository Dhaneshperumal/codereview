import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Container, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography 
} from '@mui/material';
import axios from 'axios';
import AsideBar from './Asidebar';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reports', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setReports(response.data);
      } catch (error) {
        setError('Failed to fetch reports.');
        console.error('Reports fetch error:', error);
      }
    };
    fetchReports();
  }, []);

  if (error) {
    return (
      <Container maxWidth="lg">
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <>
    <AsideBar/>
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Code Review Reports
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="reports table">
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell align="right">Report Date</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.project?.name || 'N/A'}</TableCell>
                  <TableCell align="right">
                    {new Date(report.generationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">{report.status}</TableCell>
                  <TableCell align="right">
                    <Button 
                      variant="contained" 
                      color="primary" 
                      sx={{ mr: 1 }}
                      onClick={() => window.open(`http://localhost:8080/api/reports/${report.id}/download-pdf`)}
                    >
                      Download PDF
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => window.open(`http://localhost:8080/api/reports/${report.id}/download-excel`)}
                    >
                      Download Excel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
    </>
  );
};

export default Reports;