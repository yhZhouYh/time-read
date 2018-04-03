<template>
    <div class="sort-groups">
        <span class="sort-item" v-for="(item, index) in groups" :class="{active: item.id == currentId}" @click="sortClick(item)" :key="index">
            <span>{{item.name}}</span>
        </span>
        <span class="sort-item price" @click="clickPrice" :class="{active: currentId==4}">
            <span class="price">价格</span>
            <div :class="!orderBy?'triangle-up':'triangle-down'"></div>
        </span>
    </div>
</template>

<script>
export default {
    name: 'sort',
    data() {
        return {
            groups: [
                { id: 1, name: '最热' },
                { id: 2, name: '最新' },
                { id: 3, name: '销量' },
            ],
            currentId: 1,
            orderBy: 1
        }
    },
    methods: {
        sortClick(item) {
            if (this.currentId != item.id) {
                this.currentId = item.id
                 this.$emit('sort', this.currentId)
            }
           
        },
        clickPrice() {
            if (this.currentId == 4) {
                this.orderBy = !this.orderBy
            }
            this.currentId = 4
            this.$emit('sort', this.currentId, this.orderBy ? 1 : 0)
        }
    }
}
</script> 
<style lang="less">
.sort-item {
    padding-right: 0.6rem;
    color: #b1b1b1;
    font-size: 0.3rem;
    span {
        vertical-align: middle;
    }
    &.active {
        color: #000;
        .triangle-up {
            border-bottom-color: #000;
        }
        .triangle-down {
            border-top-color: #000;
        }
    }
    .price {
        padding-right: 1px;
    }
}

.triangle-up {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 5px solid;
    border-bottom-color: #b1b1b1;
    vertical-align: middle;
}

.triangle-down {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid;
    border-top-color: #b1b1b1;
    vertical-align: middle;
}
</style>