# How to Access the Application

## Single Server Access ✅

The complete application is now accessible through a single server endpoint:

### Frontend (Your Website)
**URL**: http://localhost:1337

When you open this in your browser, you will see:
- The complete Abuna Ginde Beret Woreda website
- All static assets (CSS, JavaScript, images) loading correctly
- Full functionality including navigation, sections, and interactive elements

### Backend (Strapi Admin Panel)
**URL**: http://localhost:1337/admin

Access the Strapi administration panel to manage:
- Content (News, Events, Projects, etc.)
- Media uploads
- User permissions
- System settings

### API Endpoints

All API endpoints remain accessible at their original paths:
- **Sectors**: http://localhost:1337/api/sectors
- **Projects**: http://localhost:1337/api/projects
- **News**: http://localhost:1337/api/news
- **FAQs**: http://localhost:1337/api/faqs
- **Kebeles**: http://localhost:1337/api/kebeles
- **Gallery**: http://localhost:1337/api/galleries
- **Events**: http://localhost:1337/api/events

## Client-Side Routing

The application supports client-side routing. You can navigate to any route (e.g., http://localhost:1337/about) and the SPA will handle it correctly.

## Testing

Run the automated tests:
```bash
node test-final-checkpoint.cjs
```

## Production Deployment

For production deployment:

1. **Build the frontend**: 
   ```bash
   npm run build
   ```

2. **Build the backend admin panel**:
   ```bash
   cd backend
   npm run build
   ```

3. **Set environment variable**: 
   ```bash
   set NODE_ENV=production  # Windows
   export NODE_ENV=production  # Linux/Mac
   ```

4. **Start the backend**: 
   ```bash
   cd backend
   npm start
   ```

5. **Access your application**:
   - Frontend: http://your-domain.com
   - Admin Panel: http://your-domain.com/admin
   - API: http://your-domain.com/api/*

The application will automatically use production caching headers for optimal performance.
