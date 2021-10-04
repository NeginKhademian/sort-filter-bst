import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/index.vue'
import notFound from './components/notFound.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
   
  },
 
  { path: '*',component:notFound },

]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
