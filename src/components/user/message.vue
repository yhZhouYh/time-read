<template>
    <div class="ts-message tf-1px-b zflex">
        <img class="avatar" :src="msg.avatar" alt="">
        <!-- <div v-html="msg.templateStr"></div> -->
        <div v-html="dom.innerHTML"></div>
    </div>
</template>
<script>
import dateFormat from "../filters/timeFormat";

export default {
  name: "message",
  props: {
    msg: Object
  },
  data(){
      return {
          dom: ''
      }
  },
  filters: {
    dateFormat(time, fmt) {
      return dateFormat(time, fmt);
    }
  },
  created(){
      let dom = this.parseDom(this.msg.templateStr)
      let domNodes = dom.childNodes
      Array.from(domNodes[0].children).map((item, index)=>{
          if(item.innerText.indexOf('快去查看')>-1){
              var hrefVal = item.getAttribute('href')
              var bookId = hrefVal.substring(hrefVal.indexOf('k/') + 2, hrefVal.indexOf('?'))
              item.setAttribute('href','/timeread/#/bookDetail/' + bookId)
          }else{
              item.setAttribute('href', '/timeread/#/user/' + this.msg.senderId)
          }
      })
      this.dom = dom
  },
  methods: {
    parseDom(nodelist) {
      var objE = document.createElement("div");
      objE.innerHTML = nodelist;
      return objE;
    }
  }
};
</script>
<style lang="less">
.ts-message {
  background: #fff;
  padding: 0.25rem 0.27rem;
  .avatar {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.2rem;
  }
  &.zflex {
    align-items: flex-start;
  }
}
</style>
