import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        account: JSON.parse(localStorage.getItem('account')) || {
            uid: '',
            token: ''
        },

        footData: {
            menu: { active: false, name: '目录', icon: 'icon-mulu' },
            moon: { icon: 'icon-yejian', name: '夜间', active: localStorage.getItem('moonStatus') || false },
            set: { icon: 'icon-shezhi1', name: '设置', active: false },
            cache: { icon: 'icon-qingli', name: '清除缓存', active: false }
            // bookmark: { icon: 'icon-shuqian', name: '书签', active: false },
            // booknote: { icon: 'icon-biji01', name: '笔记', active: false }
        },
        loading: false, //全局loading动画
        bookInfo: JSON.parse(localStorage.getItem('bookInfo')) || { //阅读信息
            book_name: '',
            bookPrice: '',
            chapter_num: 0,
            cid: 0,
            need_pay: 0,
            title: '',
            html: '',
            pageScroll: 0,
            pageMin: 0,
            isPay: 0
        },
        pageInfos: JSON.parse(localStorage.getItem('pageInfos')) || {}, //整体阅读信息
        pageInfo: JSON.parse(localStorage.getItem('pageInfo')) || {}, //阅读当前页信息
        readSet: JSON.parse(localStorage.getItem('readSet')) || { //阅读器设置缓存
            // moonStatus: this.store.state.footData.moon.active,
            fontSize: 18,
            themeColor: ''
        },
        chapterMenu: [], //目录信息
        comment: [], //评论信息
        direction: 'forward',
        hotBooks: [], //热门书籍       
    },
    mutations: {
        [types.SET_ACCOUNT](state, account) {
            localStorage.setItem('account', JSON.stringify(account))
            state.account = account
        },

        [types.FOOTDATA](state, obj) {
            if (obj.type == 'moon') {
                localStorage.setItem('moonStatus', status)
            }
            state.footData = obj
        },
        [types.CANCELDATA](state, current) {
            let footData = state.footData
            Object.keys(footData).map(key => {
                if (key != 'moon') {
                    if (key == current && current) {
                        return
                    } else {
                        footData[key].active = false
                    }
                }
            })
        },
        [types.CHANGE_LOADING](state) {
            state.loading = !state.loading
        },
        [types.GET_PAGEINFO](state, obj) {
            localStorage.setItem('pageInfos', JSON.stringify(obj))
            state.pageInfos = obj
        },
        [types.SET_SINGLEPAGEINFO](state, obj) {
            localStorage.setItem('bookInfo', JSON.stringify(obj))
            state.bookInfo = obj
        },

        // [types.REMOVE_SINGLEPAGEINFO](state, obj) {
        //     localStorage.remove('bookInfo', JSON.stringify(obj))
        // },

        [types.SET_READSET](state, obj) {
            localStorage.setItem('readSet', JSON.stringify(obj))
            state.readSet = obj
        },
        [types.SET_CHAPTERMENU](state, arr) {
            state.chapterMenu = arr
        },
        [types.SET_COMMENT](state, arr) {
            state.comment = arr
        },
        [types.CHANGE_DIRECTION](state, direction) {
            state.direction = direction
        },
        [types.SAVE_HOTBOOKS](state, books) {
            state.hotBooks = books
        }
    },
    actions: {
        setAccount({ commit }, account) {
            commit(types.SET_ACCOUNT, account)
        },
        changeFoot({ commit }, obj) {
            commit(types.FOOTDATA, obj)
        },
        cancelFoot({ commit }, key) {
            commit(types.CANCELDATA, key)
        },
        changeLoading({ commit }) {
            commit(types.CHANGE_LOADING)
        },
        getPageInfo({ commit }, obj) {
            commit(types.GET_PAGEINFO, obj)
        },
        setSinglePageInfo({ commit }, obj) {
            commit(types.SET_SINGLEPAGEINFO, obj)
        },
        setReadSet({ commit }, obj) {
            commit(types.SET_READSET, obj)
        },
        setChapterMenu({ commit }, arr) {
            commit(types.SET_CHAPTERMENU, arr)
        },
        setComment({ commit }, arr) {
            commit(types.SET_COMMENT, arr)
        },
        changeDirection({ commit }, direction) {
            commit(types.CHANGE_DIRECTION, direction)
        },
        saveHotBooks({ commit }, books) {
            commit(types.SAVE_HOTBOOKS, books)
        }
    }
})