#!/bin/bash

echo "Starting Unified Django + React Server on port 3000..."
echo

echo "Building React frontend..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "React build failed!"
    exit 1
fi
echo "React build completed successfully!"
echo

cd ../backend

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

echo "Starting Django server on port 3000..."
python manage.py runserver 3000