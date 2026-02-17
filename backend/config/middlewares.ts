import type { Core } from '@strapi/strapi';
import path from 'path';
import fs from 'fs';

// Determine which directory to serve frontend from
// Prefer dist/ if it exists (production build), otherwise serve from root (development)
const projectRoot = path.resolve(__dirname, '../../..');
const distPath = path.join(projectRoot, 'dist');
const frontendRoot = fs.existsSync(distPath) ? distPath : projectRoot;

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
