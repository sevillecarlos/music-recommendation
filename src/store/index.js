import Vue from "vue";
import Vuex from "vuex";
import { jwtDecoded } from "../helpers/jwtDecoded";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    error: "",
    errorRegister: "",
    successMsg: "",
    showLogOut: false,
    userName: "",
    userEmail: "",
    userId: "",
    overLayHome: false,
    accessToken: null,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setErrorRegister(state, payload) {
      state.errorRegister = payload;
    },
    setSuccessMsg(state, payload) {
      state.successMsg = payload;
    },
    setLogOutShow(state, payload) {
      state.showLogOut = payload;
    },
    setUserName(state, payload) {
      state.userName = payload;
    },
    setUserEmail(state, payload) {
      state.userEmail = payload;
    },
    setUserId(state, payload) {
      state.userId = payload;
    },
    setOverLayHome(state, payload) {
      state.overLayHome = payload;
    },
    setAccessToken(state, payload) {
      state.accessToken = payload;
    },
  },

  actions: {
    async signIn({ commit }, user) {
      try {
        const res = await fetch(`${process.env.VUE_APP_URL}/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const valideUser = await res.json();

        if (valideUser.error) {
          commit("setError", valideUser.error);
          return;
        }
        commit("setToken", valideUser.data.jwtToken);
        localStorage.setItem("@$token", valideUser.data.jwtToken);
      } catch (error) {
        console.log(error);
      }
    },
    async signUp({ commit }, user) {
      try {
        const res = await fetch(`${process.env.VUE_APP_URL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const valideUser = await res.json();

        if (valideUser.error) {
          commit("setErrorRegister", valideUser.error);
          return;
        }
        commit("setToken", valideUser.data.jwtToken);
        localStorage.setItem("@$token", valideUser.data.jwtToken);
      } catch (error) {
        console.log(error);
      }
    },
    getToken({ commit }) {
      const token = localStorage.getItem("@$token");
      if (token) {
        commit("setToken", token);
        commit("setLogOutShow", true);
        const { userName, email, id } = jwtDecoded(token);
        commit("setUserName", userName);
        commit("setUserEmail", email);
        commit("setUserId", id);
      } else {
        commit("setToken", "");
      }
    },

    signOut({ commit }) {
      commit("setToken", null);
      commit("setAccessToken", null);
      commit("setOverLayHome", false);
      
      localStorage.removeItem("@$token");
      localStorage.removeItem("_@ccess");
    },
  },
  modules: {},
});
