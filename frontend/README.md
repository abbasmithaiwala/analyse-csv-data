# CSV Data Analyzer Frontend

This is the frontend application for the CSV Data Analyzer project. It allows users to upload, analyze CSV data and generate PDF reports.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Material UI
- React Router
- Papa Parse (CSV parsing)

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

## Deployment on Vercel

This frontend is designed to be deployed on Vercel:

1. Push your code to a Git repository
2. Connect your Vercel account to your repository
3. Set up environment variables in the Vercel dashboard
4. Deploy!

## Environment Variables

- `VITE_API_URL`: The URL of the backend API (required)

## Connecting to the Server

The frontend connects to the server API to generate PDF reports. Make sure to set the correct URL in the `.env.production` file when deploying. 