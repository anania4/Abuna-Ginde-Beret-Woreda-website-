import type { Core } from '@strapi/strapi';
import path from 'path';
import fs from 'fs';

// Serve frontend from backend/public directory
const projectRoot = path.resolve(__dirname, '../../..');
const frontendRoot = path.join(projectRoot, 'backend/public');

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:4173'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'global::static-frontend',
    config: {
      rootDir: frontendRoot,  // Serve from dist/ if it exists, otherwise project root
      indexFile: 'index.html',
      cacheControl: process.env.NODE_ENV === 'production' 
        ? 'public, max-age=31536000' 
        : 'no-cache'
    }
  }
];

export default config;
