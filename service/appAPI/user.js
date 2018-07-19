const Router = require('koa-router')
const mysql = require('mysql')

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
        let userInto = await sqlQ('INSERT INTO user (userName, password, createAt) VALUE (?,?,?)', [postVal.username, postVal.password, postVal.createAt]);
        console.log(userInto)
        ctx.body={
            code:200,
            message:'注册成功'
        }
    } else {
        ctx.body={
            code:200,
            message:'该用户名已经存在'
        }
    }
    
})


module.exports = router;