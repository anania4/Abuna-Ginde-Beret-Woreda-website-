import type { Core } from '@strapi/strapi';
import path from 'path';
import fs from 'fs';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  index(ctx: any) {
    const indexPath = path.resolve(__dirname, '../../../../public/index.html');
    
    if (fs.existsSync(indexPath)) {
      ctx.type = 'html';
      ctx.body = fs.readFileSync(indexPath, 'utf8');
    } else {
      ctx.status = 404;
      ctx.body = 'Frontend not found. Please build and deploy the frontend first.';
    }
  },
});