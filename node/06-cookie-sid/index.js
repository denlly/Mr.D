/**
 * 本例子是描述sid的键值对注入cookie后，callback时候使用sid的值获取session信息
 */
const http = require('http');
const session = {};
const sessionKey = 'sid';
http.createServer((req, res) => {

    if (req.url === '/favicon.ico') {
        return;
    } else {
        const cookie = req.headers.cookie;
        if (cookie && cookie.indexOf('sid') > -1) {
            res.end('Come Back Mr.D');
            console.log('cookie', req.headers.cookie)
            const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
            const sid = pattern.exec(cookie)[1]
            console.log('session:', sid, session, session[sid])
        } else {
            const sid = (Math.random() * 999999999).toFixed(0);
            res.setHeader('Set-Cookie', `${sessionKey} = ${sid}`);
            session[sid] = {
                name: "Mr.D is here!"
            };
            res.end('Hello Mr.D ,there isn\'t cookie');
        }
    }
}).listen(3000, '0.0.0.0', () => {
    console.log('port is 3000')
})