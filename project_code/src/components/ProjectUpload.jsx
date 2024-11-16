import { Button, Container, Grid, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AsideBar from './Asidebar';

const ProjectUpload = () => {
  const [projectName, setProjectName] = useState('');
  const [projectFile, setProjectFile] = useState(null);
  const [gitRepositoryUrl, setGitRepositoryUrl] = useState('');
  const [uploadType, setUploadType] = useState('file'); // Default to file upload
  const [supplyId, setSupplyId] = useState(''); // Add state for supplyId
  const navigate = useNavigate();

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleFileChange = (e) => {
    setProjectFile(e.target.files[0]);
  };

  const handleGitRepositoryUrlChange = (e) => {
    setGitRepositoryUrl(e.target.value);
  };

  const handleUploadTypeChange = (e) => {
    setUploadType(e.target.value);
    // Clear previous input if the upload type changes
    if (e.target.value === 'file') {
      setProjectFile(null);
      setGitRepositoryUrl('');
    } else {
      setGitRepositoryUrl('');
      setProjectFile(null);
    }
  };

  const handleSupplyIdChange = (e) => {
    setSupplyId(e.target.value); // Add a function to handle supplyId changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectName && (projectFile || gitRepositoryUrl)) {
        try {
            const formData = new FormData();
            formData.append('name', projectName);
            formData.append('supplyId', supplyId); // Ensure supplyId is defined somewhere in your code

            if (uploadType === 'file' && projectFile) {
                formData.append('projectFile', projectFile);
            } else if (uploadType === 'git' && gitRepositoryUrl) {
                formData.append('gitRepositoryUrl', gitRepositoryUrl);
            } else {
                alert('Please select a valid upload method.');
                return;
            }

            const token = localStorage.getItem('token'); // Assuming your token is stored in localStorage
            console.log("Token:", token);
            // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Setting the Authorization header

            const response = await axios.post('http://localhost:8080/api/projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response.data);

            alert('Project Uploaded Successfully');
            navigate('/dashboard/junior-dashboard');
        } catch (error) {
            handleErrorResponse(error);
        }
    } else {
        alert('Please fill in all fields.');
    }
};


const handleErrorResponse = (error) => {
  if (error.response) {
    console.error('Error response:', error.response.data);
    alert(`Error: ${error.response.data.message || 'Request failed'}`);
  } else if (error.request) {
    console.error('No response received:', error.request);
    alert('Server is unreachable. Please try again later.');
  } else {
    console.error('Error setting up request:', error.message);
    alert(`Error: ${error.message}`);
  }
};

  return (
    <div className='d-flex'>
      <AsideBar />
      <Container maxWidth="md">
        <Paper className="paper" elevation={3}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Project Name"
                  variant="outlined"
                  fullWidth
                  value={projectName}
                  onChange={handleProjectNameChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="upload-type-label">Upload Type</InputLabel>
                  <Select
                    labelId="upload-type-label"
                    id="upload-type-select"
                    value={uploadType}
                    label="Upload Type"
                    onChange={handleUploadTypeChange}
                  >
                    <MenuItem value="file">Upload File</MenuItem>
                    <MenuItem value="git">Git Repository</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {uploadType === 'file' && (
                <Grid item xs={12}>
                  <input type="file" onChange={handleFileChange} />
                </Grid>
              )}
              {uploadType === 'git' && (
                <Grid item xs={12}>
                  <TextField
                    label="Git Repository URL"
                    variant="outlined"
                    fullWidth
                    value={gitRepositoryUrl}
                    onChange={handleGitRepositoryUrlChange}
                    required
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  label="Supply ID"
                  variant="outlined"
                  fullWidth
                  value={supplyId}
                  onChange={handleSupplyIdChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Upload
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default ProjectUpload;
