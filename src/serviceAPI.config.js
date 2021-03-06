const BASEURL = " https://www.easy-mock.com/mock/5b138bbae2546c72e6c64f70/ecVues/"
const LOCALURL = "http://localhost:8081/"
const URL ={
    getShopingMallInfo : BASEURL+'index',    //商城首页所有信息
    getGoodsInfo : BASEURL+'getGoodsInfo', 
    registerUser : LOCALURL+'user/register',  //用户注册接口
    login : LOCALURL+'user/login',  //用户登录接口
    getDetailGoodsInfo : LOCALURL+'goods/getDetailGoodsInfo',  //获取商品详情
    getCategoryList : LOCALURL+'goods/getCategoryList',  //获取大类数据
    getCategorySubList : LOCALURL+'goods/getCategorySubList',  //获取小类数据
    getGoodsListByCategorySubID : LOCALURL+'goods/getGoodsListByCategorySubID',  //据类别获取商品列表
}

module.exports = URL