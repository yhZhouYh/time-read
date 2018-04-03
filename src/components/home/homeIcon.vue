<template>
  <icon icon="icon-shouye" @click.native="gohome"></icon>
</template>
<script>
export default {
  name: 'home-icon',
  methods: {
    gohome(){
      this.$router.push({name: 'home'})
    }
  }
}
</script>
