import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/views/Home.vue"
import List from "@/views/List.vue"
import NewUser from "@/views/NewUser.vue"
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component : Home,
    name:"HomePage"
  },
  {
    path:'/list',
    component: List,
    name:'ListPage'
  },
  {
    path:'/add-new-user',
    component: NewUser,
    name:'NewUser'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
