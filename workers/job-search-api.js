/**
 * Cloudflare Worker - Job Search API
 * Serverless backend for Job Search Tool
 */

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Main request handler
export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // Route requests
      if (path === '/api/health') {
        return handleHealth();
      } else if (path === '/api/search-jobs') {
        return handleJobSearch(request, env);
      } else if (path === '/api/generate-email') {
        return handleGenerateEmail(request, env);
      } else if (path === '/api/send-email') {
        return handleSendEmail(request, env);
      } else if (path === '/api/validate-email') {
        return handleValidateEmail(request);
      } else {
        return jsonResponse({ error: 'Not found' }, 404);
      }
    } catch (error) {
      return jsonResponse({ error: error.message }, 500);
    }
  },
};

// Health check
function handleHealth() {
  return jsonResponse({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
}

// Search jobs using LinkedIn/Indeed APIs
async function handleJobSearch(request, env) {
  const { keywords, location } = await request.json();

  if (!keywords) {
    return jsonResponse({ error: 'Keywords required' }, 400);
  }

  // TODO: Integrate with job search APIs
  // For now, return mock data structure
  const jobs = await searchJobsFromAPIs(keywords, location, env);

  return jsonResponse({
    success: true,
    count: jobs.length,
    jobs: jobs,
    timestamp: new Date().toISOString(),
  });
}

// Search jobs from various APIs
async function searchJobsFromAPIs(keywords, location, env) {
  // This would integrate with:
  // - LinkedIn Jobs API
  // - Indeed API
  // - RapidAPI job search endpoints
  
  // Mock implementation for now
  const mockJobs = [
    {
      id: Date.now(),
      title: keywords,
      company: 'Example Corp',
      location: location,
      description: 'Job description here...',
      url: 'https://example.com/job',
      contacts: [],
      matchScore: 85,
    },
  ];

  return mockJobs;
}

// Generate personalized email using AI
async function handleGenerateEmail(request, env) {
  const { job, profile } = await request.json();

  if (!job || !profile) {
    return jsonResponse({ error: 'Job and profile required' }, 400);
  }

  // Use Cloudflare AI or OpenAI API
  const email = await generateEmailWithAI(job, profile, env);

  return jsonResponse({
    success: true,
    email: email,
    timestamp: new Date().toISOString(),
  });
}

// Generate email with AI
async function generateEmailWithAI(job, profile, env) {
  // Option 1: Use Cloudflare Workers AI (free tier)
  // Option 2: Use OpenAI API (requires API key in env)
  
  const prompt = `Generate a professional job application email for:
Job: ${job.title} at ${job.company}
Candidate: ${profile.name}
Experience: ${profile.experience}

Email should be:
- Professional and concise
- Highlight relevant experience
- Show enthusiasm
- Include call to action`;

  // Mock implementation
  const email = {
    subject: `Work Capability Available | ${job.title} – ${job.company}`,
    body: `Dear Hiring Manager,

I am writing to express my interest in the ${job.title} position at ${job.company}.

With ${profile.experience} years of experience in ${profile.expertise}, I believe I would be a strong fit for this role.

I would welcome the opportunity to discuss how my background aligns with your needs.

Best regards,
${profile.name}`,
  };

  return email;
}

// Send email via SMTP or email API
async function handleSendEmail(request, env) {
  const { to, subject, body, from } = await request.json();

  if (!to || !subject || !body) {
    return jsonResponse({ error: 'Missing required fields' }, 400);
  }

  // Use email service (SendGrid, Mailgun, or Resend)
  const result = await sendEmailViaAPI(to, subject, body, from, env);

  return jsonResponse({
    success: result.success,
    message: result.message,
    timestamp: new Date().toISOString(),
  });
}

// Send email via API
async function sendEmailViaAPI(to, subject, body, from, env) {
  // This would use an email service API
  // For now, return mock success
  
  return {
    success: true,
    message: 'Email sent successfully',
  };
}

// Validate email address
async function handleValidateEmail(request) {
  const { email } = await request.json();

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const domain = email.split('@')[1] || '';

  return jsonResponse({
    success: true,
    email: email,
    valid: isValid,
    domain: domain,
    checks: {
      format: isValid,
      domain_exists: true, // TODO: Add DNS lookup
    },
  });
}

// Helper: JSON response with CORS
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}
