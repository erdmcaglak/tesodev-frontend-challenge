<template>
    <!-- 
        //! Slider sample
        <Slider
        :images="images"
        :arrowSize="{
            default:'30',
            lg:'28',
            md:'26',
            sm:'24',
            xs:'22',
        }"
        arrowColor="#454545"
        dotColor="#fff"
        showDot
      />

      //? Images array sample
      images:[
          {src:'temp1.jpg',id:Math.round(Math.random()*1e4)},
          {src:'temp2.jpg',id:Math.round(Math.random()*1e4)},
          {src:'temp3.jpg',id:Math.round(Math.random()*1e4)},
          {src:'temp4.jpg',id:Math.round(Math.random()*1e4)},
      ],
     -->
    <div  class="slider-main">
        <div @click="goBack" class="go-back">
            <Icon 
                icon="arrow-back.svg"
                :width="arrowSize"
                :iconColor="arrowColor"
                pointer
            />
        </div>
        <transition :name="isClickedBack?'back-slide':'next-slide' ">
            <img :key="'sliderItem'+images[currentImageCount].id" class="image-item" :src="require('@/assets/images/'+images[currentImageCount].src)" alt="">
        </transition>
        <div @click="goNext" class="go-next">
            <Icon 
                icon="arrow-next.svg"
                :width="arrowSize"
                :iconColor="arrowColor"
                pointer
            />
        </div>
        <div v-if="showDot" class="slider-counter">
            <div :style="styleObject" v-for="(item,i) in images" :key="'imageCounter'+i" :class="currentImageCount === i ? 'length-images scale': 'length-images'">
            </div>
        </div>
    </div>
</template>

<script>
import Icon from "@/generic-components/icon/Icon.vue"
export default {
    props:{
        images:{type:Array,required:true},
        arrowColor:{type:String,default:'#454545'},
        arrowSize:{type:Object|String},
        dotColor:{type:String,default:'#fff'},
        showDot:{type:Boolean,default:false}
    },
    data(){
        return{
            currentImageCount:0,
            isCanClickArrows:true,
            isClickedBack:false
        }
    },
    components:{
        Icon
    },
    computed:{
        styleObject:function(){
            return{
                '--dot-color':this.dotColor,
            }
        }
    },
    methods:{
        goBack(){
            this.isClickedBack = true;
            if(this.isCanClickArrows){
                if(this.currentImageCount === 0)
                    this.currentImageCount=this.images.length-1
                else
                    this.currentImageCount--;
                
                this.isCanClickArrows=false
                setTimeout(() => {
                    this.isCanClickArrows = true
                }, 300);
            }
        },
        goNext(){
            this.isClickedBack = false;
            if(this.isCanClickArrows){
                if(this.currentImageCount === this.images.length-1)
                    this.currentImageCount=0
                else
                    this.currentImageCount++;
    
                this.isCanClickArrows=false
                setTimeout(() => {
                    this.isCanClickArrows = true
                }, 300);
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/transition.scss";
.slider-main{
    background-color: transparent;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    user-select: none;
    pointer-events: none;
    @include d-flex-center;
    .image-item{
        width: 100%;
    }
    .go-back{
        z-index: 99;
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translate(0,-50%);
        @include d-flex-center;
    }
    .go-next{
        z-index: 99;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translate(0,-50%);
        @include d-flex-center;
    }
    .slider-counter{
        @include d-flex-center;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%,0);
        gap: 10px;
        .length-images{
            border-radius: 99px;
            background-color: var(--dot-color);
            width: 10px;
            height: 10px;
            transition: all .3s linear;
        }
        .scale{
            transform: scale(1.5);
        }
    }
}
</style>