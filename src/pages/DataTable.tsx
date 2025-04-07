import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { DynamicTable } from '../components/DynamicTable';

const DataTable: React.FC = () => {
  const navigate = useNavigate();
  const csvData = JSON.parse(localStorage.getItem('csvData') || '[]');

  if (!csvData.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl mb-4">No data available</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/upload')}
        >
          Upload CSV
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="mb-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/upload')}
        >
          Upload New CSV
        </Button>
      </div>
      <DynamicTable data={csvData} />
    </div>
  );
};

export default DataTable; 