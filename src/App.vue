<template>
    <div id="app">
        <router-view></router-view>
        <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
    </div>
</template>

<script>
    import FooterGuide from './components/FooterGuide/FooterGuide'
    
    // 请求vuex里的数据的第二种方式  调用映射函数
    import {mapActions} from 'vuex'
    export default {
         async mounted() {
            //  第一种用法 调用vuex中的数据
            // this.$store.dispatch('getAddress')

            // 第二种方式打印用法
            this.getAddress()
            this.getUserInfo()

        },
        methods: {
            // 第二种用法
            ...mapActions(['getAddress','getUserInfo'])
        },
        components:{
            FooterGuide
        },
        
       
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .app
        width 100%
        height 100%
        background #f5f5f5
</style>