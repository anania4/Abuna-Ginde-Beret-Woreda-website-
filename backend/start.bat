@echo off
echo Starting Django Backend...
echo.

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing dependencies...
pip install -r requirements.txt

if not exist db.sqlite3 (
    echo Running migrations...
    python manage.py makemigrations
    python manage.py migrate
    
    echo.
    echo Creating superuser...
    python manage.py createsuperuser
)

echo.
echo Starting development server on port 3000...
python manage.py runserver 0.0.0.0:3000
