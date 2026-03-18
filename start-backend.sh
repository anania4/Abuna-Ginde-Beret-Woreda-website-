#!/bin/bash

echo "Starting Django Backend Server..."
cd backend

# Check if virtual environment exists and activate it
if [ -d "venv" ]; then
    echo "Activating Python virtual environment..."
    source venv/bin/activate
elif [ -d "../venv" ]; then
    echo "Activating Python virtual environment..."
    source ../venv/bin/activate
else
    echo "Warning: No virtual environment found. Using system Python."
fi

python manage.py runserver 8000