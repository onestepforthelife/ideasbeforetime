// Redis - Fast session context storage
// Reduces credit usage by caching within session

const redis = require('redis');

class SessionCache {
  constructor() {
    this.client = redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });
    
    this.client.on('error', (err) => console.log('Redis Error:', err));
    this.client.connect();
  }
  
  // Cache steering file content (avoid re-reading)
  async cacheSteeringFile(filename, content) {
    const key = `steering:${filename}`;
    await this.client.set(key, content, {
      EX: 3600 // Expire after 1 hour
    });
  }
  
  async getSteeringFile(filename) {
    const key = `steering:${filename}`;
    return await this.client.get(key);
  }
  
  // Cache test results (avoid re-running)
  async cacheTestResult(testName, result) {
    const key = `test:${testName}`;
    await this.client.set(key, JSON.stringify(result), {
      EX: 300 // Expire after 5 minutes
    });
  }
  
  async getTestResult(testName) {
    const key = `test:${testName}`;
    const result = await this.client.get(key);
    return result ? JSON.parse(result) : null;
  }
  
  // Cache file list (avoid re-listing)
  async cacheFileList(pattern, files) {
    const key = `files:${pattern}`;
    await this.client.set(key, JSON.stringify(files), {
      EX: 600 // Expire after 10 minutes
    });
  }
  
  async getFileList(pattern) {
    const key = `files:${pattern}`;
    const result = await this.client.get(key);
    return result ? JSON.parse(result) : null;
  }
  
  // Session context (current task, files being worked on)
  async setSessionContext(context) {
    await this.client.set('session:context', JSON.stringify(context), {
      EX: 7200 // Expire after 2 hours
    });
  }
  
  async getSessionContext() {
    const result = await this.client.get('session:context');
    return result ? JSON.parse(result) : null;
  }
  
  // Clear all cache
  async clearAll() {
    await this.client.flushAll();
  }
  
  async close() {
    await this.client.quit();
  }
}

// Usage example
async function example() {
  const cache = new SessionCache();
  
  // Cache steering file to avoid re-reading
  const steeringContent = "... file content ...";
  await cache.cacheSteeringFile("KIRO_RULES.md", steeringContent);
  
  // Get from cache (instant, no file read)
  const cached = await cache.getSteeringFile("KIRO_RULES.md");
  
  // Cache test results
  await cache.cacheTestResult("site-consistency", {
    passed: 45,
    failed: 2,
    timestamp: Date.now()
  });
  
  // Get cached test (no need to re-run)
  const testResult = await cache.getTestResult("site-consistency");
  
  await cache.close();
}

module.exports = SessionCache;
