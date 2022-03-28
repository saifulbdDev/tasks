import Vue from "vue";
import Router from "vue-router";

import Login from "@/pages/Login";

import DashboardLayout from "@/components/Dashboard/Layout/Layout";
import Users from "@/pages/Dashbords/users/Index.vue";
import UserAdd from "@/pages/Dashbords/users/Add.vue";
import UserDetails from "@/pages/Dashbords/users/Details.vue";
import UserUpdate from "@/pages/Dashbords/users/Update.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/",
      redirect: "dashboard",
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardLayout,
      meta: {
        requiresAuth: true,
      },
      redirect: "/dashboard/user-list",
      children: [
        {
          meta: { title: "User List", requiresAuth: true },
          path: "/dashboard/user-list",
          component: Users,
        },
        {
          meta: { title: "User Create", requiresAuth: true },
          path: "/dashboard/user-create",
          component: UserAdd,
        },
        {
          meta: { title: "User Update", requiresAuth: true },
          path: "/dashboard/user-update/:id",
          component: UserUpdate,
        },
        {
          meta: { title: "User Update", requiresAuth: true },
          path: "/dashboard/user-details/:id",
          component: UserDetails,
        },
      ],
    },

    {
      path: "*",
      name: "Error",
      component: Error,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("auth_token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
