// Sentry - Real-time error monitoring
// Add to all HTML pages in <head>

const SENTRY_CONFIG = `
<script
  src="https://browser.sentry-cdn.com/7.91.0/bundle.min.js"
  integrity="sha384-..."
  crossorigin="anonymous"
></script>

<script>
  Sentry.init({
    dsn: "YOUR_SENTRY_DSN_HERE", // Get from sentry.io
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay()
    ],
    
    // Performance Monitoring
    tracesSampleRate: 1.0,
    
    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    
    // Environment
    environment: "production",
    
    // Custom error handling
    beforeSend(event, hint) {
      // Auto-fix common issues
      if (event.exception) {
        const error = event.exception.values[0];
        
        // Auto-reload on critical errors
        if (error.type === 'TypeError' && error.value.includes('undefined')) {
          console.log('Auto-healing: Reloading page...');
          setTimeout(() => location.reload(), 2000);
        }
      }
      
      return event;
    }
  });
  
  // Track custom events
  window.addEventListener('error', (e) => {
    Sentry.captureException(e.error);
  });
  
  // Track user frustration (3+ clicks on same button)
  let clickCounts = {};
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, a');
    if (!target) return;
    
    const key = target.textContent.trim();
    clickCounts[key] = (clickCounts[key] || 0) + 1;
    
    if (clickCounts[key] >= 3) {
      Sentry.captureMessage(\`User frustration: Clicked "\${key}" \${clickCounts[key]} times\`, 'warning');
    }
  });
</script>
`;

// Node.js backend error tracking
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

// Wrap all async functions
function wrapAsync(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  };
}

module.exports = { SENTRY_CONFIG, wrapAsync };
