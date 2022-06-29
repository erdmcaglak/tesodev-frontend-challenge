<template>
<!-- 
    //! Fixed Icon
    <Icon 
        :icon="temp.svg"
        :width="20"
        :iconColor="#fff"
    />

    //! Responsive Icon 
    <Icon 
        icon="temp.svg"
        :width="{
            default:'20',
            lg:'18',
            md:'16',
            sm:'14',
            xs:'12',
        }"
        iconColor="#fff"
    />
 -->
    <div @click="clickIcon" :style="styleObject" :class="widthTypeControl ? 'repsonsive-generic-icon' :'generic-icon'"></div>
</template>

<script>
export default {
    data(){
        return{
            mainWidth:"",
        }
    },
    props:{
        width:{type:Number|String|Object,default:'20'},
        icon:{type:String,required:true},
        iconColor:{type:String,default:'#000'},
        pointer:{type:Boolean,default:false},
        clickEvent:{type:Function},
        pointerNone:{type:Boolean},
    },
    computed:{
        widthTypeControl : function() {
            if(typeof this.width === 'object')
                return true
            else
                return false
            
        },
        styleObject : function() {
            if(this.widthTypeControl){
                return{
                    '--default-width':this.width.default+'px',
                    '--lg-width':this.width.lg+'px',
                    '--md-width':this.width.md+'px',
                    '--sm-width':this.width.sm+'px',
                    '--xs-width':this.width.xs+'px',
                    '--url':"url("+require('@/assets/icons/'+this.icon)+")",
                    '--color':this.iconColor,
                    '--cursor': this.pointer ? 'pointer':'auto',
                    '--pointer-event': this.pointerNone ? 'none' : 'auto'
                }
            }
            else{
                return{
                    '--width':this.width+'px',
                    '--url':"url("+require('@/assets/icons/'+this.icon)+")",
                    '--color':this.iconColor,
                    '--pointer-event': this.pointerNone ? 'none' : 'auto'
                }
            }
            
        }
    },
    methods:{
        clickIcon(){
            this.$emit('clickEvent')
        }
    }
}
</script>

<style lang="scss">

@import '@/scss/mixins.scss';


.generic-icon{
    cursor: var(--cursor);
    @include d-flex-center;
    -webkit-mask: var(--url) no-repeat 100% 100%;
    mask: var(--url) no-repeat 100% 100%;
    width: var(--width);
    height: var(--width);
    -webkit-mask-size: cover;
    mask-size: cover;
    background-color: var(--color);
    pointer-events: var(--pointer-event);
    user-select: none;
}
.repsonsive-generic-icon{
    user-select: none;
    pointer-events: var(--pointer-event);
    cursor: var(--cursor);
    @include d-flex-center;
    -webkit-mask: var(--url) no-repeat 100% 100%;
    mask: var(--url) no-repeat 100% 100%;
    width: var(--default-width);
    height: var(--default-width);
    -webkit-mask-size: cover;
    mask-size: cover;
    background-color: var(--color);
    @media screen and (max-width: 1440px) {
        width: var(--lg-width);
        height: var(--lg-width);
    }
    @media screen and (max-width: 1024px) {
        width: var(--md-width);
        height: var(--md-width);
    }
    @media screen and (max-width: 768px) {
        width: var(--sm-width);
        height: var(--sm-width);
    }
    @media screen and (max-width: 480px) {
        width: var(--xs-width);
        height: var(--xs-width);
    }
}

</style>