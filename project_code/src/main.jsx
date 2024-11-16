import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
 // Ensure you have an App component in the src directory

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

// Create root
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
