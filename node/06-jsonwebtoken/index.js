const jsonwebtoken = require('jsonwebtoken');
const secret = '12345678';

const opt = {
    secret: 'jwt_secret',
    key: 'user',
}
const user = {
    username: 'Mr_D',
    password: 'this_is_a_password'
}

const token = jsonwebtoken.sign({
    data: user,
    // 设置 token 过期时间
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
}, secret)

console.log('生成token:' + token)
// 生成token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.cccc.OVqCcKo4axS2jvCCNF3BCaj4BjkGqCIhcQ3HI4K8UB0
const verifyResult = jsonwebtoken.verify(token, secret, opt);
console.log('解码:', verifyResult)


console.log('now', new Date().toUTCString(), ' ', new Date().getTime());
console.log('exp', new Date(verifyResult.exp * 1000).toUTCString());
console.log('iat', new Date(verifyResult.iat * 1000).toUTCString());
// 解码: { data: { username: 'Mr_D', password: 'this_is_a_password' },
//  exp: 1546942395,
//  iat: 1546938795 }