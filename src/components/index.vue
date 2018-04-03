<template>
    <div class="container">
        <md-toolbar>
            <md-button class="md-icon-button" @click="toggleLeftSidenav">
                <md-icon>menu</md-icon>
            </md-button>
    
            <h2 class="md-title" style="flex: 1">svg editor</h2>
        </md-toolbar>
        <md-sidenav class="md-left" ref="leftSidenav" md-swipeable>
            <md-toolbar class="md-default">
                <div class="md-toolbar-container">
                    <h3 class="md-title">Sidenav content</h3>
                </div>
            </md-toolbar>
    
        </md-sidenav>
        <div class="box">

        </div>
    </div>
</template>
<script>
export default {
    name: 'index',
    methods: {
        toggleLeftSidenav() {
            this.$refs.leftSidenav.toggle()
        }
    }
}
</script>
<style>
.box{
    padding:10px;
    
}
.container{
    transition: all ease 0.3;
}
@media (min-width:1281px) {
    .md-toolbar .md-icon-button{
        display: none
    }
    .container {
        padding-left: 304px;
    }
    .md-sidenav .md-sidenav-content {
        top: 0;
        pointer-events: auto;
        transform: translate3d(0,0,0) !important;
        box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
    }
}
</style>


