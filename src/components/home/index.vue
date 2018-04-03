<template>
  <div class="ts-index ts-home">
    <z-header bckColor="#3d3c3e" :showArrow="false">
      <!-- <icon slot="left" icon="icon-sousuo1"></icon> -->
      <search-icon slot="left"></search-icon>
      <img slot="middle" src="../../assets/imgs/logo2.png" class="header-logo">
      <icon slot="right" icon="icon-wode" v-if="!isLogin" @click.native="login"></icon>
      <img slot="right" :src="account.avatar" v-else class="avatar" @click="goUser">
    </z-header>
    <div class="ts-container" ref="container">
      
      <!-- <div class="carousel">
        <carousel :imgs="imgs" dotColor="#ffbf01" @itemClick="itemClick"></carousel>
      </div> -->
      <tab active-color="#f6c243">
        <tab-item v-for="(item, index) in menu" :key="index" :selected="$route.path == item.route" @click.native="itemClick(item)">{{item.name}}</tab-item>
      </tab>
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Tab from 'vux/src/components/tab/tab'
import TabItem from 'vux/src/components/tab/tab-item'
import Carousel from '../common/Carousel'
export default {
  name: 'index',
  components: {
    Tab,
    TabItem,
    Carousel
  },
  data() {
    return {
      imgs: [
        require('../../assets/imgs/sample.jpg'),
        require('../../assets/imgs/sample.jpg')
      ],
      menu: [
        { route: '/', name: '首页', id: 0 },
        { route: '/category', name: '分类', id: 1 },
        { route: '/rankList', name: '排行', id: 2 },
        { route: '/press', name: '出版社', id: 3 }
      ],
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.account.uid ? true : false
    },
    account() {
      return this.$store.state.account
    }
  },
  methods: {
    itemClick(i) {
      this.$router.push(i.route)
    },
    login() {
      this.$router.push({ name: 'login', query: { redirect: this.$route.fullPath } })
    },
    refresh(e, v, self) {
      this.loading = true
      setTimeout(() => {
        self.forbiden = false
        self.to(0)
        this.loading = false
      }, 2000);
    },
    goUser(){
      this.$router.push({name:'user', params:{uid: this.account.uid}})
    }
  }
}
</script>
<style lang="less">
.loading {
  height: 2.5rem;
  width: 100%;
  position: relative;
  margin-top: -2.5rem;
}

.ts-index {
  .carousel {
    height: 2.68rem; // margin-top:44px;
  }
  .header-logo {
    width: 0.98rem;
    height: 0.55rem;
  }
  // &.ts-home {
  //   .ts-container {
  //     position: relative;
  //     // padding-top: 0; // margin-top: 0.8rem; // z-index: 200;
  //   }
  // }

  // .vux-tab {
  //   position: sticky;
  //   left: 0;
  //   right: 0;
  //   z-index: 200;
  //   top:0;
  // }
}
</style>


