<template>
    <div class="login-session-main">
        <div class="loading-screen">
            <div class="loading-item">
                <div class="loading-text">
                    {{loadingText}}
                </div>
                <div class="dots-bars-6"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
      loadingText:{type:String,default:'Loading'}
    },
}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
.login-session-main{
    user-select: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    @include d-flex-center;
    background-color: #fff;
    .loading-item {
      @include d-flex(row, flex-start, flex-end);
      gap: 5px;
      .loading-text {
        @include d-flex-center;
        font-size: 4.2rem;
        height: 4.2rem;
      }
      .dots-bars-6 {
        @include d-flex(column, flex-end, center);
        width: 40px;
        height: 10px;
        --c: radial-gradient(farthest-side, currentColor 93%, #0000);
        background:
          var(--c) 0 0,
          var(--c) 50% 0;
        background-size: 8px 8px;
        background-repeat: no-repeat;
        position: relative;
        clip-path: inset(-200% -100% 0 0);
        animation: db6-0 1.5s linear infinite;
        @media screen and (min-width: 1025px) and (max-width: 1440px) {
            width: 35px;
            height: 9px;
            background-size: 7px 7px;
        }
        @media screen and (min-width: 769px) and (max-width: 1024px) {
            width: 30px;
            height: 8px;
            background-size: 6px 6px;
        }
        @media screen and (min-width: 481px) and (max-width: 768px) {
            width: 25px;
            height: 7px;
            background-size: 5px 5px;
        }
        @media screen and (max-width: 480px) {
            width: 20px;
            height: 6px;
            background-size: 4px 4px;
        }
        &:before {
          content: "";
          position: absolute;
          width: 8px;
          height: 12px;
          background: currentColor;
          left: -16px;
          top: 0;
          animation:
                db6-12 1.5s linear infinite,
                db6-2 0.5s cubic-bezier(0, 200, .8, 200) infinite;
          @media screen and (min-width: 1025px) and (max-width: 1440px) {
            width: 7px;
            height: 11px;
          }
          @media screen and (min-width: 769px) and (max-width: 1024px) {
            width: 6px;
            height: 10px;
          }
          @media screen and (min-width: 481px) and (max-width: 768px) {
            width: 5px;
            height: 9px;
          }
          @media screen and (max-width: 480px) {
            width: 4px;
            height: 8px;
          }
          
        }

        &:after {
          content: "";
          position: absolute;
          inset: 0 0 auto auto;
          width: 8px;
          height: 8px;
          @media screen and (min-width: 1025px) and (max-width: 1440px) {
            width: 7px;
            height: 7px;
          }
          @media screen and (min-width: 769px) and (max-width: 1024px) {
            width: 6px;
            height: 6px;
          }
          @media screen and (min-width: 481px) and (max-width: 768px) {
            width: 5px;
            height: 5px;
          }
          @media screen and (max-width: 480px) {
            width: 4px;
            height: 4px;
          }
          border-radius: 50%;
          background: currentColor;
          animation: db6-3 1.5s linear infinite;
        }

        @keyframes db6-0 {

          0%,
          30% {
            background-position: 0 0, 50% 0
          }

          33% {
            background-position: 0 100%, 50% 0
          }

          41%,
          63% {
            background-position: 0 0, 50% 0
          }

          66% {
            background-position: 0 0, 50% 100%
          }

          74%,
          100% {
            background-position: 0 0, 50% 0
          }
        }
        @keyframes db6-12 {
          90% {
            transform: translateY(0)
          }

          95% {
            transform: translateY(15px)
          }

          100% {
            transform: translateY(15px);
            left: calc(100% - 6px)
          }
        }

        @keyframes db6-2 {
          100% {
            top: -0.1px
          }
        }

        @keyframes db6-3 {

          0%,
          80%,
          100% {
            transform: translate(0)
          }

          90% {
            transform: translate(26px)
          }
        }
      }
    }
}
</style>