@echo off
echo Starting Unified Django + React Server on port 3000...
echo.

echo Building React frontend...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo React build failed!
    exit /b %errorlevel%
)
echo React build completed successfully!
echo.

cd ..\backend

if exist "venv\Scripts\activate.bat" (
    echo Activating Python virtual environment...
    call venv\Scripts\activate.bat
) else if exist "..\venv\Scripts\activate.bat" (
    echo Activating Python virtual environment...
    call ..\venv\Scripts\activate.bat
) else (
    echo Warning: No virtual environment found. Using system Python.
)

echo Starting Django server on port 3000...
python manage.py runserver 3000
