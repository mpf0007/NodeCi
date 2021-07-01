const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys =require('../config/keys')

const exec = mongoose.Query.prototype.exec;
const client = redis.createClient(keys.redisUrl);
client.hget = util.promisify(client.hget); // use this for our promis things instead of callbacks

mongoose.Query.prototype.cache = async function (options = {}) {
    this.useCache = true
    this.hashKey = JSON.stringify(options.key || '')
    return this

}

mongoose.Query.prototype.exec = async function () {

    if (!this.useCache) {
        return exec.apply(this, arguments)
    } else {

        const key = JSON.stringify(Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name
        }))

        // see if have a value for 'key' in redis 
        const cacheValue = await client.hget(this.hashKey, key);


        // if we do , return that 
        if (cacheValue) {
            const doc = JSON.parse(cacheValue)

            return Array.isArray(doc)
                ? doc.map(d => new this.model(d))
                : new this.model(doc)
        }

        // otherwise, issue the query and store the result in redis 
        const result = await exec.apply(this, arguments);
        await client.hmset(this.hashKey, key, JSON.stringify(result), 'EX', 10)
        return result
    }
};

module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
}

