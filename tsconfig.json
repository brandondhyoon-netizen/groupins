import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/consultation', (req, res) => {
    const { companyName, CEO, employeeCount, contact } = req.body;
    console.log('--- New Consultation Request ---');
    console.log(`Company: ${companyName}`);
    console.log(`CEO: ${CEO}`);
    console.log(`Employees: ${employeeCount}`);
    console.log(`Contact: ${contact}`);
    
    // In a real app, this would go to a database or CRM.
    // For now, we simulate success.
    res.status(200).json({ success: true, message: 'Consultation request saved to server.' });
  });

  app.post('/api/proposal', (req, res) => {
    const { type } = req.body; // e.g., 'general' or specific solution
    console.log('--- New Proposal Download Request ---');
    console.log(`Type: ${type}`);
    
    res.status(200).json({ success: true, message: 'Proposal request saved to server.' });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
