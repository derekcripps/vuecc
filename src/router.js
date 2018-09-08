import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import WarehouseList from './views/Warehouse/WarehouseList.vue'
import WarehouseEdit from './views/Warehouse/WarehouseEdit.vue'
import CompanyList from './views/Company/CompanyList.vue'
import CompanyEdit from './views/Company/CompanyEdit.vue'
import CompanyAdd from './views/Company/CompanyAdd.vue'
import auth from '@/components/auth'
import Axios from 'axios'
import Main from '@/components/Main.vue'
import Login from '@/components/Login.vue'
import testAPI from './views/testAPI/testAPI.vue'

Vue.use(Router)

//export default new Router({
  const router = new Router({
routes: [
    { path: '/', name: 'Main', component: Main, meta: { requiresAuth: true } },
    { path: '/login', name: 'Login', component: Login, meta: { requiresAuth: false } },
    { path: '/home', name: 'Home', component: Home },
    { path: '/companylist', name: 'CompanyList', component: CompanyList , meta: {requiresAuth: true} },
    { path: '/companyedit', name: 'CompanyEdit', component: CompanyEdit , meta: {requiresAuth: true} },
    { path: '/companyadd', name: 'CompanyAdd', component: CompanyAdd , meta: {requiresAuth: true}},
    { path: '/warehouselist', name: 'WarehouseList', component: WarehouseList , meta: {requiresAuth: true} },
    { path: '/warehouseedit', name: 'WarehouseEdit', component: WarehouseEdit , meta: {requiresAuth: true} },
    { path: '/testAPI', name: 'testAPI', component: testAPI , meta: {requiresAuth: false} },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.getItem('isAuthenticated')==='false') {
      console.log('check2')
      console.log(localStorage.getItem('isAuthenticated'))
      next({

        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
});

export default router;