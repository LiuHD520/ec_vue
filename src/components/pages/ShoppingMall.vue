<template>
    <div>
        <div class="search-bar">
            <van-row class="test-row">
                <van-col span="3">
                    <img :src="locationIcon" width="80%" class="location-icon">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input" placeholder="查找"/>
                </van-col>
                <van-col span="5"><van-button size="mini">查找</van-button></van-col>
            </van-row>
        </div>
        <!-- swiper area -->
        <div class="swiper-area">
            <van-swipe :autoplay="2000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.image" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- type bar -->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!-- adbanner area -->
        <div>
            <img v-lazy="adBanner" width="100%"/>
        </div>
        <!--Recommend goods area-->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <!--swiper-->
                <swiper :options="swiperOption">
                    <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                                <img :src="item.image" width="80%" />
                                <div>{{item.goodsName}}</div>
                                <div>￥{{item.price}} (￥{{item.mallPrice}})</div>  
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    export default {
        data () {
            return {
                swiperOption:{
                    slidesPerView:3
                },
                locationIcon: require('../../assets/images/location.png'),
                bannerPicArray:[],
                category:[],
                adBanner:'',
                recommendGoods:[],
                floor1:[],
                floor1_0:{},
                floor1_1:{},
                floor1_2:{},
                floor1_3:{}
            }
        },
        components:{swiper,swiperSlide},
        created(){
            axios({
                url:'https://www.easy-mock.com/mock/5b138bbae2546c72e6c64f70/ecVues/index',
                method:'get'
            })
            .then(response => {
                console.log(response)
                if (response.status == 200) {
                    this.category = response.data.data.category;
                    this.bannerPicArray = response.data.data.slides;
                    this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
                    this.recommendGoods = response.data.data.recommend;
                }
            })
            .catch((error) => {     
                console.log(error);
            })
        }
    }
</script>

<style scoped>
    .search-bar {
        height: 2.2rem;
        background-color: #e5017d;
        line-height: 2.8rem;
        overflow: hidden;
    }
    .search-input{
        width:100%;
        height: 1.3rem;
        border-top:0px;
        border-left:0px;
        border-right:0px;
        border-bottom: 1px solid 1px !important ;
        background-color: #e5017d;
        color:#fff;
    }
    .location-icon{
        padding-top: .2rem;
        padding-left: .3rem;
    }
    .swiper-area {
        width: 100%;
        clear: both;
        max-height: 15rem;
        overflow: hidden;
    }
    .type-bar {
        background-color: #fff;
        margin:0 .3rem .3rem .3rem;
        border-radius: .3rem;
        font-size:14px;
        display: flex;
        flex-direction:row;
        flex-wrap:nowrap;
    }
    .type-bar div {
        padding: .3rem;
        font-size: 12px;
        text-align: center;
    }
    .recommend-area{
       background-color: #fff;
       margin-top: .3rem;
    }
    .recommend-title{
        border-bottom:1px solid #eee;
        font-size:14px;
        padding:.2rem;
        color:#e5017d;
    }
    .recommend-body{
       border-bottom: 1px solid #eee;
    }
    
    .recommend-item{
        width:99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;
    }
 
</style>