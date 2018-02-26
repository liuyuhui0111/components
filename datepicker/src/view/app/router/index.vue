<!--  page : calendar -->
<template>
  <div>

  </div>
</template>

<!--逻辑-->
<script>
import {getQueryString} from 'assets/js/util.js'
export default {
  data() {
    return {}
  },
  mounted(){
    let arr = location.href.substring(0,location.href.length-2).split("?");
    let path = ''
    if(arr.length>1){
      if(getQueryString("page")){
        path = '/'+getQueryString("page")+'?'+arr[1]
      }else{
        path = '/typeList?'+arr[1]
      }
    }else{
      path = '/typeList'
    }
    location.href = arr[0]+'#'+path
  },
};
</script>

<style scoped>

</style>
