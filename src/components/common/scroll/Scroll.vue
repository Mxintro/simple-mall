<template>
  <div ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
//better-scroll bug, 无法获取最新内容高度，即使通过监视传入data更新、this.$nextTick、updated等来刷新scroll,
//但任无法事实获取真实内容高度，初步分析：虽然vue中数据已经更新，但bscroll获取高度时浏览器的未渲染
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)

export default {
    name: "Scroll",
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        pullUpLoad: {
            type: Boolean,
            default: true
        },
        //data获取内容数据更新，解决划不动问题
        data: {
          type: Array,
          default: () => {
            return []
        }
      },
    },
    data() {
        return {
            scroll: {},
            i:1
        }
    },
    mounted(){
        setTimeout(this.__initScroll, 20);
    },
    methods: {
        __initScroll(){
            if (!this.$refs.wrapper)return
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: true,
                pullUpLoad: this.pullUpLoad
            })
            
            this.scroll.on("scroll", position => {
                this.$emit("scroll", position)
                // console.log(position);
            })

            this.scroll.on("pullingUp", () => {
                this.$emit("pulling-up")
                
            })
          
        },
        refresh(){
          this.scroll && this.scroll.refresh && this.scroll.refresh()
          // console.log(document.querySelector('.content').children[0].offsetHeight)  
          console.log(`refresh -----------------${this.i++}`)          
        },
        //每次触发上拉事件后，在回调函数的最后，都应该调用 finishPullUp() 方法。
        //在 finishPullUp() 方法调用前不会触发下一次的 pullingUp 事件
        finishPullUp() {
          this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()          
        },
        scrollTo(x, y, time) {
		    this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      }
    },
    watch: {
        data(val){
            setTimeout(this.refresh, 20)
        }
    }
}
</script>

<style scoped>

</style>