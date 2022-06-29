<template>
    <div class="list-wrapper">
        <div v-if="resultArrLengthControl" class="order-button-wrapper">
            <div class="order-button-main">
                <div @click="openOptions" class="order-button">
                    <Icon 
                        icon="order.svg"
                        :width="{
                            default:'26',
                            lg:'24',
                            md:'22',
                            sm:'20',
                            xs:'18',
                        }"
                        iconColor="#484848"
                        pointerNone
                    />
                    Order By
                </div>
                <transition name="fade-scale">
                    <div :key="'orderOption'" v-if="isOpenedOption" class="order-options">
                        <div @click="selectOption(item)" v-for="(item,i) in orderOptions" :key="'option'+i" :class="item.value === selectedOption?'active-option-item':'option-items'">
                            {{item.title}}
                        </div>
                    </div>
                </transition>
            </div>
            
        </div>
        <div :style="resultArrLengthControl ? '':'width:100%'" class="search-result-area">
            <div v-if="resultArrLengthControl" class="search-result-wrapper">
                <div v-for="i in searchResultLengthControl" :key="'searchAllList'+i" class="search-result">
                    <div class="search-hover-wrapper">
                        <div class="location-wrapper">
                            <div class="location-icon">
                                <img src="@/assets/icons/location.svg" alt="">
                            </div>
                            <div class="location-text">
                                <div class="bussiness-name">
                                    {{getSearchResultArr[(currentPaginationPage*5)-(5 -(i-1))][1]}}
                                </div>
                                <div class="address-name">
                                    {{getSearchResultArr[(currentPaginationPage*5)-(5 -(i-1))][4]}} , {{getSearchResultArr[(currentPaginationPage*5)-(5 -(i-1))][5]}}
                                </div>
                            </div>
                        </div>
                        <div class="name-surname-date">
                            <div class="name">
                                {{getSearchResultArr[(currentPaginationPage*5)-(5 -(i-1))][0]}}
                            </div>
                            <div class="date">
                                {{getSearchResultArr[(currentPaginationPage*5)-(5 -(i-1))][3]}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="no-data">
                No Data Found
            </div>
            <div v-if="resultArrLengthControl" class="pagination-wrapper">
                <div @click="goBackPaginationPage" class="previous">
                    Previous
                </div>
                <div class="pagination-pages">
                    <div v-for="i in searchLengthCalculator" :key="'paginationItem'+i" class="pagination-page-items-wrapper">
                        <transition name="fade-scale">
                            <div @click="changeCurrentPage(i)" :key="'paginationShowed'+i" v-if="paginationShowControl(i)" :class="currentPaginationPage === i ? 'active-pagination-page-items':'pagination-page-items'">
                                {{i}}
                            </div>
                            <div v-else :key="'paginationNotShowed'+i" class="not-showed-pagination-item"></div>
                        </transition>
                    </div>
                </div>
                <div @click="goNextPaginationPage" class="next">
                    Next
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from "@/generic-components/icon/Icon.vue"
import {mapGetters,mapMutations} from "vuex"
import moment from "moment"
export default {
    components:{
        Icon
    },
    data(){
        return{
            selectedOption:"",
            isOpenedOption:false,
            currentPaginationPage:1,
            orderOptions:[
                {title:'Name ascending',value:'nameUp'},
                {title:'Name descending',value:'nameDown'},
                {title:'Year ascending',value:'yearUp'},
                {title:'Year descending',value:'yearDown'},
            ]
        }
    },
    computed:{
        getLengthSearchArr(){
            return this.getSearchResultArr.length
        },
        searchResultLengthControl(){
            if(this.getSearchResultArr.length >= 5*this.currentPaginationPage)
                return 5
            else
                return this.getSearchResultArr.length%5
        },
        resultArrLengthControl(){
            if(this.getSearchResultArr.length!=0)
                return true
            else
                return false
        },
        searchLengthCalculator(){
            return this.getSearchResultArr.length % 5 === 0 ? Math.floor(this.getSearchResultArr.length/5) : Math.floor(this.getSearchResultArr.length/5) + 1
        },
        ...mapGetters([
            "getGlobalSearchHolder",
            "getSearchResultArr"
        ])
    },
    methods:{
        selectOption(item){
            this.selectedOption = item.value;
            if(item.value === 'nameUp'){
                this.setSearchResultArr(_.sortBy(this.getSearchResultArr,[o=> _.lowerCase(o[0])]))
            }
            else if(item.value === 'nameDown'){
                this.setSearchResultArr(_.sortBy(this.getSearchResultArr,[o=> _.lowerCase(o[0])]).reverse());
            }
            else if(item.value === 'yearUp'){
                this.setSearchResultArr(_.sortBy(this.getSearchResultArr,[o=> {return moment(o[3],'DD/MM/YYYY').unix()}]).reverse())
            }
            else{
                this.setSearchResultArr(_.sortBy(this.getSearchResultArr,[o=> {return moment(o[3],'DD/MM/YYYY').unix()}]))
            }
            this.isOpenedOption = false;
        },
        openOptions(){
            this.isOpenedOption = !this.isOpenedOption;
        },
        goNextPaginationPage(){
            if(this.currentPaginationPage < this.searchLengthCalculator){
                this.currentPaginationPage++;
            }
        },
        goBackPaginationPage(){
            if(this.currentPaginationPage > 1){
                this.currentPaginationPage--;
            }
        },
        ...mapMutations([
            "setSearchResultArr"
        ]),
        changeCurrentPage(count){
            this.currentPaginationPage = count;
        },
        paginationShowControl(count){
            if(count === 1||count === this.currentPaginationPage -1 || count === this.currentPaginationPage || count === this.currentPaginationPage +1 || count === Math.floor(this.getSearchResultArr.length/5)+1 || count === Math.floor(this.getSearchResultArr.length/5) )
                return true
            else
                return false 
        }
    },
    mounted(){
        if(this.getSearchResultArr.length === 0 && this.getGlobalSearchHolder===''){
            this.setSearchResultArr(JSON.parse(window.localStorage.getItem('mockData')).data);
        }
    },
    watch:{
        getLengthSearchArr:{
            handler(){
                if(this.selectedOption != '')
                    this.selectOption({value:this.selectedOption});
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/transition.scss";
.list-wrapper{
    @include d-flex(column,flex-start,center);
    width: 80%;
    margin: 0 auto;
    height: 100%;
    padding: 20px;
    gap: 10px;
    .order-button-wrapper{
        width: 100%;
        @include d-flex(row,flex-end,center);
        .order-button-main{
            @include d-flex-center;
            position: relative;
            .order-button{
                @include d-flex-center;
                gap: 8px;
                border-radius: 8px;
                border: 1px solid #414141;
                background-color: #f3f2f2;
                padding: 4px 12px;
                color: #484848;
                font-size: 1.8rem;
                font-weight: 500;
                user-select: none;
                cursor: pointer;
                position: relative;
            }
            .order-options{
                gap: 3px;
                border: 1px solid #484848;
                padding: 10px;
                font-size: 1.4rem;
                position: absolute;
                left: 0;
                top: 120%;
                width: 130%;
                @include box-shadow(4px ,6px ,12px ,4px, rgba(0, 0, 0, 0.2) );
                border-radius: 8px;
                @include d-flex(column,flex-start,stretch);
                .option-items{
                    font-weight: 700;
                    padding: 10px;
                    user-select: none;
                    cursor: pointer;
                    transition: all .1s linear;
                    border-radius: 8px;
                    &:hover{
                        background-color:#B3B3B3;
                        color: #fff;
                    }
                }
                .active-option-item{
                    @extend .option-items;
                    background-color:#B3B3B3;
                    color: #fff;
                }
            }
        }
        
    }
    .search-result-area{
        @include d-flex(column,flex-start,stretch);
        width: 75%;
        gap: 50px;
        .search-result-wrapper{
            @include d-flex(column,flex-start,stretch);
            width: 100%;
            .search-result{
                padding: 10px 0;
                @include d-flex-center;
                user-select: none;
                &:not(:last-child){
                    border-bottom: 1px solid #7E7E7E;
                }
                .search-hover-wrapper{
                    padding: 10px 10px;
                    user-select: none;
                    cursor: pointer;
                    width: 100%;
                    @include d-flex(row,space-between,center);
                    border-radius: 8px;
                    transition: all .2s linear;
                    &:hover{
                        background: rgba(79, 117, 194, 0.21);
                    }
                    .location-wrapper{
                        gap: 15px;
                        @include d-flex(row,flex-start,center);
                        .location-icon{
                            user-select: none;
                            pointer-events: none;
                            padding: 10px;
                            @include d-flex-center;
                        }
                        .location-text{
                            @include d-flex(column,flex-start,flex-start);
                            gap: 4px;
                            .bussiness-name{
                                font-size: 1.6rem;
                                color: #000;
                            }
                            .address-name{
                                font-size: 1.6rem;
                                color: #72777A;
                            }
                        }
                    }
                    .name-surname-date{
                        @include d-flex(column,flex-start,flex-end);
                        font-size: 1.6rem;
                        align-self: flex-end;
                        color: #484848;
                        .name{
                            
                        }
                        .date{
                            font-weight: 700;
                        }
                    }
                }
                
            }
        }
        .no-data{
            @include d-flex-center;
            width: 100%;
            color: #484848;
            font-weight: 700;
            font-size: 3.2rem;
        }
        
        .pagination-wrapper{
            @include d-flex-center;
            width: 100%;
            gap: 10px;
            .previous,.next{
                border: 1px solid #484848;
                color: #484848;
                font-size: 1.4rem;
                font-weight: 700;
                padding: 6px 15px;
                border-radius: 4px;
                @include d-flex-center;
                user-select: none;
                cursor: pointer;
                transition: all .1s linear;
                &:hover{
                    background: #204080;
                    color: #fff;
                    border-color: #fff;
                }
            }
            .pagination-pages{
                @include d-flex-center;
                gap: 10px;
                .pagination-page-items-wrapper{
                    position: relative;
                    @include d-flex-center;
                    .pagination-page-items{
                        padding: 6px;
                        user-select: none;
                        cursor: pointer;
                        width: 30px;
                        height: 30px;
                        @include d-flex-center;
                        border-radius: 4px;
                        border: 1px solid #484848;
                        font-size: 1.4rem;
                        font-weight: 700;
                        transition: all .1s linear;
                        &:hover{
                            background: #204080;
                            color: #fff;
                            border-color: #fff;
                        }
                    }
                    .active-pagination-page-items{
                        @extend .pagination-page-items;
                        background: #204080;
                        color: #fff;
                        border-color: #fff;
                    }
                    .not-showed-pagination-item{
                        width: 5px;
                        height: 5px;
                        background-color: #484848;
                        border-radius: 99px;
                    }
                }
            }
        }
    }
}
</style>