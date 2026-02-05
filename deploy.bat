@echo off
echo Starting Deployment...
echo --------------------------------------------
git add .
git commit -m "Force update"
git push -f
echo --------------------------------------------
echo Done! Your code is on GitHub.
echo.
echo Please wait 2-3 minutes for the website to update.
echo Then checkout your site in an INCOGNITO window.
pause
