<template>
<div class="hy">
    <div class="swiper" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>
        <slot></slot>
    </div>
    <div class="indicator">
        <div v-for="(item, index) in itemCount" class="indi" :key='index' :class="{active: index === slideIndex-1}">            
        </div>
    </div>
</div>
  
</template>

<script>

export default {
    name: "Swiper",
    props:{
        animDuration: {
            default: 300,
            type: Number,
        },
        moveRatio: {
            type: Number,
            default: 0.25,
        }

    },
    
    data(){
        return {
            itemCount: 0,
            swiperStyle: {},
            swiperWidth: 0,
            slideIndex: 1,
            scrolling: false,
        }
    },

    mounted: function() {
        setTimeout(() => {
            this.handleDom();
            
            this.startTimer();
        }, 300);
        
    },

    methods: {
        startTimer: function() {
            this.playTimer = window.setInterval(()=>{
            this.slideIndex++;
            this.scrollContent(-this.swiperWidth*this.slideIndex);
            }, 2000)
        },

        stopTimer: function(){
            window.clearInterval(this.playTimer);
        },

        checkPosition: function(){
            setTimeout(() => {
                this.swiperStyle.transition = 'transform' + 0 + 'ms';
                if(this.slideIndex > this.itemCount) {
                    this.slideIndex = 1;
                    this.setTransform(-this.swiperWidth);
                }else if(this.slideIndex <= 0) {
                    this.slideIndex = this.itemCount;
                    this.setTransform(-this.slideIndex*this.swiperWidth)
                }
            }, this.animDuration);
            
        },

        scrollContent: function(position) {
            this.scrolling = true;
            this.swiperStyle.transition ='transform '+ this.animDuration + 'ms';
            this.setTransform(position);
            
            this.checkPosition();
            this.scrolling = false;
        },

        setTransform: function(position) {
            this.swiperStyle.transform = `translate(${position}px,0)`;
            this.swiperStyle['-webkit-transform'] = `translate(${position}px,0)`;
            this.swiperStyle['-ms-transform'] = `translate(${position}px,0)`;

        },

        handleDom: function() {
            let swiperEls = document.querySelector('.swiper');
            let slides = document.querySelectorAll('.swiperItem');

            this.itemCount = slides.length;

            if(this.itemCount>1){
                let cloneFirst = slides[0].cloneNode(true);
                let cloneLast = slides[this.itemCount-1].cloneNode(true);
                swiperEls.insertBefore(cloneLast, slides[0]);
                swiperEls.appendChild(cloneFirst);
                this.swiperStyle = swiperEls.style;
                this.swiperWidth = swiperEls.offsetWidth;
                

            }
            this.setTransform(-this.swiperWidth);
        },

        //touch Event
        touchStart: function(e){
            if(this.scrolling === true)return;

           this.stopTimer();
           this.startX = e.touches[0].pageX;
        },
        touchMove: function(e){
            this.currentX = e.touches[0].pageX;
            this.moveDistance = this.startX - this.currentX;
            this.setTransform(-this.slideIndex*this.swiperWidth-this.moveDistance);
        },
        touchEnd: function(e){
            let touchDistance = Math.abs(this.moveDistance);

            if(touchDistance >= this.swiperWidth*this.moveRatio){
                if(this.moveDistance > 0){
                    this.slideIndex++;
                }else if(this.moveDistance < 0){
                    this.slideIndex--;
                }
            }
            this.scrollContent(-this.slideIndex*this.swiperWidth);

            this.startTimer();
        }
    },

}
</script>

<style>
.hy {
    position: relative;
    overflow: hidden;
}

.swiper {
    display: flex;
}

.indicator {
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 8px;
    width: 100%;
}

.indi {
    box-sizing: border-box;
    height: 8px;
    width: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
}

 .indi.active {
    background-color: rgba(212,62,46,1.0);
  }
</style>
