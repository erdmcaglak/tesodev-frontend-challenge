<template>
    <!-- 
        //! Modal responsive sample
        <Modal
            :isOpen="isOpen"
            @clickEvent="Method"
            dropBg="transparent"
            modalBg="#fff"
            radius="10"
            important //? Eğer important olursa dışarıya tıklanıldığında kapanmaz
            :width="{
                default:'80',
                lg:'85',
                md:'90',
                sm:'95',
                xs:'10',
            }"
            :height="{
                default:'80',
                lg:'85',
                md:'90',
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
            //! Your code here
        </Modal>
     -->
    <transition name="fade-scale" appear>
        <div id="modal-wrapper" :style="styleObject" @click.stop class="modal-main">
            <div @click.stop id="modal" v-if="isOpen && isOpenedModal" key="fade-scale-modal" class="modal">
                <div @click="closeModal" class="close-icon">
                    <Icon 
                        icon="close.svg"
                        :width="closeIconSize"
                        pointerNone
                        :iconColor="closeIconColor"
                    />
                </div>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
import Icon from "@/generic-components/icon/Icon.vue"
export default {
    data(){
        return{
            isOpenedModal:false
        }
    },
    props:{
        isOpen:{type:Boolean,default:true},
        clickEvent:{type:Function},
        width:{type:Object,required:true},
        height:{type:Object,required:true},
        dropBg:{type:String,default:'transparent'},
        modalBg:{type:String,default:'#fff'},
        radius:{type:String|Number,default:'10'},
        closeIconPosition:{type:Object},
        closeIconSize:{type:Object},
        closeIconColor:{type:String,default:'#000'},
        important:{type:Boolean,default:false},
    },
    computed:{
        styleObject:function(){
            return{
                '--default-width':this.width.default+'%',
                '--lg-width':this.width.lg+'%',
                '--md-width':this.width.md+'%',
                '--sm-width':this.width.sm+'%',
                '--xs-width':this.width.xs+'%',

                '--default-height':this.height.default+'%',
                '--lg-height':this.height.lg+'%',
                '--md-height':this.height.md+'%',
                '--sm-height':this.height.sm+'%',
                '--xs-height':this.height.xs+'%',

                '--default-position':this.closeIconPosition.default+'px',
                '--lg-position':this.closeIconPosition.lg+'px',
                '--md-position':this.closeIconPosition.md+'px',
                '--sm-position':this.closeIconPosition.sm+'px',
                '--xs-position':this.closeIconPosition.xs+'px',

                '--drop-bg': this.dropBg,
                '--modal-bg':this.modalBg,
                '--radius': this.radius+'px'
            }
        }
    },
    components:{
        Icon
    },
    methods:{
        closeModal(){
            this.$emit('update:isOpen',!this.isOpen)
            //this.isOpenedModal = false
            setTimeout(() => {
                this.$emit('clickEvent')
            }, 200);
        },
        eventListenerFunc(e){
            if(e.target.id ==='modal-wrapper'){
                this.closeModal();
            }
        }
    },
    destroyed(){
        document.getElementById('modal-wrapper').removeEventListener('click',this.eventListenerFunc)
    },
    mounted(){
        if(!this.important)
            document.getElementById('modal-wrapper').addEventListener('click',this.eventListenerFunc)
        this.isOpenedModal = this.isOpen;
    }
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/transition.scss";
.modal-main{
    overflow: hidden;
    @include d-flex-center;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: var(--drop-bg);
    
    .modal{
        @include d-flex-center;
        overflow: hidden;
        @include box-shadow(0px,0px,18px,-8px,rgba(0,0,0,0.75));
        padding: 10px;
        position: relative;
        width: var(--default-width);
        height: var(--default-height);
        background-color: var(--modal-bg);
        border-radius: var(--radius);
        @media screen and (max-width: 1440px) {
            padding: 9px;
            width: var(--lg-width);
            height: var(--lg-height);
        }
        @media screen and (max-width: 1024px) {
            padding: 8px;
            width: var(--md-width);
            height: var(--md-height);
        }
        @media screen and (max-width: 768px) {
            padding: 7px;
            width: var(--sm-width);
            height: var(--sm-height);
        }
        @media screen and (max-width: 480px) {
            padding: 6px;
            width: var(--xs-width);
            height: var(--xs-height);
        }
        .close-icon{
            position: absolute;
            right: var(--default-position);
            top: var(--default-position);
            cursor: pointer;
            @media screen and (max-width: 1440px) {
                right: var(--lg-position);
                top: var(--lg-position);
            }
            @media screen and (max-width: 1024px) {
                right: var(--md-position);
                top: var(--md-position);
            }
            @media screen and (max-width: 768px) {
                right: var(--sm-position);
                top: var(--sm-position);
            }
            @media screen and (max-width: 480px) {
                right: var(--xs-position);
                top: var(--xs-position);
            }
        }
    }
}
</style>