<template>
  <icon icon="icon-sousuo1" @click.native="gohome"></icon>
</template>
<script>
export default {
  name: 'home-icon',
  methods: {
    gohome(){
      this.$router.push({name: 'search'})
    }
  }
}
</script>
