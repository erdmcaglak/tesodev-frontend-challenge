<template>
<!-- {
    title: 'Error content'
    type: 'danger'|'success'|'warning' ...
} -->
<div @click.stop class="flash-main">
      <transition-group name="slide-alert">
        <div @click="closeAlert(item)" v-for="item in errorArr" :style="alertTypeControl(item)" :key="item.token" class="flash">
            <div class="alert-icons">
                <app-generic-icon
                    v-if="item.type === 'success'"
                    icon="success.svg"
                    iconColor="#fff"
                    width="20"
                ></app-generic-icon>
                <app-generic-icon
                    v-else
                    icon="danger.svg"
                    iconColor="#fff"
                    width="20"
                ></app-generic-icon>
            </div>
            <div class="flash-text">
                {{item.title}}
            </div>
        </div>
      </transition-group>
  </div>
</template>

<script>
import {stringShorter} from "@/utils/utils.js"
import GenericIcon from "@/generic-components/icon/Icon.vue"
import _ from "lodash"
export default {
    components:{
        appGenericIcon:GenericIcon
    },
    data(){
        return{
            stringShorter,
            errorArr:[],
            tempErrorArr:[],
            errList:{},
            pausedAlerts:[],
        }
    },
    props:{
        err:{
            type:Object|Array,
            required:true,
        },
    },
    methods:{
        alertTypeControl(item){
            if(item.type === 'danger')
                return 'background-color:#ec5757'
            else if(item.type === 'success')
                return 'background-color:#4CAF50'
            else
                return 'background-color:#FB8C00'
        },
        closeAlert(err){
            clearTimeout(this.errList[err.token].clear);
            this.errorArr.splice(_.findIndex(this.errorArr,res=> res.token == err.token),1);
            delete this.errList[err.token];
        },
        // stopAlertPosition(err){
        //     if(this.errList[err.token].isStopped){
        //         this.timeOutFunc(err)
        //     }
        //     else{
        //         this.errList[err.token].isStopped = true;
        //         this.errList = {...this.errList}
        //         this.pausedAlerts.push(err);
        //         window.localStorage.setItem('pausedAlerts',JSON.stringify(this.pausedAlerts))
        //         clearTimeout(this.errList[err.token].clear);
        //     }
        // },
        timeOutFunc(err){
            _.set(this.errList,[`${err.token}`,'isStopped'],false);
            _.set(this.errList,[`${err.token}`,'clear'],setTimeout(()=>{
                this.errorArr.splice(_.findIndex(this.errorArr,res=> res.token == err.token),1);
                delete this.errList[err.token];
            },3e3))
            this.errList = {...this.errList}
        }
    },
    watch:{
        err:{
            handler(){
                let err = {...this.err}
                _.set(err,'token',Math.floor(Math.random()*1e4))
                this.errorArr.unshift(err);
                this.timeOutFunc(err);
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/transition.scss";
.flash-main{
    overflow: auto;
    overflow-x: hidden;
    padding: 10px;
    position: fixed;
    top: 0;
    right: 0;
    @include d-flex(column,flex-start,stretch);
    @media (max-width: 480px) {
        padding: 1px;
        width: 100%;
    }
    @media (min-width: 481px) and (max-width: 768px) {
        padding: 3px;
    }
    @media (min-width: 769px) and (max-width: 1024px){
        padding: 5px;
    }
    @media (min-width: 1025px) and (max-width: 1440px){
        padding: 7px;
    }
    .flash{
        user-select: none;
        @include d-flex(row,flex-start,center);
        margin: 0 0 10px 0;
        gap: 10px;
        padding: 15px 10px;
        color: #fff;
        font-weight: normal;
        border-radius: 4px;
        font-size: 1.8rem;
        width: 450px;
        @media (max-width: 480px) {
            width: 100%;
            padding: 9px 5px;
            gap: 5px;
            margin-bottom: 6px;
        }
        @media (min-width: 481px) and (max-width: 768px) {
            width: 350px;
            padding: 11px 5px;
            gap: 6px;
            margin-bottom: 7px;
        }
        @media (min-width: 769px) and (max-width: 1024px){
            width: 400px;
            padding: 14px 7px;
            gap: 7px;
            margin-bottom: 8px;
        }
        @media (min-width: 1025px) and (max-width: 1440px){
            padding: 14px 7px;
            gap: 8px;
            margin-bottom: 9px;
        }
        .alert-icons{
            @include d-flex-center;
            
        }
        .flash-text{
            @include d-flex-center;
            word-wrap: break-word;
        }
    }
}
</style>