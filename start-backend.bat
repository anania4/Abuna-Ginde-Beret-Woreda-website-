@echo off
echo Starting Django Backend...
cd backend

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate
pip install -r requirements.txt

if not exist db.sqlite3 (
    echo Running migrations...
    python manage.py makemigrations
    python manage.py migrate
    echo.
    echo Please create a superuser:
    python manage.py createsuperuser
)

echo.
echo Starting Django server at http://localhost:8000
python manage.py runserver
