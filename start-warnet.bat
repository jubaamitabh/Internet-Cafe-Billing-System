@echo off
title Warnet Billing System Launcher

:: Menambahkan Node.js ke PATH untuk sesi ini
set PATH=%PATH%;C:\Users\ASUS\Downloads\node-v24.14.1-win-x64

echo ==================================================
echo       MEMULAI SISTEM BILLING WARNET CAFE
echo ==================================================
echo.

echo [1/2] Menyalakan Backend Server (Port 5000)...
start "Backend Server" cmd /k "cd server-api && echo Sedang menginstal modul, mohon tunggu... && npm install && echo Menjalankan Server... && npm run dev"

:: Memberi jeda sebentar agar server nyala duluan
timeout /t 3 /nobreak >nul

echo [2/2] Menyalakan Frontend Dashboard (Port 5173)...
start "Frontend Dashboard" cmd /k "cd client-dashboard && echo Sedang menginstal modul React, mohon tunggu... && npm install && echo Menjalankan UI... && npm run dev"

echo.
echo ==================================================
echo SEMUA SISTEM SIAP! Jendela terminal baru telah dibuka.
echo Jika proses install sudah selesai di jendela tersebut, 
echo Silakan buka browser Anda dan ketikkan alamat:
echo.
echo        http://localhost:5173
echo.
echo ==================================================
pause
