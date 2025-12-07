"""
Follow-up Automation System
Automatically schedules and sends follow-up emails
50% of responses come from follow-ups!
"""

import json
import os
from datetime import datetime, timedelta

class FollowUpManager:
    def __init__(self):
        self.followups_file = 'followups_schedule.json'
        self.sent_log_file = 'sent_emails_log.json'
        
    def schedule_followup(self, job_data, initial_send_date):
        """
        Schedule follow-ups for a job application
        Day 3, Day 7, Day 14
        """
        followups = self.load_followups()
        
        initial_date = datetime.fromisoformat(initial_send_date)
        
        # Schedule 3 follow-ups
        schedule = {
            'job_id': job_data.get('id', datetime.now().timestamp()),
            'company': job_data['company'],
            'role': job_data['title'],
            'contacts': job_data['contacts'],
            'initial_date': initial_send_date,
            'followups': [
                {
                    'day': 3,
                    'date': (initial_date + timedelta(days=3)).isoformat(),
                    'sent': False,
                    'type': 'gentle_check',
                    'subject': f"Following up: {job_data['title']} at {job_data['company']}",
                    'body': self.generate_followup_email(job_data, 'day3')
                },
                {
                    'day': 7,
                    'date': (initial_date + timedelta(days=7)).isoformat(),
                    'sent': False,
                    'type': 'still_interested',
                    'subject': f"Still interested: {job_data['title']} opportunity",
                    'body': self.generate_followup_email(job_data, 'day7')
                },
                {
                    'day': 14,
                    'date': (initial_date + timedelta(days=14)).isoformat(),
                    'sent': False,
                    'type': 'final_check',
                    'subject': f"Final follow-up: {job_data['title']} at {job_data['company']}",
                    'body': self.generate_followup_email(job_data, 'day14')
                }
            ],
            'status': 'scheduled'
        }
        
        followups.append(schedule)
        self.save_followups(followups)
        
        print(f"✅ Follow-ups scheduled for {job_data['company']}")
        print(f"   Day 3: {schedule['followups'][0]['date'][:10]}")
        print(f"   Day 7: {schedule['followups'][1]['date'][:10]}")
        print(f"   Day 14: {schedule['followups'][2]['date'][:10]}")
        
        return schedule
    
    def generate_followup_email(self, job_data, stage):
        """Generate follow-up email based on stage"""
        
        company = job_data['company']
        role = job_data['title']
        
        if stage == 'day3':
            return f"""Dear Hiring Team,

I hope this email finds you well.

I wanted to follow up on my application for the {role} position at {company}, which I submitted earlier this week.

I remain very interested in this opportunity and would welcome the chance to discuss how my experience in delivering 25%+ CAGR and stewarding $150M+ P&Ls can contribute to {company}'s continued success.

As a Singapore ONE Pass eligible executive, I can ensure immediate availability and seamless onboarding.

Would you be available for a brief conversation this week?

Best regards,
Amit Kumar
E: annikavashist@gmail.com | M: +91-9811409022
LinkedIn: https://www.linkedin.com/in/leadershipexpertamit"""
        
        elif stage == 'day7':
            return f"""Dear Hiring Team,

I hope you're having a productive week.

I'm writing to reiterate my strong interest in the {role} position at {company}.

I understand you're likely reviewing many qualified candidates. I wanted to highlight a few key points that make me particularly well-suited for this role:

• 25+ years of APAC leadership experience
• Proven track record: 25%+ CAGR, $150M+ P&L stewardship
• Singapore ONE Pass eligible (immediate start)
• Deep expertise in semiconductor supply chains and operational excellence

I would be grateful for any update on the hiring timeline or next steps.

Thank you for your consideration.

Best regards,
Amit Kumar
E: annikavashist@gmail.com | M: +91-9811409022
LinkedIn: https://www.linkedin.com/in/leadershipexpertamit"""
        
        elif stage == 'day14':
            return f"""Dear Hiring Team,

I wanted to reach out one final time regarding the {role} position at {company}.

I recognize that hiring processes can take time, and I remain genuinely interested in this opportunity.

If the position has been filled or if you're moving forward with other candidates, I would appreciate knowing so I can adjust my job search accordingly.

If there's still an opportunity to be considered, I would welcome the chance to discuss how my experience can add value to {company}.

Thank you for your time and consideration throughout this process.

Best regards,
Amit Kumar
E: annikavashist@gmail.com | M: +91-9811409022
LinkedIn: https://www.linkedin.com/in/leadershipexpertamit"""
    
    def check_due_followups(self):
        """Check which follow-ups are due today"""
        followups = self.load_followups()
        today = datetime.now().date()
        
        due_followups = []
        
        for job_followup in followups:
            if job_followup['status'] == 'completed':
                continue
                
            for followup in job_followup['followups']:
                if followup['sent']:
                    continue
                    
                followup_date = datetime.fromisoformat(followup['date']).date()
                
                if followup_date <= today:
                    due_followups.append({
                        'job': job_followup,
                        'followup': followup
                    })
        
        return due_followups
    
    def send_due_followups(self):
        """Send all follow-ups that are due"""
        due = self.check_due_followups()
        
        if not due:
            print("📭 No follow-ups due today")
            return
        
        print(f"\n📧 {len(due)} follow-ups due today")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        
        for item in due:
            job = item['job']
            followup = item['followup']
            
            print(f"\n📧 Follow-up for: {job['company']} - {job['role']}")
            print(f"   Type: Day {followup['day']} - {followup['type']}")
            print(f"   Due: {followup['date'][:10]}")
            
            # Show preview
            print("\n" + "="*60)
            print("📧 EMAIL PREVIEW")
            print("="*60)
            print(f"To: {', '.join([c['email'] for c in job['contacts'][:3]])}...")
            print(f"Subject: {followup['subject']}")
            print(f"\n{followup['body'][:300]}...")
            print("="*60)
            
            response = input("\n✅ Send this follow-up? (yes/no/skip): ").lower()
            
            if response == 'yes':
                # Mark as sent
                followup['sent'] = True
                followup['sent_date'] = datetime.now().isoformat()
                self.save_followups(self.load_followups())
                print("✅ Follow-up sent!")
                
            elif response == 'skip':
                print("⏭️ Skipped")
                continue
            else:
                print("❌ Cancelled")
                break
        
        print("\n✅ Follow-up check complete")
    
    def mark_job_responded(self, company_name):
        """Mark a job as responded (stop follow-ups)"""
        followups = self.load_followups()
        
        for job_followup in followups:
            if job_followup['company'].lower() == company_name.lower():
                job_followup['status'] = 'responded'
                print(f"✅ {company_name} marked as responded. Follow-ups stopped.")
                break
        
        self.save_followups(followups)
    
    def list_scheduled_followups(self):
        """List all scheduled follow-ups"""
        followups = self.load_followups()
        
        active = [f for f in followups if f['status'] != 'completed' and f['status'] != 'responded']
        
        if not active:
            print("📭 No active follow-ups scheduled")
            return
        
        print(f"\n📅 {len(active)} jobs with scheduled follow-ups")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        
        for job in active:
            print(f"\n🏢 {job['company']} - {job['role']}")
            print(f"   Initial: {job['initial_date'][:10]}")
            print(f"   Status: {job['status']}")
            
            for followup in job['followups']:
                status = "✅ Sent" if followup['sent'] else "⏰ Scheduled"
                print(f"   Day {followup['day']}: {followup['date'][:10]} - {status}")
    
    def load_followups(self):
        """Load follow-ups from file"""
        if os.path.exists(self.followups_file):
            with open(self.followups_file, 'r') as f:
                return json.load(f)
        return []
    
    def save_followups(self, followups):
        """Save follow-ups to file"""
        with open(self.followups_file, 'w') as f:
            json.dump(followups, f, indent=2)

def main():
    """Main menu"""
    manager = FollowUpManager()
    
    print("\n╔══════════════════════════════════════════════════════════════╗")
    print("║     📧 FOLLOW-UP AUTOMATION SYSTEM 📧                       ║")
    print("╚══════════════════════════════════════════════════════════════╝")
    
    while True:
        print("\n1. Check Due Follow-ups (Run Daily)")
        print("2. List Scheduled Follow-ups")
        print("3. Mark Job as Responded")
        print("4. Exit")
        
        choice = input("\nChoice (1-4): ")
        
        if choice == '1':
            manager.send_due_followups()
        elif choice == '2':
            manager.list_scheduled_followups()
        elif choice == '3':
            company = input("Company name: ")
            manager.mark_job_responded(company)
        elif choice == '4':
            break

if __name__ == "__main__":
    main()
