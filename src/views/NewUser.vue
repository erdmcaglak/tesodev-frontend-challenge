<template>
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
                    :class="item.value === onError ? 'error-user-inputs':'new-user-inputs'"    
                >
            </div>
            <button :disabled="isDisabled" @click="addNewUser" :class="isDisabled? 'disabled-add-button':'add-button'">
                Add
            </button>
        </div>
</template>

<script>
import {mapMutations} from "vuex"
import moment from "moment"
export default {
    data(){
        return{
            isDisabledButton:false,
            onError:"",
            isCanAddNewUser:true,
            newUserInputs:[
                {title:'Name Surname',placeHolder:'Enter name and surname',value:'nameSurname',inputHolder:'',type:'text',maxLength:'60'},
                {title:'Company',placeHolder:'Enter a company',value:'company',inputHolder:'',type:'text',maxLength:'40'},
                {title:'Email',placeHolder:'Enter a e-mail (abc@xyz.com)',value:'mail',inputHolder:'',type:'email',maxLength:'60'},
                {title:'Country',placeHolder:'Enter a country',value:'country',inputHolder:'',type:'text',maxLength:'40'},
                {title:'City',placeHolder:'Enter a city',value:'city',inputHolder:'',type:'text',maxLength:'40'},
            ],
        }
    },
    computed:{
        isDisabled(){
            this.isDisabledButton = false;
            for(let item of this.newUserInputs){
                if(item.inputHolder === '')
                    this.isDisabledButton = true;
            }
            return this.isDisabledButton;
        }
    },
    methods:{
        ...mapMutations([
            "setAlert"
        ]),
        inputLetterControl(e,item){
            if(item.value === this.onError){
                this.onError = ''
            }
            if(item.value!='mail' && !(/[a-z ]/i.test(String.fromCharCode(e.keyCode)))){
                e.preventDefault();
                return false;
            }
            else if (item.value === 'mail'){
                let re = /\S+@\S+\.\S+/;
                return re.test(item.inputHolder);
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
                    this.onError = item.value;
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
                        this.onError = item.value;
                        return
                    }
                    
                }
                else if((item.value === 'company' || item.value === 'country' || item.value === 'city')&& item.inputHolder.length < 2){
                    this.setAlert({
                        title:'Must longer name',
                        type:'warning'
                    })
                    this.isCanAddNewUser=false;
                    this.onError = item.value;
                }
                else if(item.value === 'nameSurname' && item.inputHolder.length < 4){
                    this.setAlert({
                        title:'Must longer name',
                        type:'warning'
                    })
                    this.isCanAddNewUser=false
                    this.onError = item.value;
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
                this.setAlert({
                    title:'New user successfully added',
                    type:'success'
                })
                this.newUserInputs.forEach(item=>{
                    item.inputHolder = ''
                })
            }
        },
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/transition.scss";
.add-new-user{
    margin: 0 auto;
    width: 60%;
    height: 100%;
    padding: 50px;
    @include d-flex(column,flex-start,center);
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
            transition: all .1s linear;
            &:hover{
                background: rgba(100, 100, 100, 0.08);
            }
        }
        .error-user-inputs{
            @extend .new-user-inputs;
            border: 1px solid #FF0000;
            color: #FF0000;
            &::placeholder{
                color: #FF0000;
            }
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
        border: none;
        &:hover{
            filter: brightness(110%);
        }
    }
    .disabled-add-button{
        background-color: rgb(124, 124, 124);
        border-radius: 8px;
        color: #fff;
        font-size: 2rem;
        padding: 6px 20px;
        align-self: flex-end;
        user-select: none;
        border: none;
    }
}
</style>