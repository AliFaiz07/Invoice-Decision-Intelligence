/**
 * Invoice Decision Intelligence — Enterprise Application Server
 * Runs on SAP BTP Cloud Foundry / Kyma / Local Node.js Runtime
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { InvoiceRepository } from './services/InvoiceRepository';
import { createApiRouter } from './app/routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static frontend assets (SAP Fiori Horizon UI)
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Static inbound documents & mock fixtures
const inboundDir = path.resolve(__dirname, '..', 'mock-data', 'inbound');
app.use('/inbound-docs', express.static(inboundDir));
app.use('/mock-data/inbound', express.static(inboundDir));

// Initialize enterprise repository
const repository = new InvoiceRepository();

// Mount API routes
app.use('/api', createApiRouter(repository));

// Explicit 404 handler for API routes (prevents returning index.html as JSON)
app.use('/api', (req, res) => {
  res.status(404).json({ error: `API endpoint not found: ${req.method} ${req.originalUrl}` });
});

// Explicit 404 handler for static inbound documents and mock assets
app.use(['/inbound-docs', '/mock-data'], (req, res) => {
  res.status(404).json({ error: `Document or fixture not found: ${req.originalUrl}` });
});

// Catch-all route to serve SAP Fiori SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`=================================================================`);
  console.log(`  INVOICE DECISION INTELLIGENCE — RUNNING`);
  console.log(`  URL: http://localhost:${port}`);
  console.log(`  Target Architecture: SAP BTP & SAP S/4HANA (Clean Core)`);
  console.log(`  Mode: ${process.env.DEMO_MODE !== 'false' ? 'SAP DEMO MODE (ON)' : 'PRODUCTION'}`);
  console.log(`=================================================================`);
});

export { app, repository };
