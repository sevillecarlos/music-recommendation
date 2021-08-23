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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("@$token");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token) {
      console.log(to.name);
      next();
    } else {
      next("/");
    }
  } else {
    if (token) {
      next("/home");
    } else {
      next();
    }
  }
});
export default router;
