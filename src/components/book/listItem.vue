<template>
  <li class="booklist-item zflex">
      <div class="book-cover back-center" :style="{backgroundImage: item.bookCover + '@190w'}"></div>
  </li>
</template>
<script>
export default {
  props:{
      item:{
          type: Object
      }
  }
}
</script>
<style lang="less">
    .booklist-item{
        padding: 0.3rem 0 0.3rem 0.4rem;
        background-color: #fff; 
        .book-cover{
            width:1.9rem;
            height:2.68rem;
        }
    }
</style>
