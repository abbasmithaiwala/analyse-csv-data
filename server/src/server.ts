import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { typstService, CsvData } from './services/typstService.js';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Enable CORS for frontend requests
app.use(cors({
  origin: '*',
  methods: '*',
  allowedHeaders: '*'
}));

app.use(express.json());

app.post('/generate-pdf', async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    console.log('Received request with data:', JSON.stringify(data, null, 2));

    // Initialize empty content
    let content = '';
    
    // If data is provided, generate template
    if (data && data.headers && data.rows) {
      try {
        content = typstService.generateTemplate(data as CsvData);
        console.log('Created new template. Content length:', content.length);
      } catch (dataError) {
        console.error('Error processing data for template:', dataError);
        res.status(500).json({ error: 'Error processing data for template', details: String(dataError) });
        return;
      }
    } else {
      console.log('No data provided');
    }

    try {
      // Generate PDF
      const pdfBuffer = await typstService.generatePdf(content);

      // Send PDF as response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=report.pdf`);
      res.send(pdfBuffer);
    } catch (typstError) {
      console.error('Typst error:', typstError);
      
      res.status(500).json({ 
        error: 'Failed to generate PDF', 
        details: String(typstError),
        message: 'Error occurred during PDF generation. Check server logs.'
      });
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ 
      error: 'Failed to generate PDF', 
      details: String(error),
      message: 'Unexpected error occurred. Check server logs.'
    });
  }
});

// Health check endpoint for Fly.io
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 