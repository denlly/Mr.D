const koa = require('koa');
const static = require('koa-static');
const router = require('koa-router')();
const session = require('koa-session')
const bodyParser = require('koa-bodyparser');

const app = new koa();
app.keys = ['my_secret_keys'];
// app.use(cors({
//     credentials: true
// }))


app.use(static(__dirname, '/'));
app.use(bodyParser())
app.use(session(app));

app.use((ctx, next) => {
    // ctx.body = 'You are here'; 
    if (ctx.url.indexOf('login') > 0) {
        next();
    } else {
        console.log('session', ctx.session.userinfo);
        if (!ctx.session.userinfo) {
            ctx.body = {
                message: '请登录'
            }
        } else {
            next();
        }
    }
})

router.post('/login', async (ctx, next) => {
    console.log(JSON.stringify(ctx.request.body, null, 4))

    ctx.session.userinfo = ctx.request.body.username;
    ctx.body = {
        message: '登录成功'
    }
})
router.post('/logout', async (ctx) => {
    ctx.session.usrinfo = undefined;
    ctx.body = {
        message: "登出"
    };
})
router.get('/getUser', async (ctx) => {
    ctx.body = {
        message: "获取数据成功",
        userinfo: ctx.session.userinfo,
        // ctx.session.userinfo;
    }
})
app.use(router.routes())
app.listen(3000);