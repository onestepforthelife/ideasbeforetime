/* Job Search Tool - API Client */

const API_URL = 'https://orange-lab-a038.onestepforthelife.workers.dev/api';

// API Client Class
class JobAPI {
    constructor() {
        this.baseURL = API_URL;
    }

    // Health check
    async healthCheck() {
        try {
            const response = await fetch(`${this.baseURL}/health`);
            return await response.json();
        } catch (error) {
            console.error('Health check failed:', error);
            return { status: 'error', error: error.message };
        }
    }

    // Load all jobs
    async loadJobs() {
        try {
            const response = await fetch(`${this.baseURL}/jobs`);
            const result = await response.json();
            
            if (result.success) {
                return result.jobs;
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error loading jobs:', error);
            // Fallback to localStorage
            const stored = localStorage.getItem('jobSearchResults');
            return stored ? JSON.parse(stored) : [];
        }
    }

    // Get specific job
    async getJob(jobId) {
        try {
            const response = await fetch(`${this.baseURL}/jobs/${jobId}`);
            const result = await response.json();
            
            if (result.success) {
                return result.job;
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error getting job:', error);
            return null;
        }
    }

    // Validate email
    async validateEmail(email) {
        try {
            const response = await fetch(`${this.baseURL}/validate-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error validating email:', error);
            // Basic client-side validation fallback
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return {
                success: true,
                valid: regex.test(email),
                email: email
            };
        }
    }

    // Send email
    async sendEmail(jobId, contactEmail) {
        try {
            const response = await fetch(`${this.baseURL}/send-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ job_id: jobId, contact_email: contactEmail })
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error sending email:', error);
            return { success: false, error: error.message };
        }
    }

    // Trigger job agent
    async triggerAgent(keywords = '', location = 'Singapore') {
        try {
            const response = await fetch(`${this.baseURL}/trigger-agent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keywords, location })
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error triggering agent:', error);
            return { success: false, error: error.message };
        }
    }

    // Get agent status
    async getAgentStatus() {
        try {
            const response = await fetch(`${this.baseURL}/agent-status`);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error getting agent status:', error);
            return { success: false, running: false };
        }
    }

    // Clear all jobs
    async clearJobs() {
        try {
            const response = await fetch(`${this.baseURL}/clear-jobs`, {
                method: 'POST'
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error clearing jobs:', error);
            return { success: false, error: error.message };
        }
    }

    // Get stats
    async getStats() {
        try {
            const response = await fetch(`${this.baseURL}/stats`);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error getting stats:', error);
            return { success: false, stats: { total: 0, sent: 0, pending: 0 } };
        }
    }
}

// Create global instance
const jobAPI = new JobAPI();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { JobAPI, jobAPI };
}

