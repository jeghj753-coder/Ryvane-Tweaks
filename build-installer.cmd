@echo off
setlocal
where node >nul 2>&1 || (echo Node.js is required. & pause & exit /b 1)
where npm >nul 2>&1 || (echo npm is required. & pause & exit /b 1)
echo Installing build dependencies...
call npm install
if errorlevel 1 exit /b 1
echo Building Ryvane Setup EXE...
call npm run dist
if errorlevel 1 exit /b 1
echo.
echo Done. Check the dist folder for Ryvane-Setup-2.4.0.exe
pause
