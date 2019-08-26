const redis = require('redis');
const client = redis.createClient(6379, 'localhost');

client.on('ready', (err, val) => {
    console.log(`redis client is ready`);
})

client.on('connect', () => {
    console.log(`redis client is connect`);
})

client.on('reconnecting', () => {
    console.warn('redis client is reconnecting');
})

client.on('error', () => {
    console.error('redis client is error');
})
/**
 * 基础的数据获取
 */
client.set('hello', 'Mr.D');
client.get('hello', function (err, val) {
    console.log('redis key:', val)

})

/**
 * 对象的数据获取
 */

client.hmset('userProfile', {
    uuid: '00000000-0000-0000-C000-000000000046',
    username: 'Mr.D',
    age: 21,
    isMaster: true,
})
client.hgetall("userProfile", function (err, obj) {
    console.dir(obj);
});


/**
 * 对象失效时间设置。如果使用session+redis的模式，那么需要设置失效时间来表示是否超时
 */
client.set('hi', 'Mr.D duration 5 seconds', 'EX', 5);
setTimeout(() => {
    client.get('hi', function (err, val) {
        console.log('at 4 seconds redis key:', val)
    })
}, 4000);

setTimeout(() => {
    client.get('hi', function (err, val) {
        console.log('at 6 seconds redis key:', val)
    })
}, 6000);
/**
 * 在与Redis服务器的底层套接字连接上调用unref（），允许程序在没有更多命令挂起时退出。
 * 一般不会调用这个api 
 */
client.unref();
client.get("hi", function (err, value) {
    if (err) throw (err)
    console.log('after unref' + value)
})

/**
 *参考
 * https://www.npmjs.com/package/redis
 */