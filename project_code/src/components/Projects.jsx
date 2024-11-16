import React from 'react';
import AsideBar from './AsideBar'; // Assuming AsideBar is your navigation/sidebar component
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

const projectData = [
  {
    id: 1,
    name: 'Project A',
    uploadDate: '2024-11-10',
    uploadTime: '10:00 AM',
    uploader: 'John Doe',
  },
  {
    id: 2,
    name: 'Project B',
    uploadDate: '2024-11-12',
    uploadTime: '2:30 PM',
    uploader: 'Jane Smith',
  },
  {
    id: 3,
    name: 'Project C',
    uploadDate: '2024-11-14',
    uploadTime: '4:45 PM',
    uploader: 'Alice Brown',
  },
];

const Projects = () => {
  return (
    <div className="d-flex" style={{ backgroundColor: '#f4f4f4', height: '100vh' }}>
      <AsideBar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Projects
        </Typography>
        <Grid container spacing={3}>
          {projectData.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card style={{ borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <CardContent>
                  <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                    {project.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Upload Date:</strong> {project.uploadDate}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Upload Time:</strong> {project.uploadTime}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Uploaded By:</strong> {project.uploader}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginTop: '10px' }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Projects;
