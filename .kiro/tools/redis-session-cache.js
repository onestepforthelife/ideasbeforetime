// Redis Session Cache
// Fast key-value store for within-session context

const redis = require('redis');

class SessionCache {
  constructor() {
    this.client = null;
    this.connected = false;
  }

  async connect() {
    try {
      this.client = redis.createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
      });

      this.client.on('error', (err) => {
        console.error('❌ Redis error:', err);
        this.connected = false;
      });

      await this.client.connect();
      this.connected = true;
      console.log('✅ Redis connected');
      return true;
    } catch (error) {
      console.error('❌ Redis connection failed:', error.message);
      console.log('💡 Falling back to in-memory cache');
      this.fallbackCache = new Map();
      return false;
    }
  }

  async set(key, value, expirySeconds = 3600) {
    if (this.connected) {
      await this.client.setEx(key, expirySeconds, JSON.stringify(value));
    } else {
      this.fallbackCache.set(key, value);
    }
  }

  async get(key) {
    if (this.connected) {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } else {
      return this.fallbackCache.get(key) || null;
    }
  }

  async has(key) {
    if (this.connected) {
      return await this.client.exists(key) === 1;
    } else {
      return this.fallbackCache.has(key);
    }
  }

  async delete(key) {
    if (this.connected) {
      await this.client.del(key);
    } else {
      this.fallbackCache.delete(key);
    }
  }

  async clear() {
    if (this.connected) {
      await this.client.flushDb();
    } else {
      this.fallbackCache.clear();
    }
  }

  async disconnect() {
    if (this.connected) {
      await this.client.quit();
      this.connected = false;
    }
  }
}

// Usage example
async function demo() {
  const cache = new SessionCache();
  await cache.connect();

  // Cache steering file content
  await cache.set('steering:kiro_rules', {
    rule0: 'Site is LIVE',
    rule31: 'Pre-approved error correction',
    lastRead: Date.now()
  });

  // Cache diagnostic results
  await cache.set('diagnostic:last_run', {
    timestamp: Date.now(),
    issues: 0,
    status: 'passed'
  }, 1800); // 30 min expiry

  // Retrieve
  const rules = await cache.get('steering:kiro_rules');
  console.log('📋 Cached rules:', rules);

  await cache.disconnect();
}

module.exports = SessionCache;

// Run demo if called directly
if (require.main === module) {
  demo();
}
