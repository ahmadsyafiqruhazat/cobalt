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
          path: "/page2",
          name: "page-2",
          component: () => import("./views/Page2.vue"),
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
