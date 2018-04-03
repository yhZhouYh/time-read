import Vue from 'vue'
// import ajax from 'vux/src/plugins/ajax'
import axios from 'axios'
import Toast from 'vux/src/plugins/toast'
// import Confirm from 'vux/src/plugins/confirm'
import store from '../store'
import queryString from '../assets/lib/querystring'
import router from '../router'

Vue.use(Toast)

const base_uri = 'http://www.apgbook.com/ts'
let count = 0 //loading计数
let request = {}

function fetchPod(url, data, loading, form) {
    // let state = store.state.loading
    // if (loading) {
    //     store.state.loading = true
    //     count += 1
    // }

    // if (request[url]) {
    //     return
    // } else {
    //     request[url] = url
    // }
    return new Promise((resolve, reject) => {
        // if (loading) {
        //     store.dispatch('changeLoading')
        // }

        if (form) {
            data = queryString.stringify(data)
        }
        axios.post(base_uri + url, data, {
            headers: {
                'ts-uid': store.state.account.uid,
                'ts-token': store.state.account.token
            }
        }).then(res => {
            // if (count > 0) {
            //     count -= 1
            // }
            // delete request[url]
            // if (count == 0) {
            //     store.state.loading = false
            // }

            if (res.data.code == '000') {

                resolve(res.data.data)
            } else {
                resolve(res.data)
            }
        }).catch(error => {
            if (count > 0) {
                count -= 1
            }
            delete request[url]
            if (count == 0) {
                store.state.loading = false
            }
            switch (error.response.status) {
                case 503:
                    dealError(error.response.data.msg || error.response.data.data)
                    // resolve()
                    break;
                case 500:
                    dealError('网络异常')
                    break;
                case 400:
                    if (error.response.data.code == 'invalidtoken') {
                        router.push({
                            path: '/login',
                            query: { redirect: router.app.$route.fullPath }
                        }) // 登录页
                        break;
                    } else {
                        dealError(error.response.data.msg || error.response.data.data)
                        // resolve()
                        break;
                    }
                default:
                    dealError('网络异常')
            }

        })
    })
}

/**
 * 改变loading状态
 */
function getLoading() {
    let state = store.state.loading
    if (state) {
        store.dispatch('changeLoading')
    }
}

/**
 * 错误弹出
 * @param {*} msg 
 */
function dealError(msg) {
    Vue.$vux.toast.show({
        text: msg,
        position: 'bottom',
        width: 'auto',
        type: 'text'
    })
}

//获取书本信息
export function getBook(data) {
    return fetchPod('/book/getBook', data, true)
}

//获取书本信息
export function getNextChaper(data) {
    return fetchPod('/book/getNextChapter', data, true)
}

//获取书本信息
export function getPreChapter(data) {
    return fetchPod('/book/getPreChapter', data, true)
}

//获取书本目录信息
export function getMenu(data) {
    return fetchPod('/book/getMenu', data, true)
}

//获取章节
export function getChapter(data) {
    return fetchPod('/book/getChapter', data, true)
}

//登录
export function login(data) {
    return fetchPod('/member/login', data, true)
}

//获取验证码

export function verifyCode(data) {
    return fetchPod('/member/sendCode', data, true)
}


//图书详情
export function bookDetails(data) {
    return fetchPod('/book/bookInfo', data, true)
}

//订单支付
export function pay(data) {
    // return new Promise((resolve, reject) => {
    //     // if (loading) {
    //     //     store.dispatch('changeLoading')
    //     // }
    //     count += 1
    //     // if (form) {
    //     //     data = queryString.stringify(data)
    //     // }
    //     axios.post('http://192.168.1.136:8080/tfmobile/pod/wxpay', data, {
    //         // headers: {
    //         //     'ts-uid': store.state.account.uid,
    //         //     'ts-token': store.state.account.token
    //         // }
    //     }).then(res => {
    //         count -= 1
    //         // delete request[url]
    //         if (count == 0) {
    //             store.state.loading = false
    //         }
    //         resolve(res.data)
    //         // if (res.data.code == '000') {

    //         //     resolve(res.data.data)
    //         // } else {
    //         //     resolve(res.data)
    //         // }
    //     }).catch(error => {
    //         count -= 1
    //         delete request[url]
    //         if (count == 0) {
    //             store.state.loading = false
    //         }
    //         switch (error.response.status) {
    //             case 503:
    //                 dealError(error.response.data.msg)
    //                 // resolve()
    //                 break;
    //             case 500:
    //                 dealError('网络异常')
    //                 break;
    //             case 400:
    //                 if (error.response.data.code == 'invalidtoken') {
    //                     router.push({
    //                         path: '/login',
    //                         query: { redirect: router.app.$route.fullPath }
    //                     }) // 登录页
    //                     break;
    //                 } else {
    //                     dealError(error.response.data.msg)
    //                     // resolve()
    //                     break;
    //                 }
    //         }

    //     })
    // })
    return fetchPod('/order/pay', data, true)
}

//创建订单
export function createOrder(data) {
    return fetchPod('/order/create', data, true)
}

//找回密码
export function findPwd(data) {
    return fetchPod('/member/findBackPwd', data, true)
}


//注册
export function register(data) {
    return fetchPod('/member/register', data, true)
}

//注册
export function getUserInfo(data) {
    return fetchPod('/member/userInfo', data, true)
}

//首页展示图书
export function indexBook(data) {
    return fetchPod('/book/indexBook', data, true)
}

//热门出版社
export function indexPress(data) {
    return fetchPod('/press/hotPress', data, true)
}

//排行榜
export function rankList(data) {
    return fetchPod('/rank/rankList', data)
}

//分类信息
export function getCategoryInfo(data) {
    return fetchPod('/category/getCategoryInfo', data, true)
}

//根据分类查找书列表
export function queryCategoryBook(data) {
    return fetchPod('/book/queryCategoryBook', data)
}

//获取评论数据
export async function getComment(data) {
    return fetchPod('/book/bookCatalog', data)
}

//评论
export function bookComment(data) {
    return fetchPod('/book/bookComment', data)
}

//删除评论
export function deleteBookComment(data) {
    return fetchPod('/book/deleteBookComment', data)
}

//点赞
export function bookLike(data){
    return fetchPod('/book/bookLike', data)    
}

//收藏
export function collectBook(data){
    return fetchPod('/collect/collectBook', data)    
}

//取消收藏
export function cancelCollectBook(data){
    return fetchPod('/collect/cancelCollectBook', data)    
}

//我的消息
export function getMessage(data){
    return fetchPod('/message/getMessage', data)    
}

//我的图书
export function myBook(data){
    return fetchPod('/book/myBook', data)    
}

//我的图书
export function myCollect(data){
    return fetchPod('/collect/myCollection', data)    
}

//入驻的出版社
export function joinPressInfo(data){
    return fetchPod('/press/joinPressInfo', data)    
}

//出版社推荐图书
export function hotRecommend(data){
    return fetchPod('/press/hotRecommend', data, true)    
}

//出版社最新
export function latestBooks(data){
    return fetchPod('/press/latestBooks', data, true)    
}

//搜索
export function searchBook(data){
    return fetchPod('/book/searchBook', data)    
}

//关键词
export function keyWord(data){
    return fetchPod('/rank/keyWord', data)    
}