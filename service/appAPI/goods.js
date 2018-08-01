const Router = require('koa-router')
const mysql = require('mysql')
const fs = require('fs')

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

/******获取商品详情的信息入口 */
router.post('/getDetailGoodsInfo', async(ctx)=>{
    try {
        let goodsId = ctx.request.body.goodsId;
        let goodsInfo = await sqlQ('select * from goods where ID=?', [goodsId]);
        // console.log(goodsInfo)
        ctx.body={
            code: 200,
            msg: '请求成功',
            result: goodsInfo[0]
        }
    } catch(error) {
        ctx.body={
            code: 500,
            msg: '服务器出错',
            result: error
        }
    }
})

//**读取大类数据的接口 */
router.get('/getCategoryList',async(ctx)=>{
    try{
        let result = await sqlQ('select * from category', []);
        // console.log(result)
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})

/**读取小类的数据 */
router.post('/getCategorySubList',async(ctx)=>{
    try{
        let cateoryId = ctx.request.body.categoryId
        let result = await sqlQ('select * from category_sub where MALL_CATEGORY_ID=?', [cateoryId]);
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})

/**根据类别获取商品列表 */
router.post('/getGoodsListByCategorySubID',async(ctx)=>{
    try {
        let categorySubId = ctx.request.body.categorySubId //子类ID
        let page = ctx.request.body.page // 当前页数
        let num = ctx.request.body.num || 10 //每页显示数量
        let start = (page-1)*num
        let end = num
        // console.log(categorySubId, page, num)
        let result = await sqlQ(`select * from goods where SUB_ID=? limit ?,?`, [categorySubId,start,end]);
        ctx.body={code:200,message:result}
    } catch(error) {
        ctx.body={code:500,message:error}
    }  
})

module.exports = router;
