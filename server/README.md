# CSV Data Analyzer Server

This is the backend API server for the CSV Data Analyzer project. It provides endpoints for generating PDF reports from CSV data.

## Technologies Used

- Node.js
- Express
- TypeScript
- Typst.ts (for PDF generation)

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   
3. The server will be available at http://localhost:3001

## API Endpoints

- `POST /generate-pdf`: Generate a PDF report from CSV data
- `GET /health`: Health check endpoint (used by Fly.io)

## Deployment on Fly.io

This server is designed to be deployed on Fly.io:

1. Install the Fly CLI: [https://fly.io/docs/hands-on/install-flyctl/](https://fly.io/docs/hands-on/install-flyctl/)

2. Login to Fly:
   ```bash
   fly auth login
   ```

3. Deploy the application:
   ```bash
   fly launch
   ```
   
4. Deploy subsequent updates:
   ```bash
   fly deploy
   ```

## Environment Variables

- `PORT`: The port to run the server on (default: 3001)
- `NODE_ENV`: The environment to run the server in (development, production)

## Connecting to the Frontend

The server is designed to be used with the CSV Data Analyzer Frontend. It handles CORS to allow requests from the frontend when deployed. 