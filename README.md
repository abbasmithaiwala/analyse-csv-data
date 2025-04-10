# CSV Data Analyzer

A web application for analyzing and visualizing CSV data.

## Project Structure

```
/
|-- frontend/         # React frontend for Vercel deployment
|-- server/           # Express backend for Fly.io deployment
|-- typst/            # Typst templates for document generation
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or newer)
- npm or pnpm

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file based on `.env.example`
   - For development: `VITE_API_URL=http://localhost:8080`
   - For production: Make sure `.env.production` has the correct API URL

4. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## Deployment

### Frontend (Vercel)

The frontend is configured for deployment on Vercel:

1. Push your code to a Git repository
2. Connect your Vercel account to your repository
3. Set up environment variables in the Vercel dashboard
4. Deploy!

### Backend (Fly.io)

The backend is configured for deployment on Fly.io:

1. Install the Fly CLI: [https://fly.io/docs/hands-on/install-flyctl/](https://fly.io/docs/hands-on/install-flyctl/)
2. Login to Fly: `fly auth login`
3. Navigate to the server directory: `cd server`
4. Deploy the application: `fly launch` (for first-time setup)
5. For subsequent updates: `fly deploy`

## Typst Templates

The `typst/` directory contains templates for generating PDF documents:

- Edit the template files in the `typst/` directory
- The server uses these templates to generate PDFs for data reports
