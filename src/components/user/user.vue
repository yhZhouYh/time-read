<template>
  <div class="ts-index ts-user">
      <z-header bckColor="#3d3c3e">
            <span slot="middle">个人中心</span>
            <icon slot="right" icon="icon-sousuo1"></icon>
            <icon slot="right" icon="icon-shouye"></icon>
        </z-header>
        <div class="ts-container">
            <div class="user-header zflex">
                <img :src="account.avatar"  class="avatar">
                <p class="desc zflex1">
                    <span>{{account.name}}</span>
                </p>
            </div>
            <div v-if="account.uid == $route.params.uid">
                <group>
                    <cell title="我的消息"  is-link @click.native="gonews">
                        <img class="user-icon" src="../../assets/imgs/news.png" slot="icon" alt="">
                    </cell>
                </group>
                <group>
                    <cell title="我的图书"  is-link @click.native="gobooks('我的图书')">
                        <img class="user-icon" src="../../assets/imgs/book.png" slot="icon" alt="">
                    </cell>
                    <cell title="我的收藏"  is-link @click.native="goCollect">
                        <img class="user-icon" src="../../assets/imgs/shoucang.png" slot="icon" alt="">
                    </cell>
                </group>
            </div>
            <div v-else>
                <group>
                    <cell title="他的图书"  is-link @click.native="gobooks('他的图书')">
                        <img class="user-icon" src="../../assets/imgs/book.png" slot="icon" alt="">
                    </cell>        
                </group>
            </div>
        </div>
  </div>
</template>
<script>
import group from "vux/src/components/group";
import cell from "vux/src/components/cell";
export default {
  name: "user",
  components: {
    group,
    cell
  },
  computed: {
    isLogin() {
      return this.$store.state.account.uid ? true : false;
    },
    account() {
      return this.$store.state.account;
    }
  },
  methods: {
    gonews() {
      this.$router.push({
        name: "myMessage",
        params: { uid: this.$store.state.account.uid }
      });
    },
    gobooks(title){
      this.$router.push({
        name: 'bookshelf',
        query: {
          myBook: 1,
          title,
          uid: this.$route.params.uid
        }
      })
    },
    goCollect(){
       this.$router.push({
        name: 'bookshelf',
        query: {
          myCollect: 1,
          title: '我的收藏',
          uid: this.$route.params.uid
        }
      })
    }
  }
};
</script>
<style lang="less">
.user-header {
  background: #fff;
  padding: 0.28rem;
  .avatar {
    width: 1.25rem;
    height: 1.25rem;
  }
  .desc {
    margin-left: 0.25rem;
  }
}
.user-icon {
  width: 0.4rem;
  margin-right: 0.2rem;
}
.weui-cell_access .weui-cell__ft:after {
  width: 9px !important;
  height: 9px !important;
}
</style>
