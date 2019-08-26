const http = require('http');
const session = {};

http.createServer((req, res) => {
        if (req.url === 'favicon.ico') {
            res.end('');
            return;
        }
        // 观察cookie存在，当然第一次是 是没有cookie
        console.log('cookie:', req.headers.cookie);
        res.setHeader("Set-Cookie", 'my_cookie=Im a handsome person');
        res.end('hello cookie!!');
    })
    .listen(3000)