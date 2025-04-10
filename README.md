# CSV Data Analyzer - Migration Guide

This project has been restructured to separate the frontend and backend for deployment on Vercel and Fly.io respectively.

## New Project Structure

```
/
|-- frontend/         # React frontend for Vercel deployment
|-- server-updated/   # Express backend for Fly.io deployment
```

## Migration Steps

1. Move frontend source files:
   ```bash
   # Copy src files to the frontend/src directory
   cp -r src/* frontend/src/
   
   # Copy public files
   cp -r public/* frontend/public/
   ```

2. Copy typst files to the server:
   ```bash
   # Create typst directory in server
   mkdir -p server-updated/typst
   
   # Copy typst files
   cp -r typst/* server-updated/typst/
   ```

3. Install dependencies in both projects:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install server dependencies
   cd ../server-updated
   npm install
   ```

4. Update API URL in frontend:
   - For development: Set `VITE_API_URL=http://localhost:3001` in `.env.local`
   - For production: Set `VITE_API_URL=https://your-fly-app.fly.dev` in `.env.production`

5. Deploy both applications:
   - Deploy the frontend to Vercel
   - Deploy the server to Fly.io

## Deployment Instructions

### Frontend (Vercel)

1. Push your code to a Git repository
2. Connect your Vercel account to your repository
3. Set up environment variables in the Vercel dashboard
4. Deploy!

### Backend (Fly.io)

1. Install the Fly CLI: [https://fly.io/docs/hands-on/install-flyctl/](https://fly.io/docs/hands-on/install-flyctl/)
2. Login to Fly: `fly auth login`
3. Deploy the application: `fly launch`
4. For subsequent updates: `fly deploy`
