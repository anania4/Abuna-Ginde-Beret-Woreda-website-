@echo off
echo ========================================
echo Production Mode Verification
echo ========================================
echo.

echo Step 1: Checking if frontend is built...
if exist "index.html" (
    echo [OK] index.html found
) else (
    echo [ERROR] index.html not found. Run: npm run build
    exit /b 1
)

if exist "dist" (
    echo [OK] dist folder found
) else (
    echo [WARNING] dist folder not found
)

echo.
echo Step 2: Checking backend configuration...
if exist "backend\config\middlewares.ts" (
    echo [OK] Middleware configuration found
) else (
    echo [ERROR] Middleware configuration not found
    exit /b 1
)

if exist "backend\src\middlewares\static-frontend.ts" (
    echo [OK] Static frontend middleware found
) else (
    echo [ERROR] Static frontend middleware not found
    exit /b 1
)

echo.
echo Step 3: Environment check...
echo Current NODE_ENV: %NODE_ENV%
if "%NODE_ENV%"=="production" (
    echo [OK] NODE_ENV is set to production
) else (
    echo [INFO] NODE_ENV is not set to production
    echo       Set it with: set NODE_ENV=production
)

echo.
echo ========================================
echo Verification Complete
echo ========================================
echo.
echo To start in production mode:
echo   1. set NODE_ENV=production
echo   2. cd backend
echo   3. npm run start
echo.
echo To test cache headers:
echo   node backend\test-production-cache.js
echo.
echo For full deployment guide, see:
echo   DEPLOYMENT-GUIDE.md
echo.
