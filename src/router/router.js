import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from "@/components/HelloWorld";
import NotFound404 from "@/components/NotFound404";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: HelloWorld
  },
  {
    path: '*',
    component: NotFound404
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
