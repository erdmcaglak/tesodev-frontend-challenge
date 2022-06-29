<template>
<!-- 
    //! Navbar Sample 
    <Navbar
      :items="headerItems"
      @clickEvent="temp"
      fontColor="#fff"
      fontSize="2.3"
      itemHoverColor="#1ee2e7"
      background="#333"
      dropMenuBackground="#444"
      iconColor="#fff"
    /> 

    //! Header Items Samples
    headerItems:[
        {
          title:'Anasayfa',
          api:'/'
        },
        {
          title:'Works',
          //? Api kullanılabilir fakat tıklama işlemi olduğunda api'deki route'a gider
          //api:'/work', 
          child:[
            {title:'Work1asdsadsadsa',api:'/work/work1'},
            {title:'Work2',api:'/work/work2'},
          ]
        },
        {
          title:'About',
          api:'/about'
        },
    ]
    -->
<div :style="styleObject" class="main-wrapper">
    <div :style="isSmalled? 'padding:10px':''" class="navbar-main">
        <template v-if="!this.isSmalled">
            <div 
            class="items-wrapper"
            v-for="(item,i) in items" 
            :key="'navbar-items'+i"
            >
                <div
                @click="click(item)"
                :class="currentNav === item.api ? 'active-item':'navbar-items'"  
                >
                    {{item.title}}
                    <Icon
                        v-if="item.child"
                        pointer
                        :icon="selectedParent === item.title ? 'arrow-up.svg':'arrow-down.svg'"
                        :width="{
                            default:'16',
                            lg:'14',
                            md:'13',
                            sm:'12',
                            xs:'11',
                        }"
                        :iconColor="iconColor"
                    />
                </div>
                <transition name="child-menu">
                    <div key="childMenu" v-if="selectedParent === item.title" class="child-items">
                        <div @click="click(child)" v-for="(child,k) in item.child" :key="'child'+k" :class="currentNav === child.api ? 'active-child':'child'">
                            {{child.title}}
                        </div>
                    </div>
                </transition>
            </div>
        </template>
        <template v-else>
            <Icon
                @clickEvent="openMenu"
                pointer
                icon="menu.svg"
                :width="{
                    default:'20',
                    lg:'18',
                    md:'16',
                    sm:'16',
                    xs:'14',
                }"
                :iconColor="iconColor"
            />
        </template>
    </div>
    <transition name="menu-slide">
        <div v-if="isOpenedDropMenu" class="minimized-navbar-menu">
            <div 
            class="minimized-items-wrapper"
            v-for="(item,i) in items" 
            :key="'navbar-items'+i"
            >
                <div
                @click="click(item)"
                :class="currentNav === item.api ? 'minimized-active-item':'minimized-navbar-items'" 
                >
                    {{item.title}}
                    <Icon
                        v-if="item.child"
                        pointer
                        :icon="selectedParent === item.title ? 'arrow-up.svg':'arrow-down.svg'"
                        :width="{
                            default:'16',
                            lg:'14',
                            md:'13',
                            sm:'12',
                            xs:'11',
                        }"
                        :iconColor="iconColor"
                    />
                </div>
                <div key="childMenu" v-if="selectedParent === item.title" class="minimized-child-items">
                    <div @click="click(child)" v-for="(child,k) in item.child" :key="'child'+k" :class="currentNav === child.api ? 'minimized-active-child':'minimized-child'">
                            {{child.title}}
                        </div>
                    </div>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import Icon from "@/generic-components/icon/Icon.vue"

export default {
    components:{
        Icon,
    },
    data(){
        return{
            currentNav:"/",
            windowWidth:0,
            isSmalled:false,
            isOpenedDropMenu: false,
            isCanToggleMenu:true,
            selectedParent:"",
        }
    },
    props:{
        items:{type:Array,required:true},
        clickEvent:{type:Function},
        background:{type:String,default:'#fff'},
        fontSize:{type:String|Number,default:'2'},
        itemHoverColor:{type:String,default:'#d4d4d4'},
        dropMenuBackground:{type:String,default:'#f3f3f3'},
        iconColor:{type:String,default:'#000'},
        fontColor:{type:String,default:'#000'},
    },
    computed:{
        styleObject:function() {
            return{
                '--background':this.background,
                '--font-size':this.fontSize+'rem',
                '--item-hover-color':this.itemHoverColor,
                '--drop-menu-background':this.dropMenuBackground,
                '--font-color':this.fontColor
            }
        }
    },
    methods:{
        openMenu(){
            if(this.isCanToggleMenu){
                this.selectedParent = ""
                this.isOpenedDropMenu = !this.isOpenedDropMenu
                this.isCanToggleMenu = false;
                setTimeout(() => {
                    this.isCanToggleMenu = true;
                }, 500);
            }
        },
        click(item){
            if(item.api){
                this.$router.push(this.$route.query.redirect || `${item.api}`);
                this.currentNav = item.api
                this.selectedParent = ""
            }
            if(this.isSmalled && !item.hasOwnProperty('child')){
                this.isCanToggleMenu = true;
                this.openMenu();
            }
            if(item.hasOwnProperty('child')){
                if(this.selectedParent == item.title)
                    this.selectedParent = ""
                else
                    this.selectedParent=item.title;
            }
            
            this.$emit('clickEvent',item)
        }
    },
    mounted(){
        if(window.innerWidth <= 768 && !this.isSmalled)
            this.isSmalled=true
        else if(window.innerWidth > 768 && this.isSmalled)
            this.isSmalled=false
        
        this.currentNav=this.$route.fullPath

        window.addEventListener('resize',e=>{
            this.windowWidth = window.innerWidth
            if(window.innerWidth <= 768 && !this.isSmalled)
                this.isSmalled=true
            else if(window.innerWidth > 768 && this.isSmalled){
                this.isSmalled=false
                this.isOpenedDropMenu = false
            }

        })
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@font-face {
  font-family: "Jost";
  src: url('../../assets/fonts/Jost-Regular.ttf'),
       
}
.main-wrapper{
    -webkit-tap-highlight-color:transparent;
    -moz-tap-highlight-color:transparent;
    -o-tap-highlight-color:transparent;
    position: relative;
    width: 100%;
    user-select: none;
    color: var(--font-color);
    @include d-flex(row,stretch,stretch);
    font-family: Jost;
    .navbar-main{
        background-color: var(--background);
        width: 100%;
        position: relative;
        z-index: 99;
        @include d-flex(row,flex-end,stretch);
        @include box-shadow(0px,0px,18px,-8px,rgba(0,0,0,0.75));
        .items-wrapper{
            @include d-flex-center;
            position: relative;
            .navbar-items{
                @include d-flex-center;
                gap: 15px;
                padding: 12px 20px;
                font-size: var(--font-size);
                cursor: pointer;
                transition: all .1s linear;
                &:hover{
                    background-color: var(--item-hover-color);
                }
                @media (min-width: 1025px) and (max-width: 1440px){
                    padding: 11px 18px;
                }
                @media (min-width: 769px) and (max-width: 1024px){
                    padding: 10px 16px;
                }
                @media (min-width: 481px) and (max-width: 768px) {
                    padding: 8px 14px;
                }
                @media (max-width: 480px) {
                    padding: 6px 12px;
                }
            }
            .active-item{
                @extend .navbar-items;
                background-color: var(--item-hover-color);
            }
            .child-items{
                border-top: 1px solid rgb(150, 150, 150);
                @include d-flex(column,flex-start,stretch);
                font-size: var(--font-size);
                position: absolute;
                top: 100%;
                right: 0;
                min-width: 100%;
                background-color: var(--background);
                cursor: pointer;
                .child{
                    @include d-flex-center;
                    padding: 12px 15px;
                    transition: all .1s linear;
                    &:hover{
                        background-color: var(--item-hover-color);
                    }
                    @media (min-width: 1025px) and (max-width: 1440px){
                        padding: 10px 14px;
                    }
                    @media (min-width: 769px) and (max-width: 1024px){
                        padding: 9px 13px;
                    }
                    @media (min-width: 481px) and (max-width: 768px) {
                        padding: 7px 12px;
                    }
                    @media (max-width: 480px) {
                        padding: 5px 10px;
                    }
                }
                .active-child{
                    @extend .child;
                    background-color: var(--item-hover-color);
                }
            }
        }
    }
    .minimized-navbar-menu{
        z-index: 1;
        background-color: var(--drop-menu-background);
        left: 0;
        width: 100%;
        position: absolute;
        top: 100%;
        @include d-flex(column,flex-start,stretch);
        .minimized-items-wrapper{
            @include d-flex(column,center,stretch);
            .minimized-navbar-items{
                padding: 7px 13px;
                font-size: var(--font-size);
                cursor: pointer;
                transition: all .1s linear;
                @include d-flex(row,space-between,center);
                &:hover{
                    background-color: var(--item-hover-color);
                }
            }
            .minimized-active-item{
                @extend .minimized-navbar-items;
                background-color: var(--item-hover-color);
            }
            .minimized-child-items{
                @include d-flex(column,flex-start,stretch);
                font-size: var(--font-size);
                background-color: var(--background);
                cursor: pointer;
                .minimized-child{
                    @include d-flex(row,flex-start,center);
                    padding: 12px 50px;
                    transition: all .1s linear;
                    &:hover{
                        background-color: var(--item-hover-color);
                    }
                    @media (min-width: 1025px) and (max-width: 1440px){
                        padding: 10px 48px;
                    }
                    @media (min-width: 769px) and (max-width: 1024px){
                        padding: 9px 46px;
                    }
                    @media (min-width: 481px) and (max-width: 768px) {
                        padding: 7px 44px;
                    }
                    @media (max-width: 480px) {
                        padding: 5px 42px;
                    }
                }
                .minimized-active-child{
                    @extend .minimized-child;
                    background-color: var(--item-hover-color);
                }
            }
        }
        
    }
}


.child-menu-enter{
    opacity: 0;
}
.child-menu-enter-active{
    transition: opacity .3s;
}
.child-menu-leave{
    
}
.child-menu-leave-active{
    transition: opacity .3s;
    opacity: 0;
}


.menu-slide-enter-active{
    animation: slideDown .2s linear;
}
.menu-slide-leave-active{
    animation: slideUp .2s linear;
}

@keyframes slideUp {
    from{
        transform: translateY(0%);
    }
    to{
        transform: translateY(-100%);
    }
}
@keyframes slideDown{
    from{
        transform: translateY(-100%);
    }
    to{
        transform: translateY(0%);
    }
}
</style>