@echo off
echo Building frontend...
call npm run build

echo Copying frontend files to Strapi public directory...
call cp -r dist/* backend/public/

echo Starting unified server on port 1337...
echo Frontend will be available at: http://localhost:1337/
echo Admin will be available at: http://localhost:1337/admin
echo.

cd backend
call npm run start