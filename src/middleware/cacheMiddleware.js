const redis = require('../config/redis');

const cacheMiddleware = (ttl = 60) => async (req, res, next) => {
  const key = `cache:${req.originalUrl}`;

  try {
    const cached = await redis.get(key);
    if (cached) {
      console.log(`Cache hit: ${key}`);
      return res.json(JSON.parse(cached));
    }

    const originalJson = res.json.bind(res);
    res.json = async (data) => {
      await redis.setex(key, ttl, JSON.stringify(data));
      return originalJson(data);
    };

    next();
  } catch (err) {
    next(); // we can omit redis error and continue with db 
  }
};

module.exports = cacheMiddleware;