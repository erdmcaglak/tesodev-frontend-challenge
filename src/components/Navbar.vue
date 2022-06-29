<template>
    <div :style="$route.path === '/' && 'justify-content:flex-end'" class="navbar-main">
        <template v-if="$route.path != '/'">
            <router-link tag="div" to="/" class="main-logo">
                    <img class="logo" src="@/assets/icons/tesodev-main-logo.svg" alt="">
            </router-link>
            <div v-if="routeControl" class="search-wrapper">
                <div class="search-input-wrapper">
                    <Icon 
                        icon="search.svg"
                        :width="{
                            default:'18',
                            lg:'16',
                            md:'14',
                            sm:'12',
                            xs:'10',
                        }"
                        iconColor="#000"
                        pointerNone
                    />
                    <input 
                        @keyup="searchInArr"
                        autocomplete="false" 
                        spellcheck="false" 
                        v-model="searchInputHolder" 
                        class="search-input" 
                        type="text"
                        placeholder="Search"
                    >
                </div>
                <div class="search-button">
                    SEARCH
                </div>
            </div>
            <div v-else class="return-list-page">
                <router-link tag="div" to="/list" class="return-list-page-wrapper">
                    <img class="arrow-left-icon" src="@/assets/icons/arrow-left.svg" alt="">
                    Return to List Page
                </router-link>
            </div>
        </template>
        <router-link v-if="$route.path != '/add-new-user'" tag="div" to="/add-new-user" class="add-new-record-button">
            Add new record
        </router-link>
    </div>
</template>

<script>
import Icon from "@/generic-components/icon/Icon.vue"
import {mapGetters,mapMutations} from "vuex"
import _ from "lodash"
export default {
    data(){
        return{
            isCanChange:true,
            searchInputHolder:"",
            searchResultArr:[]
        }
    },
    methods:{
        ...mapMutations([
            "setSearchResultArr"
        ]),
        searchInArr(){
            if(this.searchInputHolder.length >= 2){
                this.setSearchResultArr(this.searchResultArr.filter(e=>e.find(k=>_.upperCase(k).includes(_.upperCase(this.searchInputHolder)))))
            }
            else{
                this.setSearchResultArr(this.searchResultArr)
            }
        }
    },
    components:{
        Icon,
    },
    computed:{
        routeControl(){
            if(this.$route.path === '/list'){
                this.searchResultArr = JSON.parse(window.localStorage.getItem('mockData')).data
                this.searchInputHolder = this.getGlobalSearchHolder;
               return true;
            
            }
        },
        ...mapGetters([
            "getGlobalSearchHolder"
        ])
    },
}
</script>

<style lang='scss'>
@import "@/scss/mixins.scss";
@import "@/scss/transition.scss";
.navbar-main{
    @include d-flex(row,space-around,center);
    padding: 25px;
    gap: 50px;
    width: 100%;
    .main-logo{
        @include d-flex-center;
        cursor: pointer;
        user-select: none;
        .logo{
            width: 150px;
            @media (min-width: 1025px) and (max-width: 1440px){
                width: 130px;
            }
            @media (min-width: 769px) and (max-width: 1024px){
                width: 110px;
            }
            @media (min-width: 481px) and (max-width: 768px) {
                width: 90px;
            }
            @media (max-width: 480px) {
                width: 70px;
            }
        }
    }
    .search-wrapper{
        @include d-flex(row,center,stretch);
        gap: 25px;
        flex: 1 0 1px;
        .search-input-wrapper{
            padding: 10px 20px;
            border-radius: 8px;
            border: 1px solid #000;
            width: 100%;
            @include d-flex-center;
            .search-input{
                border: none;
                padding: 10px 20px;
                outline: none;
                font-size: 1.8rem;
                flex: 1 0 1px;
            }
        }
        .search-button{
            padding: 9px 40px;
            background-color: #4F75C2;
            border-radius: 8px;
            color: #fff;
            font-weight: 700;
            @include d-flex-center;
            font-size: 1.8rem;
            cursor: pointer;
            user-select: none;
        }
    }
    .return-list-page{
        flex: 1 0 1px;
        @include d-flex(row,flex-start,center);
        .return-list-page-wrapper{
            @include d-flex-center;
            gap: 12px;
            cursor: pointer;
            user-select: none;
            color: #484848;
            font-size: 2.4rem;
            .arrow-left-icon{
                width: 26px;
            }
        }
    }
    .add-new-record-button{
        background-color: #204080;
        border-radius: 8px;
        padding: 12px 35px;
        color: #fff;
        font-weight: 700;
        font-size: 1.8rem;
        user-select: none;
        cursor: pointer;
        transition: all .1s linear;
        &:hover{
            background: #4F75C2;
        }
    }

}
</style>