import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">CSV Data Analysis Tool</h1>
      <div className="flex gap-4">
        <Link to="/upload">
          <Button variant="contained" color="primary">
            Upload CSV
          </Button>
        </Link>
        <Link to="/dataTable">
          <Button variant="contained" color="secondary">
            View Data Table
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home; 