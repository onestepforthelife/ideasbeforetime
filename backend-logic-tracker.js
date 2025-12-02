/**
 * BACKEND LOGIC TRACKER - Detects Logic Issues, Not Just UI Issues
 * This would have caught the SPO template vs AI problem!
 */

class BackendLogicTracker {
    constructor() {
        this.apiCalls = [];
        this.logicIssues = [];
        this.init();
    }

    init() {
        this.interceptFetch();
        this.monitorAIGeneration();
        this.validateDataQuality();
        console.log('🔍 Backend Logic Tracker Active');
    }

    // IMPROVEMENT 1: Track ALL API calls
    interceptFetch() {
        const originalFetch = window.fetch;
        const tracker = this;
        
        window.fetch = function(...args) {
            const url = args[0];
            const startTime = Date.now();
            
            // Log API call attempt
            tracker.logAPICall({
                url: url,
                timestamp: startTime,
                status: 'ATTEMPTED'
            });
            
            return originalFetch.apply(this, args)
                .then(response => {
                    const endTime = Date.now();
                    
                    // Log successful API call
                    tracker.logAPICall({
                        url: url,
                        timestamp: endTime,
                        status: response.ok ? 'SUCCESS' : 'FAILED',
                        statusCode: response.status,
                        duration: endTime - startTime
                    });
                    
                    // Check if this is Gemini API
                    if (url.includes('generativelanguage.googleapis.com')) {
                        tracker.validateAIResponse(response.clone());
                    }
                    
                    return response;
                })
                .catch(error => {
                    // Log failed API call
                    tracker.logAPICall({
                        url: url,
                        timestamp: Date.now(),
                        status: 'ERROR',
                        error: error.message
                    });
                    throw error;
                });
        };
    }

    // IMPROVEMENT 2: Monitor AI generation specifically
    monitorAIGeneration() {
        // Hook into AIEngine if it exists
        if (window.AIEngine) {
            const originalGenerate = window.AIEngine.generate;
            const tracker = this;
            
            window.AIEngine.generate = async function(userData) {
                const startTime = Date.now();
                
                try {
                    const result = await originalGenerate.call(this, userData);
                    const endTime = Date.now();
                    
                    // Validate if this is real AI or template
                    tracker.validateAIOutput(result, userData, endTime - startTime);
                    
                    return result;
                } catch (error) {
                    tracker.reportLogicIssue({
                        type: 'AI_GENERATION_FAILED',
                        error: error.message,
                        userData: userData
                    });
                    throw error;
                }
            };
        }
    }

    // IMPROVEMENT 3: Validate AI output quality
    validateAIOutput(result, userData, duration) {
        const issues = [];
        
        // Check 1: Is output unique?
        if (this.isTemplatePattern(result.headline)) {
            issues.push('TEMPLATE_DETECTED: Headline follows template pattern');
        }
        
        // Check 2: Was API actually called?
        const recentAPICalls = this.apiCalls.filter(call => 
            call.url.includes('generativelanguage.googleapis.com') && 
            Date.now() - call.timestamp < 10000
        );
        
        if (recentAPICalls.length === 0) {
            issues.push('NO_API_CALL: AI generation without API call detected');
        }
        
        // Check 3: Is generation too fast? (templates are instant)
        if (duration < 500) {
            issues.push('TOO_FAST: Generation completed in ' + duration + 'ms (suspicious)');
        }
        
        // Check 4: Is output contextual?
        if (!this.isContextual(result, userData)) {
            issues.push('NOT_CONTEXTUAL: Output doesn\'t match input data');
        }
        
        // Report issues
        if (issues.length > 0) {
            this.reportLogicIssue({
                type: 'AI_QUALITY_ISSUE',
                issues: issues,
                result: result,
                userData: userData,
                duration: duration
            });
        }
    }

    // Check if output follows template pattern
    isTemplatePattern(text) {
        const templatePatterns = [
            /\w+ \| \w+ Expert \| Driving/,
            /Professional \| .+ \| Strategic/,
            /\w+ Engineer \| .+ Expert/
        ];
        
        return templatePatterns.some(pattern => pattern.test(text));
    }

    // Check if output is contextual to input
    isContextual(result, userData) {
        if (!userData.currentBio) return true; // Can't validate without input
        
        const inputWords = userData.currentBio.toLowerCase().split(' ');
        const outputWords = result.headline.toLowerCase().split(' ');
        
        // At least 20% of input words should appear in output
        const commonWords = inputWords.filter(word => 
            outputWords.some(outWord => outWord.includes(word) || word.includes(outWord))
        );
        
        return commonWords.length / inputWords.length > 0.2;
    }

    // IMPROVEMENT 4: Validate API responses
    async validateAIResponse(response) {
        try {
            const data = await response.json();
            
            if (!data.candidates || !data.candidates[0]) {
                this.reportLogicIssue({
                    type: 'INVALID_AI_RESPONSE',
                    message: 'Gemini API returned invalid response structure'
                });
            }
        } catch (error) {
            this.reportLogicIssue({
                type: 'AI_RESPONSE_PARSE_ERROR',
                error: error.message
            });
        }
    }

    // Log API calls
    logAPICall(callData) {
        this.apiCalls.push(callData);
        
        // Keep only last 50 calls
        if (this.apiCalls.length > 50) {
            this.apiCalls.shift();
        }
        
        console.log('🌐 API Call:', callData);
    }

    // Report logic issues
    reportLogicIssue(issue) {
        issue.timestamp = Date.now();
        issue.page = window.location.pathname;
        
        this.logicIssues.push(issue);
        
        console.error('🚨 Logic Issue Detected:', issue);
        
        // Send alert email
        this.sendLogicAlert(issue);
        
        // Store in localStorage for debugging
        try {
            localStorage.setItem('logicIssues', JSON.stringify(this.logicIssues));
        } catch (e) {
            console.error('Failed to store logic issues:', e);
        }
    }

    // Send alert for logic issues
    sendLogicAlert(issue) {
        const subject = `🚨 Logic Issue: ${issue.type}`;
        const body = `
LOGIC ISSUE DETECTED
===================

Type: ${issue.type}
Page: ${issue.page}
Time: ${new Date(issue.timestamp).toLocaleString()}

Details:
${JSON.stringify(issue, null, 2)}

This issue was automatically detected by Backend Logic Tracker.
        `;
        
        console.log('📧 Logic Alert:', { subject, body });
        
        // In production, send via email API
        // fetch('/api/send-alert', { method: 'POST', body: JSON.stringify({ subject, body }) });
    }

    // IMPROVEMENT 5: Proactive monitoring
    validateDataQuality() {
        setInterval(() => {
            this.checkForSuspiciousPatterns();
        }, 30000); // Check every 30 seconds
    }

    checkForSuspiciousPatterns() {
        // Check if user is getting same results repeatedly
        const recentGenerations = this.logicIssues.filter(issue => 
            issue.type === 'AI_QUALITY_ISSUE' && 
            Date.now() - issue.timestamp < 300000 // Last 5 minutes
        );
        
        if (recentGenerations.length > 3) {
            this.reportLogicIssue({
                type: 'REPEATED_QUALITY_ISSUES',
                message: 'Multiple AI quality issues detected in short time',
                count: recentGenerations.length
            });
        }
    }

    // Get report for debugging
    getReport() {
        return {
            apiCalls: this.apiCalls,
            logicIssues: this.logicIssues,
            summary: {
                totalAPICalls: this.apiCalls.length,
                successfulCalls: this.apiCalls.filter(c => c.status === 'SUCCESS').length,
                failedCalls: this.apiCalls.filter(c => c.status === 'FAILED').length,
                logicIssues: this.logicIssues.length
            }
        };
    }
}

// Initialize automatically
if (typeof window !== 'undefined') {
    window.backendLogicTracker = new BackendLogicTracker();
    
    // Add debug command
    window.getLogicReport = () => window.backendLogicTracker.getReport();
    
    console.log('✅ Backend Logic Tracker initialized');
    console.log('💡 Use getLogicReport() to see tracking data');
}