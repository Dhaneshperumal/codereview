import React from 'react';
import { Card, CardHeader, CardBody } from 'react-bootstrap';
import { FileCode, GitPullRequest, Bug } from 'lucide-react';
import Header from './Header';
import AsideBar from './Asidebar';

const JuniorDevDashboard = () => {
  return (
    <div className='d-flex'>
      <AsideBar />
      <div className="p-4">
        <h1 className="h2 font-weight-bold">Junior Developer Dashboard</h1>
        <div className="row g-4">
          <div className="col-md-6">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center pb-2">
                <h6 className="mb-0">Pending Reviews</h6>
                <GitPullRequest className="h-4 w-4 text-muted" />
              </CardHeader>
              <CardBody>
                <div className="h2 font-weight-bold">3</div>
              </CardBody>
            </Card>
          </div>
          <div className="col-md-6">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center pb-2">
                <h6 className="mb-0">Issues Found</h6>
                <Bug className="h-4 w-4 text-muted" />
              </CardHeader>
              <CardBody>
                <div className="h2 font-weight-bold">12</div>
              </CardBody>
            </Card>
          </div>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <h6 className="mb-0">Recent Uploads</h6>
          </CardHeader>
          <CardBody>
            <div className="mb-3">
              {['Project A', 'Project B', 'Project C'].map((project) => (
                <div key={project} className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <FileCode className="h-4 w-4 me-2" />
                    <span>{project}</span>
                  </div>
                  <span className="text-muted">2 days ago</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default JuniorDevDashboard;
