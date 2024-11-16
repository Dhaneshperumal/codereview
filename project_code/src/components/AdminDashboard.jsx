import React from 'react';
import { Users, FileCode, CheckCircle, AlertCircle, User } from 'lucide-react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import AsideBar from './Asidebar';

const AdminDashboard = () => {
  return (
    <div className="d-flex">
      <AsideBar />
      <div className="flex-grow-1 p-4">
        <h1 className="display-6 fw-bold">Admin Dashboard</h1>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          <div className="col">
            <Card>
              <CardHeader className="d-flex justify-content-between pb-2">
                <Typography variant="h6">Total Users</Typography>
                <Users className="text-muted" />
              </CardHeader>
              <CardContent>
                <div className="fs-2 fw-bold">45</div>
              </CardContent>
            </Card>
          </div>
          <div className="col">
            <Card>
              <CardHeader className="d-flex justify-content-between pb-2">
                <Typography variant="h6">Active Projects</Typography>
                <FileCode className="text-muted" />
              </CardHeader>
              <CardContent>
                <div className="fs-2 fw-bold">12</div>
              </CardContent>
            </Card>
          </div>
          <div className="col">
            <Card>
              <CardHeader className="d-flex justify-content-between pb-2">
                <Typography variant="h6">Reviews Today</Typography>
                <CheckCircle className="text-muted" />
              </CardHeader>
              <CardContent>
                <div className="fs-2 fw-bold">8</div>
              </CardContent>
            </Card>
          </div>
          <div className="col">
            <Card>
              <CardHeader className="d-flex justify-content-between pb-2">
                <Typography variant="h6">Critical Issues</Typography>
                <AlertCircle className="text-muted" />
              </CardHeader>
              <CardContent>
                <div className="fs-2 fw-bold">3</div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
          <div className="col">
            <Card>
              <CardHeader>
                <Typography variant="h6">Recent Users</Typography>
              </CardHeader>
              <CardContent>
                <div className="list-group">
                  {[
                    { name: 'John Doe', role: 'Senior Developer' },
                    { name: 'Jane Smith', role: 'Junior Developer' },
                    { name: 'Bob Johnson', role: 'Senior Developer' },
                  ].map((user) => (
                    <div key={user.name} className="d-flex justify-content-between list-group-item">
                      <div className="d-flex align-items-center">
                        <User className="me-2" />
                        <span>{user.name}</span>
                      </div>
                      <span className="text-muted">{user.role}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col">
            <Card>
              <CardHeader>
                <Typography variant="h6">System Status</Typography>
              </CardHeader>
              <CardContent>
                <div className="list-group">
                  <div className="d-flex justify-content-between list-group-item">
                    <span>API Status</span>
                    <span className="text-success">Operational</span>
                  </div>
                  <div className="d-flex justify-content-between list-group-item">
                    <span>Database Status</span>
                    <span className="text-success">Operational</span>
                  </div>
                  <div className="d-flex justify-content-between list-group-item">
                    <span>Review Queue</span>
                    <span className="text-warning">High Load</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
