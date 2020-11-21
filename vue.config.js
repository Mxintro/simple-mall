const cdn = {
  css: [],
  js: [
    "https://cdn.staticfile.org/vue/2.6.12/vue.min.js",
    "https://cdn.staticfile.org/vue-router/3.4.3/vue-router.min.js",
    "https://cdn.staticfile.org/axios/0.20.0/axios.min.js",
    "https://unpkg.com/vuex@3.5.1/dist/vuex.js",
    "https://unpkg.com/vue-lazyload/vue-lazyload.js"
  ]
}

module.exports = {
  publicPath:'/mall', //部署目录
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  chainWebpack: config => {
    // 生产环境配置
    config.when(process.env.NODE_ENV === 'production',config=>{
      //entry找到默认的打包入口，调用clear则是删除默认的打包入口
      //add添加新的打包入口
      // config.entry('app').clear().add('./src/main-prod.js')

      //使用externals设置排除项,包名：全局变量名
      config.set('externals',{
        'vue':'Vue',
        'vue-router':'VueRouter',
        'axios':'axios',
        'vuex': 'Vuex',
        'vue-lazyload': 'VueLazyload'
      })

      config.plugin('html').tap(args=>{
        //添加参数isProd
        args[0].cdn = cdn;
        return args
      })
    })
  },
}
