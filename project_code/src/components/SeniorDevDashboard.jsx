import React from 'react';
import { Card } from 'react-bootstrap';
import { FileCode, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import Header from './Header';
import AsideBar from './Asidebar';

const SeniorDevDashboard = () => {
  return (
    <div className='d-flex'>
      <AsideBar />
      <div className="p-4">
        <h1 className="h2 font-weight-bold">Senior Developer Dashboard</h1>
        <div className="row g-4">
          <div className="col-md-4">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Pending Reviews</h6>
                <FileText className="h-4 w-4 text-muted" />
              </Card.Header>
              <Card.Body>
                <div className="h2 font-weight-bold">8</div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Completed Reviews</h6>
                <CheckCircle className="h-4 w-4 text-muted" />
              </Card.Header>
              <Card.Body>
                <div className="h2 font-weight-bold">24</div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Critical Issues</h6>
                <AlertCircle className="h-4 w-4 text-muted" />
              </Card.Header>
              <Card.Body>
                <div className="h2 font-weight-bold">5</div>
              </Card.Body>
            </Card>
          </div>
        </div>
        <Card className="mt-4">
          <Card.Header>
            <h6 className="mb-0">Review Queue</h6>
          </Card.Header>
          <Card.Body>
            <div>
              {[
                { project: 'Project X', developer: 'John Doe' },
                { project: 'Project Y', developer: 'Jane Smith' },
                { project: 'Project Z', developer: 'Bob Johnson' }
              ].map((item) => (
                <div key={item.project} className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <FileCode className="h-4 w-4 me-2" />
                    <span>{item.project}</span>
                  </div>
                  <span className="text-muted">{item.developer}</span>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SeniorDevDashboard;
