<template>
  <div class="msite">
    <!--首页头部-->
    
    
    <HeaderTop :title="address.name">
          <router-link class="header_search" slot="left" to="/search">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
          
          <router-link class="header_login" slot='right' :to="userInfo._id ? '/userinfo' : '/login'">
            <span class="header_login_text" v-if="!userInfo._id">
              登录|注册
            </span>
            <span class="header_login_text" v-else>
              <i class="iconfont icon-person"></i>
            </span>
          </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl+category.image_url" />
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </div>
</template>

<script>

// 引入swiper
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
// 引入公共头部
import HeaderTop from '../../components/HeaderTop/HeaderTop'
// 引入静态组件shoplist
import ShopList from '../../components/ShopList/ShopList'
   // 使用vuex中的映射函数
import {mapState} from 'vuex'
export default {
    data(){
        return{
          baseImageUrl:'https://fuss10.elemecdn.com'
        }
    },
    components:{
      HeaderTop, //映射成标签,
      ShopList
    },
    mounted() {
      // 发送数据请求  请求轮播数据
      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')
    },
    computed: {
      // 读状态
      ...mapState(['address','categorys','userInfo']),
      /**根据一维数组 categorys生成一个二维数组   小数组中的元素最大为8 */
      categorysArr(){
        // 先取一维数组
        const {categorys} = this
        //先准备一个空的二维数组
        const arr = []
        // 先准备一个小数组(最大长度为8)
        let minArr = []
        // 遍历categorys
        categorys.forEach(c=>{
         
          // 如果当前minArr已经满了 ，就创建一个新的minArr
          if (minArr.length==8) {
            minArr = []
          }
          
           // 如果当前minArr是空的  把小数组保存到大数组中去
          if (minArr.length==0) {
            arr.push(minArr)
          }
          // 将当前分类保存到小数组中
          minArr.push(c)
        })
        
        
        return arr
      }
    },
    watch: {
      categorys(value){// categorys数组中有数据了，在异步更新界面之前执行
            // 使用settimeout可以实现效果  但是效果不太好  不知道延迟时间具体是多久
            
            // setTimeout(()=>{
            //               // 创建swiper实例对象实现轮播
            //         var mySwiper = new Swiper ('.swiper-container', {
            //           // direction: 'vertical', // 垂直切换选项
            //           loop: true, // 循环模式选项
                      
            //           // 如果需要分页器
            //           pagination: {
            //             el: '.swiper-pagination',
            //           },
                     
            //         })
            // },100)

            //  要实现  界面更新立即创建swiper对象
            this.$nextTick(()=>{  //一但完成界面更新就立即调用 词条语句要写在数据更新之后
                     // 创建swiper实例对象实现轮播
                    var mySwiper = new Swiper ('.swiper-container', {
                      // direction: 'vertical', // 垂直切换选项
                      loop: true, // 循环模式选项
                      
                      // 如果需要分页器
                      pagination: {
                        el: '.swiper-pagination',
                      },
                     
                    })

            })
      }
    },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .msite
        width 100%
        
        .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
                width 100%
                height 100%
                .swiper-wrapper
                    width 100%
                    height 100%
                    .swiper-slide
                        display flex
                        justify-content center
                        align-items flex-start
                        flex-wrap wrap
                        .link_to_food
                            width 25%
                            .food_container
                                display block
                                width 100%
                                text-align center
                                padding-bottom 10px
                                font-size 0
                                img
                                    display inline-block
                                    width 50px
                                    height 50px
                            span
                                display block
                                width 100%
                                text-align center
                                font-size 13px
                                color #666
                .swiper-pagination
                    >span.swiper-pagination-bullet-active
                        background #02a774
        .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
                padding 10px 10px 0
                .shop_icon
                    margin-left 5px
                    color #999
                .shop_header_title
                    color #999
                    font-size 14px
                    line-height 20px
            
</style>    