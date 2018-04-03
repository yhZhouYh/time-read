<template>
  <svg>
    <circle :cx="cx" :cy="cy" :r="r"></circle>
  </svg>
</template>
<script>
export default {
  name: 'circle',
  props: {
      cx: {
          type: String,
          default: 100
      },
      cy: {
          type: String,
          default: 100
      },
      r: {
          type: String,
          default: 10
      }

  }
}
</script>

