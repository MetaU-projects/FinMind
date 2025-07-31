const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL, {
    tls: {}
});

const getOrSetCache = async (key, ttl, fetcher) => {
    const cached = await redis.get(key);
    if (cached) {
        return JSON.parse(cached);
    }

    try {
        const freshData = await fetcher();
        await redis.set(key, JSON.stringify(freshData), 'EX', ttl);
        return freshData;
    } catch (err) {
        throw err;
    }
}

const invalidateCache = (key) => {
    return redis.del(key);
}

module.exports = { getOrSetCache, invalidateCache };