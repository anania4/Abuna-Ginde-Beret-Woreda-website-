# Woreda Management System

A unified web application for managing woreda (district) information, built with Strapi CMS backend and Vite frontend.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 20.0.0
- npm >= 6.0.0

### Installation

1. Install dependencies:
```bash
npm install
cd backend && npm install
```

2. Configure environment:
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

3. Build and start the unified server:
```bash
# From root directory
start-unified.bat
```

The application will be available at:
- **Frontend**: http://localhost:1337/
- **Admin Panel**: http://localhost:1337/admin
- **API**: http://localhost:1337/api

## 📁 Project Structure

```
woredaNew/
├── backend/              # Strapi CMS backend
│   ├── src/
│   │   ├── api/         # API endpoints
│   │   ├── handlers/    # Request handlers
│   │   ├── middlewares/ # Custom middlewares
│   │   └── admin/       # Admin customizations
│   ├── config/          # Strapi configuration
│   ├── database/        # Database files
│   └── public/          # Static frontend files (built)
├── src/                 # Frontend source code
│   ├── api.js          # API client
│   └── main.js         # Main entry point
├── public/             # Frontend static assets
└── dist/               # Frontend build output
```

## 🛠️ Development

### Frontend Development
```bash
npm run dev:frontend
```

### Backend Development
```bash
npm run dev:backend
```

### Build Frontend
```bash
npm run build:frontend
```

### Deploy Frontend to Backend
```bash
npm run deploy:frontend
```

## 📚 Available Documentation

- **GALLERY-SETUP-GUIDE.md** - Complete guide for setting up the gallery feature
- **ADD-GALLERY-PHOTO.md** - Instructions for adding photos to the gallery
- **ENABLE-GALLERY-PERMISSIONS.md** - How to configure gallery permissions
- **EVENTS-SETUP-GUIDE.md** - Guide for setting up events functionality
- **STRAPI-SETUP-GUIDE.md** - Strapi configuration and setup
- **UNIFIED-SETUP-GUIDE.md** - Unified frontend routing setup

## 🔧 Configuration

### Environment Variables

Key environment variables in `backend/.env`:
- `HOST` - Server host (default: 0.0.0.0)
- `PORT` - Server port (default: 1337)
- `APP_KEYS` - Application keys for security
- `API_TOKEN_SALT` - Salt for API tokens
- `ADMIN_JWT_SECRET` - JWT secret for admin authentication
- `TRANSFER_TOKEN_SALT` - Salt for transfer tokens
- `JWT_SECRET` - JWT secret for user authentication

## 🎯 Features

- **Unified Routing**: Single server for frontend, admin, and API
- **Content Management**: Strapi CMS for easy content management
- **Gallery System**: Photo gallery with permissions
- **Events Management**: Event creation and management
- **News & FAQs**: News articles and frequently asked questions
- **Sectors & Projects**: Sector and project information management
- **Kebele Management**: District (kebele) information system

## 🧪 Testing

Run tests:
```bash
cd backend
npm test
```

## 📝 API Endpoints

- `GET /api/sectors` - List all sectors
- `GET /api/projects` - List all projects
- `GET /api/news-articles` - List news articles
- `GET /api/faqs` - List FAQs
- `GET /api/galleries` - List gallery items
- `GET /api/kebeles` - List kebeles

## 🔐 Permissions

Gallery permissions need to be configured in the Strapi admin panel. See `ENABLE-GALLERY-PERMISSIONS.md` for details.

## 🐛 Troubleshooting

### Build Errors
If you encounter build errors, try:
```bash
cd backend
npm install @strapi/design-system
npm run build
```

### Permission Issues
Check the Strapi admin panel under Settings > Users & Permissions Plugin > Roles > Public

## 📄 License

Private project - All rights reserved
