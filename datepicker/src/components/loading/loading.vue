<!--  page : list -->
<template>
  <div>
    <p class="loading-box" v-show='visible' :class='position' >
      <span class="loading-icon"><i></i></span>
    </p>
  </div>
</template>

<style scoped>
  /*加载更多的样式*/
     .loading-box{position: fixed ; top:50% ;left: 50% ; transform: translate(-50% , -50%) ; -webkit-transform:  translate(-50% , -50%) ;}
    .loading-icon ,  .loading-icon i,  .loading-icon::before , .loading-icon::after{ display: inline-block; width:7px;height: 7px;position: relative;border-radius: 50%;  }
    .loading-icon i,  .loading-icon::before,   .loading-icon::after{background: #ACB3BF ;position: absolute;content: "";  }
    .loading-icon::before{ margin-left: -18px; animation: scaleLoop .5s   0s infinite alternate;-webkit-animation:  scaleLoop .5s   0s infinite alternate;  }
    .loading-icon i{    margin-left: -3.5px;animation: scaleLoop .5s  .25s infinite alternate; -webkit-animation:  scaleLoop .5s  .25s infinite alternate;  }
    .loading-icon::after{ margin-left: 11px; animation: scaleLoop .5s  .5s infinite alternate;-webkit-animation:  scaleLoop .5s   .5s infinite alternate;  }
    @-webkit-keyframes scaleLoop{from{-webkit-transform: scale(.1)} to{-webkit-transform:  scale(1)}}
    @keyframes scaleLoop{from{transform:  scale(.1)}to{transform:   scale(1)}}
 </style>

<!--逻辑-->
<script>
  export default {
    name: 'loading',
    data(){
      return {
        visible: false,
        message : '',
        position : ''
      }
    }
  }

</script>
