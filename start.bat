@echo off
echo Starting Portfolio Application...
echo.

echo Installing server dependencies...
cd server
call npm install
echo.

echo Starting backend server...
start cmd /k "npm start"
cd ..

echo.
echo Starting frontend...
timeout /t 3 /nobreak > nul
call npm run dev

pause
