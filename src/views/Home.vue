<template>
    <div class="home-wrapper">
        <div class="home-main">
            <div class="home-main-logo">
                <div class="home-main-logo-wrapper">
                    <img class="home-logo" src="@/assets/icons/tesodev-main-logo.svg" alt="">
                    <div class="search-app-text">
                        Search app
                    </div>
                </div>
            </div>
            <div class="search-area">
                <div class="search-area-text">
                    Find in records
                </div>
                <div class="search-box-and-button">
                    <div class="search">
                        <div class="search-icon">
                            <Icon 
                                icon="search.svg"
                                :width="{
                                    default:'25',
                                    lg:'23',
                                    md:'21',
                                    sm:'19',
                                    xs:'17',
                                }"
                                iconColor="#000"
                                pointerNone
                            />
                        </div>
                        <input @keyup="searchInArr" placeholder="Search" autocomplete="false" spellcheck="false" type="text" v-model="searchText" class="search-input">
                        <div v-if="searchResultArrLengthControl != 0" class="search-result-box">
                            <div v-for="i in searchResultArrLengthControl" :key="'searchResult'+i" class="search-result">
                                <div class="location-icon">
                                    <img src="@/assets/icons/location.svg" alt="">
                                </div>
                                <div class="location-text">
                                    <div class="bussiness-name">
                                        {{searchResultArr[i-1][1]}}
                                    </div>
                                    <div class="address-name">
                                        {{searchResultArr[i-1][4]}} , {{searchResultArr[i-1][5]}}
                                    </div>
                                </div>
                            </div>
                            <router-link @click.native="setGlobal" tag="div" to="/list"  v-if="searchResultArrLengthControl === 3" class="show-more">
                                Show more...
                            </router-link>
                        </div>
                    </div>
                    <router-link tag="div" to="/list" @click.native="setGlobal" class="search-button">
                        Search
                    </router-link>
                </div>
            </div>
        </div>
        <div class="top-news-wrapper">
            <div class="top-news-text">
                Top News
            </div>
            <div  class="news-slider-wrapper">
                <div :style="currentTranslatePosition===0?'background-color:transparent;cursor:auto':''" @click="goLeftSlide" class="slider-left-arrow">
                    <Icon 
                        icon="arrow-back.svg"
                        :width="{
                            default:'20',
                            lg:'18',
                            md:'16',
                            sm:'14',
                            xs:'12',
                        }"
                        :iconColor="currentTranslatePosition===0 ? 'transparent':'#8A8A8A'"
                        pointerNone
                    />
                </div>
                <div class="slider-area">
                    <div id="slider-wrapper" class="slide-item-wrapper">
                         <div v-for="(item,i) in newsArr" :key="'news'+i" class="slide-item">
                            <img class="slide-item-image" :src="require('@/assets/images/'+item.src)" alt="">
                            <div class="news-text">
                                {{item.text}}
                            </div>
                            <div class="news-writer">
                                {{item.time}} - by {{item.writed}}
                            </div>
                        </div>
                    </div>
                </div>
                <div :style="currentTranslatePosition===-(425 * (newsArr.length-3))?'background-color:transparent;cursor:auto':''" @click="goRightSlide" class="slider-right-arrow">
                    <Icon 
                        icon="arrow-next.svg"
                        :width="{
                            default:'20',
                            lg:'18',
                            md:'16',
                            sm:'14',
                            xs:'12',
                        }"
                        :iconColor="currentTranslatePosition===-(425 * (newsArr.length-3)) ? 'transparent':'#8A8A8A'"
                        pointerNone
                    />
                </div>
            </div>
        </div>
        <div class="footer">
            <img class="footer-image" src="@/assets/images/footer-image.png" alt="">
            <div class="contact">
                <div class="contact-header">
                    İletişim
                </div>
                <div class="address">
                    Adres: Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Merkezi D2 Blok No: 151/1F İç Kapı No: 2B03 Esenler/İstanbul
                </div>
                <div class="email">
                    Email: bilgi@tesodev.com
                </div>
            </div>
            <gmap-map
                :zoom="14"    
                :center="center"
                style="flex:1 0 1px;  height: 225px;"
            >
            <gmap-marker
                :key="index"
                v-for="(m, index) in locationMarkers"
                :position="m.position"
                @click="center=m.position"
            ></gmap-marker>
            </gmap-map>
        </div>
    </div>
    
</template>

<script>
import Icon from "@/generic-components/icon/Icon.vue"
import _ from "lodash"
import {mapMutations} from "vuex"
export default {
    data(){
        return{
            center: { 
                lat: 41.0191393,
                lng: 28.8887594
            },
            locationMarkers: [],
            locPlaces: [],
            existingPlace: {
                
            },
            currentTranslatePosition:0,
            sliderCounter:0,
            newsArr:[
                {
                    src:'news-image.png',
                    text:'A Plan to Rebuild the Bus Terminal Everyone Loves to Hate',
                    time:'1h ago',
                    writed:'Troy Corlson'
                },
                {
                    src:'news-image.png',
                    text:'A Plan to Rebuild the Bus Terminal Everyone Loves to Hate',
                    time:'1h ago',
                    writed:'Troy Corlson'
                },
                {
                    src:'news-image.png',
                    text:'A Plan to Rebuild the Bus Terminal Everyone Loves to Hate',
                    time:'1h ago',
                    writed:'Troy Corlson'
                },
                {
                    src:'news-image.png',
                    text:'A Plan to Rebuild the Bus Terminal Everyone Loves to Hate',
                    time:'1h ago',
                    writed:'Troy Corlson'
                },
            ],
            searchText:"",
            searchResultArr:[],
            mockDataContent:[],
        }
    },
    components:{
        Icon,
    },
    computed:{
        searchResultArrLengthControl(){
            if(this.searchResultArr.length >=3)
                return 3
            else
                return this.searchResultArr.length
        }
    },
    methods:{
        setGlobal(){
            this.setGlobalSearchHolder(this.searchText);
            this.setSearchResultArr(this.searchResultArr);
        },
        ...mapMutations([
            "setGlobalSearchHolder",
            "setSearchResultArr",
        ]),
        addLocationMarker() {
        if (this.existingPlace) {
            const marker = {
                lat: 41.0191393,
                lng: 28.8887594
            };
            this.locationMarkers.push({ position: marker });
            this.locPlaces.push(this.existingPlace);
            this.center = marker;
            this.existingPlace = null;
        }
        },
        
        goRightSlide(){
            if(this.currentTranslatePosition!=-(425 * (this.newsArr.length-3))){
                this.currentTranslatePosition -= 425;
                let slider = document.getElementById('slider-wrapper');
                slider.style.transform = `translateX(${this.currentTranslatePosition}px)`
            }
        },
        goLeftSlide(){
            if(this.currentTranslatePosition!=0){
                this.currentTranslatePosition += 425;
                let slider = document.getElementById('slider-wrapper');
                slider.style.transform = `translateX(${this.currentTranslatePosition}px)`
            }
            
        },
        searchInArr(){
            if(this.searchText.length >= 2){
                this.searchResultArr = this.mockDataContent.filter(e=>e.find(k=>_.upperCase(k).includes(_.upperCase(this.searchText))))
            }
            else{
                this.searchResultArr = [];
            }
            
        }
    },
    mounted(){
        this.mockDataContent = _.cloneDeep(JSON.parse(window.localStorage.getItem('mockData')).data)
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/transition.scss";
.home-wrapper{
    height: 100%;
    width: 100%;
    .home-main{
        padding: 20px 0;
        height: 70%;
        width: 100%;
        @include d-flex(column,stretch,stretch);
        .home-main-logo{
            @include d-flex(column,center,center);
           position: relative;
           .home-main-logo-wrapper{
                pointer-events: none;
                user-select: none;
                @include d-flex-center;
                position: relative;
                .home-logo{
                    width: 280px;
                }
                .search-app-text{
                    position: absolute;
                    bottom: -25px;
                    right: -25px;
                    font-size: 1.4rem;
                    font-weight: 700;
                }
           }
        }
        .search-area{
            @include d-flex(column,flex-start,stretch);
            width: 60%;
            margin: 35px auto;
            .search-area-text{
                width: 100%;
                @include d-flex(row,flex-start,center);
                font-size: 3.2rem;
                font-weight: 700;
                padding: 10px;
            }
            .search-box-and-button{
                @include d-flex(row,center,stretch);
                gap: 15px;
                .search{
                    position: relative;
                    border: 1px solid #000;
                    @include d-flex(row,flex-start,stretch);
                    flex: 1 0 1px;
                    border-radius: 8px;
                    .search-icon{
                        flex: 0 0 auto;
                        padding: 15px;
                        @include d-flex-center;
                    }
                    .search-input{
                        border-radius: 8px;
                        padding: 4px 15px 4px 0;
                        border: none;
                        outline: none;
                        flex: 1 0 1px;
                        font-size: 1.6rem;
                    }
                    .search-result-box{
                        width: 110%;
                        position: absolute;
                        top: 120%;
                        left: 50%;
                        transform: translate(-50%,0);
                        border: 1px solid #484848;
                        border-radius: 24px;
                        padding: 15px 26px;
                        @include d-flex(column,flex-start,stretch);
                        .search-result{
                            @include d-flex(row,flex-start,center);
                            gap: 15px;
                            padding: 10px;
                            user-select: none;
                            cursor: pointer;
                            transition: all .1s linear;
                            &:hover{
                                border-radius: 8px;
                                background: rgba(79, 117, 194, 0.21);
                            }
                            &:not(:last-child){
                                border-bottom: 1px solid #F2F4F5;
                            }
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
                        .show-more{
                            @include d-flex-center;
                            font-weight: 700;
                            font-size: 1.6rem;
                            padding-top: 15px;
                            user-select: none;
                            cursor: pointer;
                            &:hover{
                                text-decoration: underline;
                            }
                        }
                    }
                }
                .search-button{
                    @include d-flex-center;
                    background-color: #204080;
                    color: #fff;
                    font-size: 1.8rem;
                    font-weight: 700;
                    padding: 9px 40px;
                    border-radius: 12px;
                    user-select: none;
                    cursor: pointer;
                    &:hover{
                        background: #4F75C2;
                    }
                }
            }
        }
    }
    .top-news-wrapper{
        @include d-flex(column,flex-start,center);
        width: 100%;
        gap: 50px;
        padding: 20px;
        .top-news-text{
            padding: 10px;
            font-weight: 700;
            font-size: 3.2rem;
            @include d-flex(row,flex-start,center);
            width: 70%;
        }
        .news-slider-wrapper{
            gap: 25px;
            width: 75%;
            @include d-flex(row,flex-start,center);
            .slider-left-arrow, .slider-right-arrow{
                flex: 0 0 auto;
                padding: 12px;
                background-color: #EEEEEE;
                border-radius: 99px;
                cursor: pointer;
                @include d-flex-center;
            }
            .slider-area{
                height: 300px;
                flex: 1 0 1px;
                overflow: hidden;
                gap: 25px;
                position: relative;
                .slide-item-wrapper{
                    transition: all .2s linear;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    @include d-flex(row,flex-start,center);
                    gap: 25px;
                    .slide-item{
                        flex: 1 0 1px;
                        gap: 10px;
                        @include d-flex(column,flex-start,stretch);
                        .slide-item-image{
                            width: 400px;
                        }
                        .news-text{
                            font-size: 1.6rem;
                            font-weight: 700;
                        }
                        .news-writer{
                            @include d-flex(row,flex-start,center);
                            font-size: 1.2rem;
                            color: #6C7072;

                        }
                    }
                }
                
            }
        }
    }
    .footer{
        margin-top: 20px;
        padding:30px 50px;
        background: rgba(41, 78, 152, 0.72);
        @include d-flex-center;
        gap: 28px;
        .footer-image{
            flex: 0 0 auto;
            width: 218px;
        }
        .contact{
            flex: 1 0 1px;
            @include d-flex(column,space-around,flex-start);
            height: 100%;
            font-size: 1.8rem;
            color: #fff;
            gap: 10px;
            .contact-header,.email{
                font-weight: 700;
            }
            .address{
                @include d-flex(row,flex-start,center);
                text-align: left;
            }
        }
    }
}
</style>