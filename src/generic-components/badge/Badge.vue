<template>
<!-- 
    //! Responsive text badge
    <Badge
        top="0"
        right="0"
        badgeText="1"
        fontSize="1.1"
        padding="0"
        bgColor="#454545"
        textColor="#fff"
        :size="{
            default:'20',
            lg:'18',
            md:'16',
            sm:'14',
            xs:'12',
        }"
    />  

    //! Responsive icon badge
    <Badge
        top="0"
        left="0"
        fontSize="1.1"
        bgColor="#fff"
        textColor="#000"
        icon="temp.svg"
        :iconSize="{
            default:'20',
            lg:'18',
            md:'16',
            sm:'14',
            xs:'12',
        }"
        iconColor="#fff"
    />
 -->
    <div :style="styleObject" :class="sizeTypeControl ? 'responsive-badge-main':'badge-main'">
        <template v-if="isIcon">
            {{badgeText}}
        </template>
        <template v-else>
            <Icon 
                :icon="icon"
                :width="iconSize"
                :iconColor="iconColor"
            />
        </template>
    </div>
</template>

<script>
import Icon from "@/generic-components/icon/Icon.vue"
export default {
    components:{
        Icon,
    },
    props:{
        bottom:{type:String|Number,default:''},
        top:{type:String|Number,default:''},
        left:{type:String|Number,default:''},
        right:{type:String|Number,default:''},
        badgeText:{type:String|Number,default:'badge'},
        fontSize:{type:String,default:'1'},
        padding:{type:String|Number,default:'4'},
        bgColor:{type:String,default:'#fff'},
        textColor:{type:String,default:'#000'},
        size:{type:Object|String,default:''},
        icon:{type:String,default:''},
        iconSize:{type:Object|String,default:'20'},
        iconColor:{type:String,default:'#fff'},
    },
    computed:{
        isIcon:function(){
            if(this.icon != '')
                return false
            else
                return true
        },
        sizeTypeControl:function(){
            if(typeof this.size === 'object')
                return true
            else
                return false
        },
        styleObject:function (){
            if(this.sizeTypeControl){
                return{
                    '--top': this.top+"px",
                    '--bottom': this.bottom+"px",
                    '--left': this.left+"px",
                    '--right': this.right+"px",
                    '--font-size': this.fontSize+"rem",
                    '--padding': this.padding+"px",
                    '--background-color':this.bgColor,
                    '--color':this.textColor,
                    '--default-size':this.size.default+'px',
                    '--lg-size':this.size.lg+'px',
                    '--md-size':this.size.md+'px',
                    '--sm-size':this.size.sm+'px',
                    '--xs-size':this.size.xs+'px',
                }
            }
            else{
                return{
                    "--top": this.top+"px",
                    "--bottom": this.bottom+"px",
                    "--left": this.left+"px",
                    "--right": this.right+"px",
                    "--font-size": this.fontSize+"rem",
                    "--padding": this.padding+"px",
                    "--background-color":this.bgColor,
                    "--color":this.textColor,
                    "--size":this.size+'px',
                    
                }
            }
            
        }
    },
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
.badge-main{
    user-select: none;
    overflow: hidden;
    @include d-flex-center;
    height: var(--size);
    width: var(--size);
    position: absolute;
    top: var(--top);
    bottom:var(--bottom);
    left:var(--left);
    right: var(--right);
    font-size: var(--font-size);
    padding: var(--padding);
    border-radius: 999px;
    background-color: var(--background-color);
    color: var(--color);
}
.responsive-badge-main{
    user-select: none;
    overflow: hidden;
    @include d-flex-center;
    position: absolute;
    top: var(--top);
    bottom:var(--bottom);
    left:var(--left);
    right: var(--right);
    font-size: var(--font-size);
    padding: var(--padding);
    border-radius: 999px;
    background-color: var(--background-color);
    color: var(--color);
    width: var(--default-size);
    height: var(--default-size);
    @media screen and (max-width: 1440px) {
        width: var(--lg-size);
        height: var(--lg-size);
    }
    @media screen and (max-width: 1024px) {
        width: var(--md-size);
        height: var(--md-size);
    }
    @media screen and (max-width: 768px) {
        width: var(--sm-size);
        height: var(--sm-size);
    }
    @media screen and (max-width: 480px) {
        width: var(--xs-size);
        height: var(--xs-size);
    }
}
</style>