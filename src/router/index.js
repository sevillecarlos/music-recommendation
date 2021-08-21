import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// router.beforeEach((to, from, next) => {
//   // const accessToken = localStorage.getItem("access-token");

//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     console.log(store.state.token);

//     if (!store.state.token) {
//       next({
//         path: "/",
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });
export default router;
