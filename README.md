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

**🎉 Frontend and Backend are now connected!** See [CONNECTION-COMPLETE.md](CONNECTION-COMPLETE.md)

**New to the project? Start here:** [QUICK-START.md](QUICK-START.md)

**Test the connection:** [TEST-CONNECTION.md](TEST-CONNECTION.md)

### 1. Start Backend

```bash
cd backend
start.bat
```

This will:
- Create virtual environment
- Install dependencies
- Run migrations
- Create superuser (you'll be prompted)
- Start server at http://localhost:3000

### 2. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at http://localhost:5173

## Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3000/api/
- **Admin Panel**: http://localhost:3000/admin/

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
venv\Scripts\activate
python manage.py runserver 0.0.0.0:3000
```

### Frontend Development

```bash
cd frontend
npm run dev
```

## API Endpoints

All endpoints at `http://localhost:3000/api/`:

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
