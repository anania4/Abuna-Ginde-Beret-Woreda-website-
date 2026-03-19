# Abuna Ginde Beret Woreda Administration

Full-stack web application for the Abuna Ginde Beret Woreda Administration.

## Project Structure

```
.
├── backend/                    # Django REST API
│   ├── woreda_backend/        # Django project settings
│   ├── api/                   # API app with models & views
│   ├── requirements.txt       # Python dependencies
│   └── start.bat              # Quick start script
│
├── frontend/                  # React frontend
│   ├── src/                   # Source code
│   ├── public/                # Static assets
│   └── package.json           # Node dependencies
│
└── backend-strapi-backup/     # Old backend (can be deleted)
```

## Tech Stack

### Backend
- Django 5.0
- Django REST Framework
- SQLite (development) / PostgreSQL (production)
- Python 3.x

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

## Quick Start

**🎉 Unified Server Setup!** Django now serves both the React frontend and API from a single server.

### Option 1: Unified Server (Recommended)

```bash
./start-unified.sh
```

This will:
- Build the React frontend
- Start Django server on port 3000
- Serve both frontend and API from one server

### Option 2: Separate Development Servers

For development with hot reload:

**Backend:**
```bash
./start-backend.sh
```

**Frontend:**
```bash
./start-frontend.sh
```

## Access Points

**Unified Server (Production-like):**
- **Everything**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/
- **API**: http://localhost:3000/api/

**Development Servers:**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/

## Features

### Content Management
- News articles
- Events calendar
- Photo gallery
- Government sectors
- Development projects
- FAQs
- Kebele information

### Admin Features
- Rich text editor
- Image uploads
- Draft/publish workflow
- Content filtering & search
- User management

## Documentation

- [Django Setup Guide](DJANGO-SETUP-GUIDE.md) - Detailed backend setup
- [Backend Implementation](MIGRATION-SUMMARY.md) - Technical details
- [Backend README](backend/README.md) - API documentation

## Development

### Backend Development

```bash
cd backend
python manage.py runserver 3000
```

### Frontend Development

```bash
cd frontend
npm run dev
```

## API Endpoints

All endpoints at `http://localhost:3000/api/` (unified server) or `http://localhost:8000/api/` (development):

- `/admin-messages/` - Admin welcome message
- `/events/` - Community events
- `/faqs/` - FAQs
- `/galleries/` - Photo gallery
- `/news/` - News articles
- `/sectors/` - Government sectors
- `/projects/` - Development projects
- `/kebeles/` - Administrative divisions
- `/global-settings/` - Site configuration

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

© 2025 Abuna Ginde Beret Woreda Administration
