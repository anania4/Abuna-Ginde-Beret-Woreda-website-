# Abuna Ginde Beret Woreda Administration - Django Backend

Django REST API backend for the Woreda Administration website.

## Features

- RESTful API with Django REST Framework
- Admin panel for content management
- Image upload support
- Rich text editor (CKEditor)
- CORS enabled for frontend integration
- Filtering, searching, and pagination
- Draft/Publish workflow

## Setup

### 1. Create Virtual Environment

```bash
python -m venv venv
```

### 2. Activate Virtual Environment

Windows:
```bash
venv\Scripts\activate
```

Linux/Mac:
```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment Configuration

Copy `.env.example` to `.env` and update values:
```bash
copy .env.example .env
```

### 5. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create Superuser

```bash
python manage.py createsuperuser
```

### 7. Run Development Server

```bash
python manage.py runserver 0.0.0.0:3000
```

The API will be available at `http://localhost:3000/api/`
Admin panel at `http://localhost:3000/admin/`

## API Endpoints

All endpoints support GET, POST, PUT, PATCH, DELETE methods:

- `/api/admin-messages/` - Admin welcome message (singleton)
- `/api/events/` - Community events
- `/api/faqs/` - Frequently asked questions
- `/api/galleries/` - Photo gallery
- `/api/news/` - News articles
- `/api/sectors/` - Government sectors
- `/api/projects/` - Development projects
- `/api/milestones/` - Project milestones
- `/api/global-settings/` - Site configuration (singleton)
- `/api/kebeles/` - Administrative divisions

### Filtering Examples

```
/api/events/?category=Festival
/api/events/?status=Upcoming
/api/galleries/?category=Farming
/api/news/?category=Agriculture
```

### Search Examples

```
/api/events/?search=market
/api/news/?search=education
```

## Models

### AdminMessage (Singleton)
- title, administrator_name, role, message, image
- Welcome message from the administrator

### Event
- title, description, event_date, location, category, status, image
- Community events and announcements

### FAQ
- question, answer, order
- Frequently asked questions

### Gallery
- title, description, image, category, order
- Photo gallery items

### News
- title, content, date, category, img
- News articles and announcements

### Sector
- name, icon, category, description, order
- Government offices and sectors

### Project
- title, status, date_range, budget, beneficiaries, category, percent, img, description
- Development and infrastructure projects

### Milestone
- title, date, completed, project (FK)
- Project milestones

### GlobalSetting (Singleton)
- site_name, resident_count, agriculture_percentage, school_count, area_size, footer_text
- Global site configuration

### Kebele
- name, type, population, description, is_capital
- Administrative divisions

## Admin Panel

Access the admin panel at `/admin/` to:
- Manage all content types
- Upload images
- Edit rich text content
- Publish/unpublish items
- Reorder items

## Media Files

Uploaded files are stored in the `media/` directory:
- `media/admin/` - Admin photos
- `media/events/` - Event images
- `media/gallery/` - Gallery photos
- `media/news/` - News images
- `media/projects/` - Project images
