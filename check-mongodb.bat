@echo off
echo Testing MongoDB Connection...
echo.
echo Checking if MongoDB service is running...
sc query MongoDB
echo.
echo Trying to connect to MongoDB...
mongo --eval "print('MongoDB is working!')" 2>nul
if %errorlevel% neq 0 (
    mongosh --eval "print('MongoDB is working!')" 2>nul
)
echo.
echo If you see "MongoDB is working!" above, your database is ready!
pause