// Sentry Error Tracking
// Real-time error monitoring with auto-alerts

const Sentry = require('@sentry/node');

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN || 'https://your-dsn@sentry.io/project-id',
  environment: process.env.NODE_ENV || 'development',
  tracesSampleRate: 1.0,
  
  // Custom error filtering
  beforeSend(event, hint) {
    // Filter out known non-critical errors
    const error = hint.originalException;
    if (error && error.message) {
      // Ignore cache-related warnings
      if (error.message.includes('cache')) {
        return null;
      }
    }
    return event;
  }
});

class ErrorTracker {
  constructor() {
    this.initialized = !!process.env.SENTRY_DSN;
    if (!this.initialized) {
      console.log('⚠️  Sentry DSN not set - using console logging');
    }
  }

  // Track error with context
  captureError(error, context = {}) {
    if (this.initialized) {
      Sentry.captureException(error, {
        tags: context.tags || {},
        extra: context.extra || {},
        level: context.level || 'error'
      });
    } else {
      console.error('❌ Error:', error.message);
      console.error('   Context:', context);
    }
  }

  // Track message/event
  captureMessage(message, level = 'info', context = {}) {
    if (this.initialized) {
      Sentry.captureMessage(message, {
        level,
        tags: context.tags || {},
        extra: context.extra || {}
      });
    } else {
      console.log(`[${level.toUpperCase()}] ${message}`);
    }
  }

  // Track deployment issue
  trackDeploymentIssue(issue, details) {
    this.captureError(new Error(issue), {
      tags: {
        type: 'deployment',
        severity: 'critical'
      },
      extra: details
    });
  }

  // Track live site issue
  trackLiveSiteIssue(page, issue, details) {
    this.captureError(new Error(`Live site issue: ${page}`), {
      tags: {
        type: 'live_site',
        page,
        severity: 'high'
      },
      extra: {
        issue,
        ...details
      }
    });
  }

  // Track test failure
  trackTestFailure(testName, error, details) {
    this.captureError(error, {
      tags: {
        type: 'test_failure',
        test: testName,
        severity: 'medium'
      },
      extra: details
    });
  }

  // Set user context
  setUser(userId, email) {
    if (this.initialized) {
      Sentry.setUser({ id: userId, email });
    }
  }

  // Add breadcrumb
  addBreadcrumb(message, category, data = {}) {
    if (this.initialized) {
      Sentry.addBreadcrumb({
        message,
        category,
        data,
        level: 'info'
      });
    }
  }
}

// Usage example
async function demo() {
  const tracker = new ErrorTracker();

  // Track deployment issue
  tracker.trackDeploymentIssue('Build failed - file too large', {
    file: 'linkedin-posts.docx',
    size: '29.1 MB',
    limit: '25 MB'
  });

  // Track live site issue
  tracker.trackLiveSiteIssue('/spo.html', '308 redirect', {
    expected: '200 OK',
    actual: '308 Permanent Redirect',
    duration: '12 hours'
  });

  // Track test failure
  try {
    throw new Error('SPO form validation not working');
  } catch (error) {
    tracker.trackTestFailure('SPO form test', error, {
      test_file: 'playwright-live-site-test.js',
      line: 45
    });
  }

  console.log('✅ Error tracking demo complete');
}

module.exports = ErrorTracker;

// Run demo if called directly
if (require.main === module) {
  demo();
}
