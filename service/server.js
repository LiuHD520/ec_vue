const Koa = require('koa')
const app = new Koa()
const mysql = require('mysql')
const bcrypt = require('bcrypt');
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')


/****
 * request=请求
 * response=响应、回应
 * 
 * *****/ 

app.use(bodyparser())
app.use(cors())

let user = require('./appAPI/user.js')
let home = require('./appAPI/home.js')


// 装载所有子路由
let router = new Router()
router.use('/user', user.routes())
router.use('/home', home.routes())

// egg.js大型项目路由项目配置

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

app.use(async(ctx)=>{
    ctx.body='<h1>Hello Koa2</h1>'
})
app.listen(8081,()=>{
    console.log('server starting at part 8081')
})