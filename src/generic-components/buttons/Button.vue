<template>
<!-- 
    //! Bordered Sample
    <Button 
        title="button1" 
        fontSize="2"
        bordered
        background="#fff"
        @clickFunc="temp"
        icon="danger.svg"
        iconColor="#000"
        iconWidth="20"
        color="#000"
        radius="8"
    />
    //! Responsive Bordered Sample
    <Button 
        title="button1" 
        fontSize="2"
        bordered
        background="#fff"
        @clickFunc="temp"
        icon="danger.svg"
        iconColor="#000"
        :iconWidth="{
            default="20"
            lg="18"
            md="16"
            sm="14"
            xs="12"
        }"
        color="#000"
        radius="8"
    />
 -->
    <div @mouseenter="enterBorderedButton" @mouseleave="leaveBorderedButton" v-if="bordered" @click="clickedButton" :style="styleObject" class="bordered">
        <Icon 
            v-if="icon!=''"
            :icon="icon"
            :width="iconWidth"
            :iconColor="isEnterBorderedButton ? '#fff' :iconColor"
        />
        {{title}}
    </div>
    <!-- 
        //! Filled Sample
        <Button 
            title="button1" 
            fontSize="2"
            background="#32a852"
            @clickFunc="temp"
            icon="danger.svg"
            iconColor="#fff"
            iconWidth="20"
            color="#fff"
            radius="8"
        />

        //! Responsive Filled Sample
        <Button 
            title="button1" 
            fontSize="2"
            background="#32a852"
            @clickFunc="temp"
            icon="danger.svg"
            iconColor="#fff"
            :iconWidth="{
                default="20"
                lg="18"
                md="16"
                sm="14"
                xs="12"
            }"
            color="#fff"
            radius="8"
        />
     -->
    <div v-else @click="clickedButton" :style="styleObject" class="filled">
        <Icon
            v-if="icon!=''"
            :icon="icon"
            :width="iconWidth"
            :iconColor="iconColor"
        />
        {{title}}
    </div>
</template>

<script>
import Icon from "@/generic-components/icon/Icon.vue"
export default {
    data(){
        return{
            isEnterBorderedButton:false,
        }
    },
    components:{
        Icon,
    },
    props:{
        title:{type:String,default:'Button'},
        fontSize:{type:String|Number, default:'2'},
        color:{type:String,default:'#000'},
        borderColor:{type:String,default:'#000'},
        radius:{type:String|Number,default:'4'},
        background:{type:String,default:'#fff'},
        iconWidth:{type:String|Number|Object,default:'20'},
        iconColor:{type:String,default:'#000'},
        icon:{type:String,default:""},
        bordered:{type:Boolean,default:false},

        clickFunc:{type:Function},
    },
    computed:{
        styleObject:function(){
            return{
                '--font-size':this.fontSize+'rem',
                '--color':this.color,
                '--border-color':this.borderColor,
                '--radius':this.radius+'px',
                '--background':this.background,
                '--icon-width':this.iconWidth+'px',
            }
        }
    },
    methods:{
        enterBorderedButton(){
            this.isEnterBorderedButton = true
        },
        leaveBorderedButton(){
            this.isEnterBorderedButton = false
        },
        clickedButton(){
            this.$emit('clickFunc');
        }
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
.bordered{
    user-select: none;
    @include d-flex-center;
    gap: 10px;
    font-size: var(--font-size);
    color: var(--color);
    font-family:Arial, Helvetica, sans-serif;
    cursor: pointer;
    padding: 6px 16px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    transition: all .1s linear;
    &:hover{
        background-color: var(--color);
        color: #fff;
    }

    @media (min-width: 1025px) and (max-width: 1440px){
        padding: 5px 15px;  
    }
    @media (min-width: 769px) and (max-width: 1024px){
        padding: 4px 14px;
    }
    @media (min-width: 481px) and (max-width: 768px) {
        padding: 4px 12px; 
    }
    @media (max-width: 480px) {
        padding: 3px 11px;
    }
    
}
.filled{
    user-select: none;
    @include d-flex-center;
    gap: 10px;
    font-size: var(--font-size);
    color: #fff;
    font-family:Arial, Helvetica, sans-serif;
    cursor: pointer;
    padding: 6px 16px;
    background: var(--background);
    border-radius: var(--radius);
    transition: all .1s linear;
    &:hover{
        filter: brightness(110%);
    }
    @media (min-width: 1025px) and (max-width: 1440px){
        padding: 5px 15px;  
    }
    @media (min-width: 769px) and (max-width: 1024px){
        padding: 4px 14px;
    }
    @media (min-width: 481px) and (max-width: 768px) {
        padding: 4px 12px; 
    }
    @media (max-width: 480px) {
        padding: 3px 11px;
    }
}
</style>