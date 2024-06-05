import { createRouter, createWebHistory } from 'vue-router'
import Login from "../components/auth/Login.vue";
import AppLayout from "../layouts/AppLayout.vue";
import Register from "../components/auth/Register.vue";
import DashBoard from "../views/DashBoard.vue";
import DataBoard from "../views/DataBoard.vue";
import DashBoardDetail from "../views/DashBoardDetail.vue"
import Profile from "../views/Profile.vue"
import ErrorPage from "../views/ErrorPage.vue"
import store from '@/store/index.js';


const router = createRouter({
  history: createWebHistory(),
  routes: [

    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/admin",
      name: "admin",
      component: AppLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "profile",
          name: "profile",
          component: Profile,
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: DashBoard,
        }, {
          path: 'dashboard/:id',
          name: 'dashboard_single',
          component: DashBoardDetail
        },
        {
          path: "data",
          name: "data",
          component: DataBoard,
        }
      ]
    }, {
      path: "/:pathMatch(.*)*",
      name: "error",
      component: ErrorPage,
    }

  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.Auth || localStorage.token) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})



export default router
