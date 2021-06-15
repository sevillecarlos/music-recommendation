import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
//import store from "../store/index";
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
  const authenticatedUser = null;
  const requiresAuth = to;

  console.log(authenticatedUser)
  console.log(requiresAuth)
  console.log(from)
  console.log(next)
  next();
});

export default router;
