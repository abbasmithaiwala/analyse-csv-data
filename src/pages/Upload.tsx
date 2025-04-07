import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import Papa from 'papaparse';

const Upload: React.FC = () => {
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          // Store the parsed data in localStorage
          localStorage.setItem('csvData', JSON.stringify(results.data));
          navigate('/dataTable');
        },
        header: true,
      });
    }
  }, [navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Box
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <Typography variant="h6" className="mb-4">
          {isDragActive
            ? 'Drop the CSV file here'
            : 'Drag and drop a CSV file here, or click to select'}
        </Typography>
        <Button variant="contained" color="primary">
          Select File
        </Button>
      </Box>
    </div>
  );
};

export default Upload; 