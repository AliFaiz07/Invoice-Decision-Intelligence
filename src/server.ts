/**
 * SAP Invoice Decision Intelligence — Enterprise Application Server
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

// Catch-all route to serve SAP Fiori SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`=================================================================`);
  console.log(`  SAP INVOICE DECISION INTELLIGENCE — RUNNING`);
  console.log(`  URL: http://localhost:${port}`);
  console.log(`  Target Architecture: SAP BTP & SAP S/4HANA (Clean Core)`);
  console.log(`  Mode: ${process.env.DEMO_MODE !== 'false' ? 'SAP DEMO MODE (ON)' : 'PRODUCTION'}`);
  console.log(`=================================================================`);
});

export { app, repository };
