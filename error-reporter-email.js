/**
 * AUTOMATIC EMAIL ERROR REPORTER
 * Sends errors to your email automatically - no laptop needed!
 * 
 * Uses: EmailJS (FREE - 200 emails/month)
 */

class EmailErrorReporter {
    constructor() {
        this.emailJSConfig = {
            publicKey: 'YOUR_EMAILJS_PUBLIC_KEY', // Get from emailjs.com
            serviceID: 'YOUR_SERVICE_ID',
            templateID: 'YOUR_TEMPLATE_ID'
        };
        
        this.recipientEmail = 'onestepforthelife@gmail.com';
        this.errorQueue = [];
        this.lastSentTime = 0;
        this.minInterval = 60000; // Don't spam - max 1 email per minute
        
        this.init();
    }

    init() {
        // Load EmailJS library
        if (!window.emailjs) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = () => {
                emailjs.init(this.emailJSConfig.publicKey);
                console.log('✅ Email error reporting initialized');
            };
            document.head.appendChild(script);
        }

        // Send queued errors every minute
        setInterval(() => this.sendQueuedErrors(), 60000);
    }

    reportError(error) {
        // Determine severity
        const severity = this.determineSeverity(error);
        
        // Add to queue
        this.errorQueue.push({
            ...error,
            severity,
            timestamp: new Date().toISOString()
        });

        // Send immediately if critical
        if (severity === 'CRITICAL') {
            this.sendImmediately(error);
        }
    }

    determineSeverity(error) {
        // CRITICAL errors (need immediate attention)
        const criticalKeywords = [
            'payment', 'pay', 'razorpay', 'checkout',
            'form submit', 'cannot proceed',
            'site down', '404', 'crash'
        ];

        const errorText = JSON.stringify(error).toLowerCase();
        
        for (const keyword of criticalKeywords) {
            if (errorText.includes(keyword)) {
                return 'CRITICAL';
            }
        }

        // Check if multiple users affected
        if (error.affectedUsers && error.affectedUsers > 3) {
            return 'CRITICAL';
        }

        return 'MINOR';
    }

    async sendImmediately(error) {
        const now = Date.now();
        
        // Prevent spam
        if (now - this.lastSentTime < this.minInterval) {
            console.log('⏳ Waiting before sending next email...');
            return;
        }

        await this.sendEmail([error]);
        this.lastSentTime = now;
    }

    async sendQueuedErrors() {
        if (this.errorQueue.length === 0) return;

        // Group errors by severity
        const critical = this.errorQueue.filter(e => e.severity === 'CRITICAL');
        const minor = this.errorQueue.filter(e => e.severity === 'MINOR');

        if (critical.length > 0) {
            await this.sendEmail(critical, 'CRITICAL');
        }

        if (minor.length > 0) {
            await this.sendEmail(minor, 'MINOR');
        }

        // Clear queue
        this.errorQueue = [];
    }

    async sendEmail(errors, severity = 'MINOR') {
        if (!window.emailjs) {
            console.error('❌ EmailJS not loaded');
            return;
        }

        const subject = severity === 'CRITICAL' 
            ? `🚨 CRITICAL ERROR: ${errors[0].type}`
            : `⚠️ Error Report: ${errors.length} issues detected`;

        const body = this.formatEmailBody(errors, severity);

        try {
            await emailjs.send(
                this.emailJSConfig.serviceID,
                this.emailJSConfig.templateID,
                {
                    to_email: this.recipientEmail,
                    subject: subject,
                    message: body,
                    severity: severity
                }
            );

            console.log(`✅ Email sent: ${subject}`);
        } catch (error) {
            console.error('❌ Failed to send email:', error);
        }
    }

    formatEmailBody(errors, severity) {
        let body = `
╔══════════════════════════════════════════════════════════════╗
║  ${severity === 'CRITICAL' ? '🚨 CRITICAL' : '⚠️ MINOR'} ERROR REPORT - Ideas Before Time  ║
╚══════════════════════════════════════════════════════════════╝

Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
Total Errors: ${errors.length}
Severity: ${severity}

`;

        errors.forEach((error, index) => {
            body += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERROR #${index + 1}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type: ${error.type}
Element: ${error.element || error.text || 'Unknown'}
Page: ${error.page}
${error.clicks ? `Clicks: ${error.clicks} times` : ''}
${error.affectedUsers ? `Users Affected: ${error.affectedUsers}` : ''}
Time: ${new Date(error.timestamp).toLocaleTimeString('en-IN')}

${error.details ? `Details: ${error.details}` : ''}

`;
        });

        body += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOMMENDED ACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${severity === 'CRITICAL' ? `
🚨 URGENT: Fix this immediately!
1. Check the page: https://ideasbeforetime.pages.dev${errors[0].page}
2. Test the broken element yourself
3. Fix and redeploy
4. Verify fix works

` : `
⚠️ Fix when possible:
1. Review errors above
2. Prioritize by frequency
3. Fix and test
4. Monitor for recurrence
`}

View Full Analytics:
https://analytics.google.com/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is an automated error report from your website.
To stop receiving these emails, remove error-reporter-email.js from your site.
`;

        return body;
    }

    // Daily summary email (call this once per day)
    async sendDailySummary(stats) {
        const subject = `📊 Daily Error Report - ${new Date().toLocaleDateString('en-IN')}`;
        
        const body = `
╔══════════════════════════════════════════════════════════════╗
║         📊 DAILY ERROR SUMMARY - Ideas Before Time          ║
╚══════════════════════════════════════════════════════════════╝

Date: ${new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}

OVERVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Total Visitors: ${stats.totalVisitors}
🚨 Total Errors: ${stats.totalErrors}
⚠️ Critical Errors: ${stats.criticalErrors}
📊 Error Rate: ${((stats.totalErrors / stats.totalVisitors) * 100).toFixed(2)}%

TOP 3 ISSUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${stats.topIssues.map((issue, i) => `
${i + 1}. ${issue.severity === 'CRITICAL' ? '🚨' : '⚠️'} ${issue.description}
   Affected: ${issue.count} users
   Page: ${issue.page}
`).join('')}

ACTION REQUIRED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${stats.criticalErrors > 0 ? '🚨 Fix critical errors today!' : '✅ No critical errors - good job!'}

View Full Report:
https://analytics.google.com/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

        await this.sendEmail([{ type: 'Daily Summary', page: 'All Pages' }], 'SUMMARY');
    }
}

// Initialize automatically
if (typeof window !== 'undefined') {
    window.emailErrorReporter = new EmailErrorReporter();
    
    // Connect to main error tracker
    if (window.userErrorTracker) {
        const originalReport = window.userErrorTracker.reportError.bind(window.userErrorTracker);
        window.userErrorTracker.reportError = function(error) {
            originalReport(error);
            window.emailErrorReporter.reportError(error);
        };
    }
}

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to https://www.emailjs.com/
 * 2. Sign up with onestepforthelife@gmail.com
 * 3. Create email service (Gmail)
 * 4. Create template with these fields:
 *    - {{to_email}}
 *    - {{subject}}
 *    - {{message}}
 *    - {{severity}}
 * 5. Get your Public Key, Service ID, Template ID
 * 6. Replace in emailJSConfig above
 * 7. Add to all HTML pages:
 *    <script src="error-tracker.js"></script>
 *    <script src="error-reporter-email.js"></script>
 * 
 * DONE! Errors will email you automatically!
 */
