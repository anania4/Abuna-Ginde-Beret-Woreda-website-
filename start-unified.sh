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
echo "Starting Django server on port 3000..."
python manage.py runserver 3000