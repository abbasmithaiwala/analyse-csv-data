/**
 * API service for interacting with the backend
 */

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Interface for CSV data structure
 */
export interface CsvData {
  headers: string[];
  rows: (string | number | null | undefined)[][];
}

/**
 * Generate a PDF from CSV data
 * @param data The CSV data to generate a PDF from
 * @returns A Blob containing the PDF data
 */
export const generatePdf = async (data: CsvData): Promise<Blob> => {
  try {
    const response = await fetch(`${API_URL}/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate PDF');
    }

    return await response.blob();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

/**
 * Check if the API server is healthy
 * @returns True if the server is healthy, false otherwise
 */
export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('Error checking server health:', error);
    return false;
  }
}; 