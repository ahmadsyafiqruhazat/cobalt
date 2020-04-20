/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from "vue";
import Router from "vue-router";
import store from "./store/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      // TODO: Revert routing rules after integration with backend
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      component: () => import("./layouts/main/Main.vue"),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "/",
          name: "home",
          component: () => import("./views/Home.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("./views/Profile.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/profile/schedule",
          name: "schedule",
          component: () => import("./views/Schedule.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/pages/profile",
          name: "page-profile",
          component: () => import("@/views/pages/Profile.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Pages" },
              { title: "Profile", active: true }
            ],
            pageTitle: "Profile",
            // rule: "editor"
            requiresAuth: true
          }
        },
        {
          path: "/apps/user/user-list",
          name: "app-user-list",
          component: () => import("@/views/apps/user/user-list/UserList.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "User" },
              { title: "List", active: true }
            ],
            pageTitle: "User List",
            // rule: "editor"
            requiresAuth: true
          }
        },
        {
          path: "/apps/user/user-view/:userId",
          name: "app-user-view",
          component: () => import("@/views/apps/user/UserView.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "User" },
              { title: "View", active: true }
            ],
            pageTitle: "User View",
            // rule: "editor"
            requiresAuth: true
          }
        },
        {
          path: "/apps/user/user-edit/:userId",
          name: "app-user-edit",
          component: () => import("@/views/apps/user/user-edit/UserEdit.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "User" },
              { title: "Edit", active: true }
            ],
            pageTitle: "User Edit",
            // rule: "editor"
            requiresAuth: true
          }
        },
        {
          path: "/directory",
          name: "directory",
          component: () => import("./views/Directory.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/chat",
          name: "chat",
          component: () => import("./views/apps/chat/Chat.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/dashboard/analytics",
          name: "dashboard-analytics",
          component: () => import("./views/DashboardAnalytics.vue"),
          meta: {
            requiresAuth: true
            // rule: "admin"
          }
        },
        {
          path: "/dashboard/ecommerce",
          name: "dashboard-ecommerce",
          component: () => import("./views/DashboardECommerce.vue"),
          meta: {
            requiresAuth: true
            // rule: "admin"
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: "/pages/login",
          name: "page-login",
          component: () => import("@/views/pages/Login.vue")
        },
        {
          path: "/pages/register",
          name: "page-register",
          component: () => import("@/views/pages/register/Register.vue")
        },
        {
          path: "/pages/error-404",
          name: "page-error-404",
          component: () => import("@/views/pages/Error404.vue")
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/pages/error-404"
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.auth.isUserLoggedIn();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isLoggedIn) next({ name: "page-login" });
  else if (!requiresAuth && isLoggedIn) next({ name: "home" });
  else next();
});
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
