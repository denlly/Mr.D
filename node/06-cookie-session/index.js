const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');
app.keys = ['my secret']

const SESSION_CONFIG = {
    // cookie键名 
    key: 'D:Session',
    // 有效期，默认一天 
    maxAge: 60 * 12 * 24,
    // 客户端无法获取
    httpOnly: true,
    // 签名cookie
    // 有签名，就会在Response.headers有下面这句话
    // Set-Cookie: D:Session.sig=l0Z0oplLco9SCX6BYEE-txGyO9k; path=/; expires=Sun, 25 Aug 2019 22:20:34 GMT; httponly
    signed: true,
}
app.use(session(SESSION_CONFIG, app));
app.use(ctx => {
    if (ctx.path === '/favicon.ico') {
        return;
    }
    let n = ctx.session.count || 0;
    console.log(n)
    ctx.session.count = ++n,
        ctx.body = `hello Mr.D! You visited ${ctx.session.count} times`;
})
app.listen(3000)