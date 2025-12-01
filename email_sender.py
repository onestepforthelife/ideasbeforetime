"""
Email Sender with Approval - Auto-send emails via Gmail/Outlook
"""

import smtplib
import json
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime

class EmailSender:
    def __init__(self):
        self.config = self.load_email_config()
        
    def load_email_config(self):
        """Load email configuration"""
        config_file = "email_config.json"
        if os.path.exists(config_file):
            with open(config_file, 'r') as f:
                return json.load(f)
        return self.create_default_config()
    
    def create_default_config(self):
        """Create default email configuration"""
        config = {
            "email_provider": "gmail",  # or "outlook"
            "email_address": "annikavashist@gmail.com",
            "app_password": "",  # Gmail App Password or Outlook password
            "smtp_server": "smtp.gmail.com",
            "smtp_port": 587,
            "auto_send": False,  # Require approval by default
            "bcc_self": True  # BCC yourself on all emails
        }
        
        with open("email_config.json", 'w') as f:
            json.dump(config, f, indent=2)
        
        print("\n⚠️ Email config created: email_config.json")
        print("Please add your email password/app password")
        
        return config
    
    def setup_gmail(self):
        """Setup Gmail with App Password"""
        print("\n📧 GMAIL SETUP")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print("\n1. Go to: https://myaccount.google.com/apppasswords")
        print("2. Sign in to your Gmail account")
        print("3. Create App Password:")
        print("   - App: Mail")
        print("   - Device: Windows Computer")
        print("4. Copy the 16-character password")
        print("5. Paste it below")
        print("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        
        email = input("\nYour Gmail address: ")
        app_password = input("App Password (16 chars): ")
        
        self.config['email_provider'] = 'gmail'
        self.config['email_address'] = email
        self.config['app_password'] = app_password
        self.config['smtp_server'] = 'smtp.gmail.com'
        self.config['smtp_port'] = 587
        
        self.save_config()
        print("\n✅ Gmail configured!")
    
    def setup_outlook(self):
        """Setup Outlook"""
        print("\n📧 OUTLOOK SETUP")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        
        email = input("\nYour Outlook email: ")
        password = input("Password: ")
        
        self.config['email_provider'] = 'outlook'
        self.config['email_address'] = email
        self.config['app_password'] = password
        self.config['smtp_server'] = 'smtp-mail.outlook.com'
        self.config['smtp_port'] = 587
        
        self.save_config()
        print("\n✅ Outlook configured!")
    
    def save_config(self):
        """Save email configuration"""
        with open("email_config.json", 'w') as f:
            json.dump(self.config, f, indent=2)
    
    def send_email(self, to_emails, subject, body, require_approval=True, cv_path=None):
        """
        Send email with optional approval and CV attachment
        
        Args:
            to_emails: List of recipient emails
            subject: Email subject
            body: Email body
            require_approval: If True, ask for approval before sending
            cv_path: Path to CV PDF to attach
        """
        
        # Show preview
        print("\n" + "="*60)
        print("📧 EMAIL PREVIEW")
        print("="*60)
        print(f"\nTo: {', '.join(to_emails[:3])}... ({len(to_emails)} total)")
        print(f"Subject: {subject}")
        if cv_path:
            print(f"📎 Attachment: {cv_path}")
        print(f"\n{body[:500]}...")
        print("\n" + "="*60)
        
        # Ask for approval
        if require_approval:
            response = input("\n✅ Send this email? (yes/no/edit/park): ").lower()
            
            if response == 'no':
                print("❌ Email cancelled")
                return False
            elif response == 'park':
                print("🅿️ Job parked for later")
                self.park_job(to_emails, subject, body, cv_path)
                return False
            elif response == 'edit':
                print("\n📝 Edit mode:")
                subject = input(f"Subject [{subject}]: ") or subject
                print("Body (press Enter twice when done):")
                lines = []
                while True:
                    line = input()
                    if line == "" and len(lines) > 0 and lines[-1] == "":
                        break
                    lines.append(line)
                body = "\n".join(lines[:-1])
            elif response != 'yes':
                print("❌ Invalid response. Email cancelled")
                return False
        
        # Send email
        try:
            print("\n📤 Sending email...")
            
            # Create message
            msg = MIMEMultipart()
            msg['From'] = self.config['email_address']
            msg['To'] = ', '.join(to_emails)
            msg['Subject'] = subject
            
            # BCC self if enabled
            if self.config.get('bcc_self', True):
                msg['Bcc'] = self.config['email_address']
            
            # Attach body
            msg.attach(MIMEText(body, 'plain'))
            
            # Attach CV if provided
            if cv_path and os.path.exists(cv_path):
                from email.mime.application import MIMEApplication
                with open(cv_path, 'rb') as f:
                    cv_attachment = MIMEApplication(f.read(), _subtype='pdf')
                    cv_attachment.add_header('Content-Disposition', 'attachment', 
                                           filename=os.path.basename(cv_path))
                    msg.attach(cv_attachment)
                print(f"   📎 CV attached: {os.path.basename(cv_path)}")
            
            # Attach CV if provided
            if cv_path and os.path.exists(cv_path):
                with open(cv_path, 'rb') as f:
                    part = MIMEBase('application', 'octet-stream')
                    part.set_payload(f.read())
                    encoders.encode_base64(part)
                    part.add_header('Content-Disposition', f'attachment; filename={os.path.basename(cv_path)}')
                    msg.attach(part)
                print(f"📎 CV attached: {os.path.basename(cv_path)}")
            
            # Connect to SMTP server
            server = smtplib.SMTP(self.config['smtp_server'], self.config['smtp_port'])
            server.starttls()
            server.login(self.config['email_address'], self.config['app_password'])
            
            # Send email
            all_recipients = to_emails.copy()
            if self.config.get('bcc_self', True):
                all_recipients.append(self.config['email_address'])
            
            server.send_message(msg)
            server.quit()
            
            print(f"✅ Email sent to {len(to_emails)} recipients!")
            
            # Log sent email
            self.log_sent_email(to_emails, subject)
            
            return True
            
        except Exception as e:
            print(f"❌ Error sending email: {e}")
            print("\nTroubleshooting:")
            print("1. Check your email/password in email_config.json")
            print("2. For Gmail: Use App Password, not regular password")
            print("3. For Outlook: Enable 'Less secure app access'")
            return False
    
    def park_job(self, to_emails, subject, body, cv_path):
        """Park job for later"""
        parked_entry = {
            "timestamp": datetime.now().isoformat(),
            "to": to_emails,
            "subject": subject,
            "body": body,
            "cv_path": cv_path,
            "status": "parked"
        }
        
        parked_file = "parked_jobs.json"
        parked = []
        
        if os.path.exists(parked_file):
            with open(parked_file, 'r') as f:
                parked = json.load(f)
        
        parked.append(parked_entry)
        
        with open(parked_file, 'w') as f:
            json.dump(parked, f, indent=2)
        
        print(f"✅ Job parked! View parked jobs with option 7")
    
    def view_parked_jobs(self):
        """View and send parked jobs"""
        parked_file = "parked_jobs.json"
        
        if not os.path.exists(parked_file):
            print("\n📭 No parked jobs")
            return
        
        with open(parked_file, 'r') as f:
            parked = json.load(f)
        
        if len(parked) == 0:
            print("\n📭 No parked jobs")
            return
        
        print(f"\n🅿️ PARKED JOBS ({len(parked)})")
        print("="*60)
        
        for i, job in enumerate(parked, 1):
            print(f"\n{i}. {job['subject']}")
            print(f"   To: {', '.join(job['to'][:2])}...")
            print(f"   Parked: {job['timestamp'][:10]}")
        
        choice = input("\nSend parked job (number) or 'back': ")
        
        if choice.isdigit() and 1 <= int(choice) <= len(parked):
            job = parked[int(choice) - 1]
            if self.send_email(job['to'], job['subject'], job['body'], True, job.get('cv_path')):
                # Remove from parked
                parked.pop(int(choice) - 1)
                with open(parked_file, 'w') as f:
                    json.dump(parked, f, indent=2)
    
    def log_sent_email(self, to_emails, subject):
        """Log sent emails for tracking"""
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "to": to_emails,
            "subject": subject,
            "from": self.config['email_address']
        }
        
        log_file = "sent_emails_log.json"
        logs = []
        
        if os.path.exists(log_file):
            with open(log_file, 'r') as f:
                logs = json.load(f)
        
        logs.append(log_entry)
        
        with open(log_file, 'w') as f:
            json.dump(logs, f, indent=2)
    
    def send_job_application(self, job_result_file, cv_path=None):
        """
        Send email from job result file with CV attachment
        
        Args:
            job_result_file: Path to job result JSON file
            cv_path: Path to CV PDF
        """
        
        # Load job result
        with open(job_result_file, 'r') as f:
            result = json.load(f)
        
        # Extract email data
        contacts = result['contacts']
        draft = result['draft']
        
        # Parse subject and body from draft
        lines = draft.split('\n')
        subject = lines[0].replace('Subject: ', '')
        body = '\n'.join(lines[1:])
        
        # Get recipient emails
        to_emails = [c['email'] for c in contacts]
        
        # Use CV from profile folder if not specified
        if not cv_path:
            cv_path = os.path.join('amit profile for Kiro', 'cv.pdf')
            if not os.path.exists(cv_path):
                cv_path = None
        
        # Send with approval and CV
        return self.send_email(to_emails, subject, body, require_approval=True, cv_path=cv_path)
    
    def batch_send_jobs(self, job_results_folder="job_results"):
        """
        Batch send emails for all jobs in results folder
        """
        
        if not os.path.exists(job_results_folder):
            print(f"❌ Folder not found: {job_results_folder}")
            return
        
        # Get all job result files
        job_files = [f for f in os.listdir(job_results_folder) if f.endswith('.json')]
        job_files.sort()  # Send in order (best matches first)
        
        print(f"\n📊 Found {len(job_files)} jobs to send")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        
        sent_count = 0
        skipped_count = 0
        parked_count = 0
        parked_jobs = []
        
        for i, job_file in enumerate(job_files, 1):
            print(f"\n📧 Job {i}/{len(job_files)}: {job_file}")
            
            job_path = os.path.join(job_results_folder, job_file)
            
            result = self.send_job_application(job_path)
            if result == 'parked':
                parked_count += 1
                parked_jobs.append(job_file)
            elif result:
                sent_count += 1
            else:
                skipped_count += 1
            
            # Ask if continue
            if i < len(job_files):
                cont = input("\nContinue to next job? (yes/no): ").lower()
                if cont != 'yes':
                    break
        
        # Save parked jobs
        if parked_jobs:
            with open('parked_jobs.json', 'w') as f:
                json.dump(parked_jobs, f, indent=2)
            print(f"\n📌 {parked_count} jobs parked. Run option 5 to review parked jobs.")
        
        print("\n" + "="*60)
        print("📊 BATCH SEND SUMMARY")
        print("="*60)
        print(f"✅ Sent: {sent_count}")
        print(f"📌 Parked: {parked_count}")
        print(f"⏭️ Skipped: {skipped_count}")
        print(f"📧 Total: {len(job_files)}")
        print("="*60)
    
    def review_parked_jobs(self):
        """Review and send parked jobs"""
        if not os.path.exists('parked_jobs.json'):
            print("📌 No parked jobs found")
            return
        
        with open('parked_jobs.json', 'r') as f:
            parked_jobs = json.load(f)
        
        if not parked_jobs:
            print("📌 No parked jobs")
            return
        
        print(f"\n📌 Found {len(parked_jobs)} parked jobs")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        
        sent_count = 0
        remaining = []
        
        for i, job_file in enumerate(parked_jobs, 1):
            print(f"\n📧 Parked Job {i}/{len(parked_jobs)}: {job_file}")
            
            job_path = os.path.join('job_results', job_file)
            if not os.path.exists(job_path):
                print(f"   ⚠️ File not found, skipping")
                continue
            
            result = self.send_job_application(job_path)
            if result == 'parked':
                remaining.append(job_file)
            elif result:
                sent_count += 1
            else:
                remaining.append(job_file)
        
        # Update parked jobs
        with open('parked_jobs.json', 'w') as f:
            json.dump(remaining, f, indent=2)
        
        print(f"\n✅ Sent {sent_count} parked jobs")
        print(f"📌 {len(remaining)} jobs still parked")

def main():
    """Main menu"""
    sender = EmailSender()
    
    print("\n╔══════════════════════════════════════════════════════════════╗")
    print("║     📧 EMAIL SENDER WITH APPROVAL 📧                        ║")
    print("╚══════════════════════════════════════════════════════════════╝")
    
    while True:
        print("\n1. Setup Gmail")
        print("2. Setup Outlook")
        print("3. Send Single Job Email")
        print("4. Batch Send All Jobs")
        print("5. Test Email")
        print("6. View Parked Jobs")
        print("7. Exit")
        
        choice = input("\nChoice (1-7): ")
        
        if choice == '1':
            sender.setup_gmail()
        elif choice == '2':
            sender.setup_outlook()
        elif choice == '3':
            job_file = input("Job result file path: ")
            sender.send_job_application(job_file)
        elif choice == '4':
            sender.batch_send_jobs()
        elif choice == '5':
            sender.send_email(
                [sender.config['email_address']], 
                "Test Email", 
                "This is a test email from the job search agent.",
                require_approval=True
            )
        elif choice == '6':
            break

if __name__ == "__main__":
    main()
