import Vue from 'vue'
import Router from 'vue-router'
// const read = () => { import('@/components/read/index') }
import read from '@/components/read/index'
import login from '@/components/user/login'
import payDetail from '@/components/pay/payDetail'
import forgetPass from '@/components/user/forgetPass'
import register from '@/components/user/register'
import index from '@/components/home/index'
import payAli from '@/components/pay/payAli'
import bookshelf from '@/components/book/bookshelf'
import home from '@/components/home/home'
import category from '@/components/home/category'
import bookDetail from '@/components/book/bookDetail'
import currentMenu from '@/components/book/currentMenu'
import moreComment from '@/components/book/moreComment'
import user from '@/components/user/user'
import myMessage from '@/components/user/myMessage'
import rankList from '@/components/home/rankList'
import press from '@/components/home/press'
import morePress from '@/components/home/pressMore'
import pressInfo from '@/components/home/pressInfo'
import search from '@/components/home/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children: [
        { path: '', name: 'home', component: home },
        { path: '/category', name: 'category', component: category },
        { path: '/rankList', name: 'rank', component: rankList },
        { path: '/press', name: 'press', component: press }
      ]
    },
    {
      path: '/read/:bookId',
      name: 'read',
      component: read
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/payDetail/:bookId/:orderId',
      name: 'payDetail',
      component: payDetail
    },
    {
      path: '/forgetPass',
      name: 'forgetPass',
      component: forgetPass
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/payAli',
      name: 'payAli',
      component: payAli
    },
    {
      path: '/bookshelf',
      name: 'bookshelf',
      component: bookshelf
    },
    {
      path: '/bookDetail/:bookId',
      name: 'bookDetail',
      component: bookDetail
    },
    {
      path: '/currentMenu',
      name: 'currentMenu',
      component: currentMenu
    },
    {
      path: '/moreComment/:bookId',
      name: 'moreComment',
      component: moreComment
    },
    {
      path: '/user/:uid',
      name: 'user',
      component: user
    },
    {
      path: '/myMessage/:uid',
      name: 'myMessage',
      component: myMessage
    },
    {
      path: '/morePress',
      name: 'pressMore',
      component: morePress
    },
    {
      path: '/pressInfo/:pressId',
      name: 'pressInfo',
      component: pressInfo
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }
  ]
})
