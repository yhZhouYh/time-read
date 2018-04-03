<template>
    <div class="zflex">
        <div class="zflex1 tf-1px"></div>
        <div class="divider-word">{{text}}</div>
        <div class="zflex1 tf-1px"></div>
    </div>
</template>
<script>
export default {
    name: 'divider',
    props: {
        text: String
    }
}
</script>
<style>

.divider-word{
    margin: 0 12px;
}
</style>
