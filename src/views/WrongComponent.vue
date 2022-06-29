<template>
  <div class="main-main">
    <div class="main-wrapper">
        <div class="main-header">
            <div class="add-new-and-table-name">
                User List
                <Icon 
                    icon="filled-plus.svg"
                    :width="{
                        default:'25',
                        lg:'23',
                        md:'21',
                        sm:'19',
                        xs:'17',
                    }"
                    iconColor="#fff"
                    pointer
                    @clickEvent="openModal"
                />
            </div>
            <div class="search-box">
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
                        iconColor="#fff"
                        pointerNone
                    />
                </div>
                <input @keyup="searchInArr" placeholder="Search" autocomplete="false" spellcheck="false" type="text" v-model="searchText" class="search-input">
                
            </div>
        </div>
        <div class="table-wrapper">
            <template v-if="mockDataContent.length != 0">
            <table>
                <tr class="list-header">
                    <th @click="sortHeader(item)" v-for="(item,i) in mockDataHeader" :key="'listHeader'+i" class="list-header-item">
                        {{item}}
                        <div v-if="selectedHeaderSort.title === item" class="arrow">
                            <Icon 
                                :icon="selectedHeaderSort.sortBy === 'upToDown' ? 'arrow-down.svg' : 'arrow-up.svg'"
                                :width="{
                                    default:'12',
                                    lg:'10',
                                    md:'8',
                                    sm:'6',
                                    xs:'4',
                                }"
                                :iconColor="nextColor"
                                @clickEvent="nextPage"
                            />
                        </div>
                    </th>
                </tr>
                <tr v-for="(i) in tempPerPage"  :key="'listContent'+i" class="list-content-item-wrapper">
                    <td v-for="(item,j) in mockDataContent[(i-1) + ((currentPage-1)*perPage)]"  :key="'listİtem'+j+i" class="list-content-item">
                        {{item}}
                    </td>
                </tr>
            </table>
            </template>
            <template v-else>
                <div class="no-data-found">
                    No Data Found
                </div>
            </template>
        </div>
        <div class="pagination-wrapper">
            <div class="pagination-info">
                {{mockDataContent.length}} record. {{mockDataContent.length === 0 ? 0 :(currentPage-1)*perPage +1}} - {{mockDataContent.length === 0 ? 0 :(currentPage-1)*perPage + (tempPerPage)}} showing
            </div>
            <div class="pagination-route-wrapper">
                <div class="pagination-route">
                    <div class="skip-back">
                        <Icon 
                            icon="skip-back.svg"
                            :width="12"
                            :iconColor="backColor"
                            @clickEvent="goFirstPage"
                        />
                    </div>
                    <div class="backward">
                        <Icon 
                            icon="backward.svg"
                            :width="14"
                            :iconColor="backColor"
                            @clickEvent="backPage"
                        />
                    </div>
                    <div class="next">
                        <Icon 
                            icon="next.svg"
                            :width="14"
                            :iconColor="nextColor"
                            @clickEvent="nextPage"
                        />
                    </div>
                    <div class="skip-next">
                        <Icon 
                            icon="skip-next.svg"
                            :width="12"
                            :iconColor="nextColor"
                            @clickEvent="goLastPage"
                        />
                    </div>
                </div>
                <div class="select-perpage">
                    <select @change="selectBoxChange" class="select-box" v-model="perPage" name="" id="">
                        <option v-for="(item,i) in perPageOptions" :key="'perPageItem'+i" :value="parseInt(item)">{{item}}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <Modal
        v-if="isOpenedModal"
        :isOpen.sync="isOpenedModal"
        dropBg="transparent"
        modalBg="#fff"
        radius="10"
        @clickEvent="closedModal"
        :width="{
            default:'50',
            lg:'55',
            md:'60',
            sm:'85',
            xs:'100',
        }"
        :height="{
            default:'70',
            lg:'75',
            md:'80',
            sm:'95',
            xs:'100',
        }"
        :closeIconPosition="{
            default:'15',
            lg:'13',
            md:'11',
            sm:'9',
            xs:'8',
        }"
        :closeIconSize="{
            default:'20',
            lg:'18',
            md:'16',
            sm:'14',
            xs:'12',
        }"
    > 
        <div class="add-new-user">
            <div v-for="(item,i) in newUserInputs" :key="'newUser'+i" class="inputs">
                <div class="input-header">
                    {{item.title}}
                </div>
                <input
                    @keypress="inputLetterControl($event,item)"
                    autocomplete="false" 
                    spellcheck="false" 
                    :type="item.type"
                    :placeholder="item.placeHolder"
                    v-model="item.inputHolder"
                    class="new-user-inputs"    
                >
            </div>
            <div @click="addNewUser" class="add-button">
                Add
            </div>
        </div>
    </Modal>
  </div>
</template>

<script>
import moment from "moment"
import _ from "lodash"
import Icon from "@/generic-components/icon/Icon.vue"
import Modal from "@/generic-components/modal/Modal.vue"
import {mapMutations} from "vuex"
export default {
    components:{
        Icon,
        Modal
    },
    data(){
        return{
            selectedHeaderSort:{
                title:'',
                sortBy:'',
            },
            newUserInputs:[
                {title:'Name Surname',placeHolder:'Enter name and surname',value:'nameSurname',inputHolder:'',type:'text'},
                {title:'Company',placeHolder:'Enter a company',value:'company',inputHolder:'',type:'text'},
                {title:'Email',placeHolder:'Enter a e-mail (abc@xyz.com)',value:'mail',inputHolder:'',type:'email'},
                {title:'Country',placeHolder:'Enter a country',value:'country',inputHolder:'',type:'text'},
                {title:'City',placeHolder:'Enter a city',value:'city',inputHolder:'',type:'text'},
                
            ],
            isOpenedModal:false,
            nextColor:'#fff',
            backColor:'#b3b3b3',
            currentPage:1,
            perPage:10,
            tempPerPage:10,
            perPageOptions:[
                '3',
                '5',
                '10'
            ],
            searchText:"",
            mockDataHeader:[],
            mockDataContent:[],
            tempMockDataContent:[],
            isCanAddNewUser:true,
            inputİnfos:[],
        }
    },
    methods:{
        sortHeader(item){
            if(this.selectedHeaderSort.title === item){
                if(this.selectedHeaderSort.sortBy === ''){
                    
                    this.selectedHeaderSort.sortBy = 'upToDown'
                    if(_.findIndex(this.mockDataHeader, e=> e=== item) === 3){
                        this.mockDataContent = _.sortBy(this.tempMockDataContent,[o=> {return moment(o[_.findIndex(this.mockDataHeader,e=> e=== item)],'DD/MM/YYYY').unix()}]).reverse()
                    }
                    else{
                        this.mockDataContent = _.sortBy(this.tempMockDataContent,[o=> _.lowerCase(o[_.findIndex(this.mockDataHeader, e=> e=== item)])])
                    }
                }
                else if(this.selectedHeaderSort.sortBy === 'upToDown'){
                    this.selectedHeaderSort.sortBy = 'downToUp'
                    if(_.findIndex(this.mockDataHeader, e=> e=== item) === 3){
                        this.mockDataContent = _.sortBy(this.tempMockDataContent,[o=> {return moment(o[_.findIndex(this.mockDataHeader,e=> e=== item)],'DD/MM/YYYY').unix()}])
                    }
                    else{
                        this.mockDataContent = _.sortBy(this.tempMockDataContent,[o=> _.lowerCase(o[_.findIndex(this.mockDataHeader,e=> e=== item)])]).reverse()
                    }
                }
                else{
                    this.mockDataContent = this.tempMockDataContent;
                    this.selectedHeaderSort = {
                        title:'',
                        sortBy:'',
                    }
                }
            }
            else{
                this.selectedHeaderSort.title=item;
                this.selectedHeaderSort.sortBy = 'upToDown'
                if(_.findIndex(this.mockDataHeader, e=> e=== item) === 3){
                    this.mockDataContent = _.sortBy(this.tempMockDataContent,[o=> {return moment(o[_.findIndex(this.mockDataHeader,e=> e=== item)],'DD/MM/YYYY').unix()}]).reverse()
                }
                else{
                    this.mockDataContent = _.sortBy(this.tempMockDataContent,[o=> _.lowerCase(o[_.findIndex(this.mockDataHeader, e=> e=== item)])])
                }
            }
              
        },
        inputLetterControl(e,item){
            if(item.value!='mail' && !(/[a-z ]/i.test(String.fromCharCode(e.keyCode)))){
                e.preventDefault();
                return false;
            }
            else if (item.value === 'mail'){
                let re = /\S+@\S+\.\S+/;
                return re.test(email);
            }
        },
        addNewUser(){
            this.isCanAddNewUser = true;
            this.newUserInputs.forEach(item => {
                if(item.inputHolder === ''){
                    this.setAlert({
                        title:item.title + ' is required',
                        type:'danger'
                    })
                    this.isCanAddNewUser=false
                    return
                }
                else if (item.value === 'mail'){
                    let re = /\S+@\S+\.\S+/;
                    if(!re.test(item.inputHolder)){
                        this.setAlert({
                            title:'Email must be valid',
                            type:'danger'
                        })
                        this.isCanAddNewUser=false
                        return
                    }
                    
                }
            });
            if(this.isCanAddNewUser){
                let tempObj = _.cloneDeep(JSON.parse(window.localStorage.getItem('mockData')))
                tempObj.data.push([
                    this.newUserInputs[0].inputHolder,
                    this.newUserInputs[1].inputHolder,
                    this.newUserInputs[2].inputHolder,
                    moment().format('DD/MM/YYYY'),
                    this.newUserInputs[3].inputHolder,
                    this.newUserInputs[4].inputHolder,
                ])
                window.localStorage.setItem('mockData',JSON.stringify(tempObj));
                this.closedModal();
            }
        },
        selectBoxChange(){
            this.currentPage = 1;
            this.tempPerPage = this.perPage;
            this.backColor = '#b3b3b3'
            this.nextColor = '#fff'
        },
        nextPage(){
            if(this.tempPerPage <= this.mockDataContent.length - (this.currentPage*this.perPage)){
                this.currentPage++;
                this.backColor = '#fff'
                this.nextColor = '#fff'
                if(this.mockDataContent.length - (this.currentPage*this.perPage) === 0)
                    this.nextColor = '#b3b3b3'
            }
            else{
                if((this.mockDataContent.length - ((this.currentPage) * this.perPage)) > 0){
                    this.tempPerPage = this.mockDataContent.length - (this.currentPage*this.perPage);
                    this.currentPage++;
                    this.backColor = '#fff'
                    this.nextColor = '#b3b3b3'
                }
                else{
                    return console.log("Ileri gidilemez")
                }
            }
        },
        goFirstPage(){
            this.currentPage = 1;
            this.tempPerPage = this.perPage;
            this.backColor = '#b3b3b3'
            this.nextColor = '#fff'
        },
        backPage(){
            if(this.currentPage === 1){
                this.backColor = '#b3b3b3'
                this.nextColor = '#fff'
                return console.log('Geri gidilemez')
            }
            else{
                this.backColor = '#fff'
                this.nextColor = '#fff'
                this.currentPage -= 1;
                this.tempPerPage = this.perPage;
                if(this.currentPage === 1)
                    this.backColor = '#b3b3b3'
            }
        },
        goLastPage(){
            if((this.mockDataContent.length/this.perPage)%1==0){
                this.currentPage = Math.floor(this.mockDataContent.length/this.perPage);
            }
            else{
                this.currentPage = Math.floor(this.mockDataContent.length/this.perPage) +1
                this.tempPerPage = this.mockDataContent.length % this.perPage
            }
            this.backColor = '#fff'
            this.nextColor = '#b3b3b3'
        },
        openModal(){
            this.isOpenedModal = true;
        },
        searchInArr(){
            this.selectedHeaderSort={
                title:'',
                sortBy:''
            }
            if(this.searchText === '')
                this.mockDataContent = _.cloneDeep(this.tempMockDataContent);
            else{
                this.mockDataContent = this.tempMockDataContent.filter(e=>e.find(k=>_.upperCase(k).includes(_.upperCase(this.searchText))))
            }

            if(this.mockDataContent.length <= this.tempPerPage){
                this.backColor = '#b3b3b3'
                this.nextColor = '#b3b3b3'
            }
            else{
                this.backColor = '#b3b3b3'
                this.nextColor = '#fff'
            }
        },
        closedModal(){
            this.isOpenedModal = false;
            this.mockDataHeader = _.cloneDeep(JSON.parse(window.localStorage.getItem('mockData')).cols)
            this.mockDataContent = _.cloneDeep(JSON.parse(window.localStorage.getItem('mockData')).data)
            this.tempMockDataContent = _.cloneDeep(this.mockDataContent);
        },
        ...mapMutations([
            "setAlert"
        ]),
    },
    mounted(){
        this.closedModal();
    },
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/transition.scss";
.main-main{
    height: 100%;
    width: 100%;
    @include d-flex(column,center,center);
    .main-wrapper{
        border-radius: 8px;
        @include d-flex(column,flex-start,stretch);
        width: 80%;
        background: linear-gradient(180deg, #3ABDFB 0%, #6982FB 100%);
        .main-header{
            width: 100%;
            @include d-flex(row,space-between,center);
            padding: 12px;
            .add-new-and-table-name{
                @include d-flex-center;
                gap: 12px;
                font-size: 2rem;
                color: #fff;
            }
            .search-box{
                border: 1px solid #fff;
                border-radius: 999px;
                @include d-flex(row,flex-start,stretch);
                .search-icon{
                    @include d-flex-center;
                    padding: 6px 6px 6px 12px;
                    flex: 0 0 auto;
                }
                .search-input{
                    flex: 1 0 1px;
                    padding: 6px 12px 6px 6px;
                    color: #fff;
                    outline: none;
                    border: none;
                    font-size: 1.6rem;
                    background-color: transparent;
                    &::placeholder{
                        color: rgb(255, 255, 255);
                    }
                }
            }
        }
        .table-wrapper{
            height: 100%;
            overflow: auto;
            padding: 12px;
            padding-top: 0;
            color: #fff;
            border-radius: 8px;
            position: relative;
            table {
                border-radius: 8px;
                border-collapse: collapse;
                width: 100%;
                
                .list-header{
                    background: rgba(251, 251, 251, 0.25);
                    width: 100%;
                    .list-header-item{
                        cursor: pointer;
                        position: relative;
                        text-align: left;
                        padding: 12px;
                        font-size: 1.6rem;
                        font-weight: 700;
                        transition: all .1s linear;
                        &:hover{
                            background-color: rgba(251, 251, 251, 0.3);
                        }
                        .arrow{
                            @include d-flex-center;
                            position: absolute;
                            right: 10px;
                            top: 50%;
                            transform: translate(0,-50%);
                        }
                    }
                }
                .list-content-item-wrapper{
                    .list-content-item{
                        padding: 12px;
                        font-size: 1.6rem;
                        word-break: break-all;
                        
                    }
                }
                th{
                    &:first-child{
                        border-top-left-radius: 8px;
                    }
                    &:last-child{
                        border-top-right-radius: 8px;
                    }
                }
                th,td{
                    &:not(:last-child){
                        border-right: 1px solid #fff;
                    }
                }
                tr{
                    &:not(:last-child){
                        border-bottom: 1px solid #fff
                    }
                }
                
            }
            .no-data-found{
                color: rgb(243, 243, 243);
                font-size: 3rem;
                font-weight: 700;
                @include d-flex-center;
                
            }
        }
        .pagination-wrapper{
            width: 100%;
            padding: 12px;
            @include d-flex(row,space-between,center);
            .pagination-info{
                font-size: 1.3rem;
                color: #fff;
                @include d-flex-center;
            }
            .pagination-route-wrapper{
                @include d-flex-center;
                gap: 24px;
                .pagination-route{
                    @include d-flex-center;
                    gap: 12px;
                    .skip-back,.backward,.next,.skip-next{
                        cursor: pointer;
                        @include d-flex-center;
                    }
                }
                .select-perpage{
                    @include d-flex-center;
                    .select-box{
                        outline: none;
                        font-size: 1.3rem;
                        border-radius: 4px;
                        padding: 2px 6px;
                    }
                }
            }
            
        }
    }
    .add-new-user{
        width: 60%;
        height: 100%;
        @include d-flex(column,center,center);
        gap: 24px;
        .inputs{
            @include d-flex(column,center,flex-start);
            gap: 8px;
            font-size:2rem;
            color: #454545;
            width: 100%;
            .input-header{
                @include d-flex-center;
                font-weight: 700;
            }
            .new-user-inputs{
                width: 100%;
                padding: 6px 10px;
                font-size: 1.8rem;
                outline: none;
                border: 1px solid #454545;
                border-radius: 4px;
            }
        }
        .add-button{
            background-color: rgb(61, 100, 185);
            border-radius: 8px;
            color: #fff;
            font-size: 2rem;
            padding: 6px 20px;
            align-self: flex-end;
            user-select: none;
            cursor: pointer;
            transition: all .1s linear;
            &:hover{
                filter: brightness(110%);
            }
        }
    }
    
}
</style>