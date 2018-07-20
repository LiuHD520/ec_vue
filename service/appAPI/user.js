const Router = require('koa-router')
const mysql = require('mysql')
const com = require('../libs/common.js')

let router = new Router();
var db = mysql.createPool({ host: '116.196.82.28', user: 'root', password: 'root', database: 'koa2' });
const sqlQ = function (sql, values) {
    return new Promise((resolve, reject) => {
        db.getConnection((err, conn) => {
            if (err) return reject(err)
            conn.query(sql, values, (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
                conn.release()
            })
        })
    })
}

router.get('/',async(ctx)=>{
    ctx.body='这是用户操作首页'
})

router.post('/register',async(ctx)=>{
    var postVal = ctx.request.body;
    let userInfo = await sqlQ('select * from user where userName=?', [postVal.username]);
    if (userInfo.length == 0) {
        let password = com.md5(postVal.password + com.MD5_SUFFIX)
        let userInto = await sqlQ('INSERT INTO user (userName, password, createAt) VALUE (?,?,?)', [postVal.username, password, postVal.createAt]);
        console.log(userInto)
        ctx.body={
            code: 200,
            msg: '注册成功'
        }
    } else {
        ctx.body={
            code: 201,
            msg:'该用户名已存在'
        }
    }  
})

router.post('/login',async(ctx)=>{
    let postVal = ctx.request.body;
    let userInfo = await sqlQ('select * from user where userName=?', [postVal.username]);
    if (userInfo.length) {
        let password = com.md5(postVal.password + com.MD5_SUFFIX)
        if (userInfo[0].password == password) {
            await sqlQ('UPDATE user SET lastLoginAt=? WHERE id=?', [postVal.loginAt, userInfo[0].id]);
            ctx.body={
                code: 200,
                msg: '登录成功'
            }
        } else {
            ctx.body={
                code: 201,
                msg: '密码错误'
            }
        }   
    } else {
        ctx.body={
            code: 201,
            msg:'用户名错误'
        }
    }  
})

module.exports = router;