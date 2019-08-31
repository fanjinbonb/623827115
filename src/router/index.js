/**

路由器对象模块
*/

//  暴露路由器对象

import Vue from 'vue'
import VueRouter from 'vue-router'

// import Msite from '../views/MSite/MSite.vue'
// import Search from '../views/Search/Search.vue'
// import Order from '../views/Order/Order.vue'
// import Profile from '../views/Profile/Profile.vue'
import Login from '../views/Login/Login.vue'
import Shop from '../views/Shop/Shop'
import ShopGoods from '../views/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../views/Shop/ShopRatings/ShopRatings'
import ShopInfo from '../views/Shop/ShopInfo/ShopInfo'
// 声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
    // 配置所有路由
    routes:[
        {
            path:'/',
            redirect:'/msite'
        },
        {
            path:"/msite",
            component:()=>import('../views/MSite/MSite.vue'),
            meta:{
                showFooter:true
            }
        },
        {
            path:"/search",
            component:() =>import('../views/Search/Search.vue'),
            meta:{
                showFooter:true
            }
        },
        {
            path:"/order",
            component:()=>import('../views/Order/Order.vue'),
            meta:{
                showFooter:true
            }
        },
        {
            path:"/profile",
            component:()=>import('../views/Profile/Profile.vue'),
            meta:{
                showFooter:true
            }
        },
        {
            path:'/login',
            component:Login,
            meta:{
                showFooter:false //默认空数值 可以不设置meta属性
            }
        },
        {
            path:'/shop',
            component:Shop,
            children:[
                {
                    path:"",
                    redirect:'/shop/goods'
                },
                {
                    path:'/shop/goods',
                    component:ShopGoods,
                },
                {
                    path:'/shop/ratings',
                    component:ShopRatings,
                },
                {
                    path:'/shop/info',
                    component:ShopInfo,
                }
            ]
        }
    ]
})