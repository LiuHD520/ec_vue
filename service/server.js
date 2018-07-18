const Koa = require('koa')
const mysql = require('mysql')
const bcrypt = require('bcrypt');



const app = new Koa()
var db = mysql.createPool({ host: '116.196.82.28', user: 'root', password: 'root', database: 'learn'});

app.use(async(ctx)=>{
    ctx.body='<h1>Hello koa2</h1>'
})


app.listen(8081,()=>{
    console.log('server starting at part 8081')
})