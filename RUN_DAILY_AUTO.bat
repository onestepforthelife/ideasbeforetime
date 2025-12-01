@echo off
REM Automated Daily Job Search - Runs without user input
REM Schedule this in Windows Task Scheduler for 9 AM daily

echo ╔══════════════════════════════════════════════════════════════╗
echo ║     🤖 AUTOMATED DAILY JOB SEARCH 🤖                        ║
echo ║          Running without user input...                       ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

REM Step 1: Run job agent (finds 20 jobs)
echo [%TIME%] Step 1: Finding jobs...
python job_agent.py --auto > daily_run_log.txt 2>&1

REM Step 2: Auto-send emails (no approval needed)
echo [%TIME%] Step 2: Sending emails...
python email_sender.py --auto >> daily_run_log.txt 2>&1

REM Step 3: Check follow-ups
echo [%TIME%] Step 3: Checking follow-ups...
python followup_automation.py --auto >> daily_run_log.txt 2>&1

REM Step 4: Commit to GitHub
echo [%TIME%] Step 4: Uploading to GitHub...
git add -A
git commit -m "Daily job search run - %DATE% %TIME%"
git push

echo.
echo ✅ Daily run complete! Check daily_run_log.txt for details.
echo.
