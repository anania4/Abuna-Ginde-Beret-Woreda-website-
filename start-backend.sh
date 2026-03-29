#!/bin/bash

echo "Starting Django Backend Server..."
cd backend

# Check if virtual environment exists and activate it
if [ -d "venv" ]; then
    echo "Activating Python virtual environment..."
    if [ -f "venv/Scripts/activate" ]; then
        # Windows
        source venv/Scripts/activate
    elif [ -f "venv/bin/activate" ]; then
        # Linux/Mac
        source venv/bin/activate
    fi
elif [ -d "../venv" ]; then
    echo "Activating Python virtual environment..."
    if [ -f "../venv/Scripts/activate" ]; then
        # Windows
        source ../venv/Scripts/activate
    elif [ -f "../venv/bin/activate" ]; then
        # Linux/Mac
        source ../venv/bin/activate
    fi
else
    echo "Warning: No virtual environment found. Using system Python."
fi

python manage.py runserver 8000