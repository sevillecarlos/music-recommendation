import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    error: "",
    errorRegister: "",
    successMsg: "",
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
  },
  actions: {
    async signIn({ commit }, user) {
      try {
        const res = await fetch(`http://localhost:3000/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const valideUser = await res.json();
        if (valideUser.error) {
          console.log(valideUser.error);
          commit("setError", valideUser.error);
          return;
        }
        commit("setToken", valideUser.data.jwtToken);
        localStorage.setItem("auth-token", valideUser.data.jwtToken);
      } catch (error) {
        console.log(error);
      }
    },
    async signUp({ commit }, user) {
      try {
        const res = await fetch(`http://localhost:3000/signup`, {
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
        } else {
          commit("setSuccessMsg", valideUser.data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    },
    getToken({ commit }) {
      const token = localStorage.getItem("auth-token");
      if (token) {
        commit("setToken", token);
      } else {
        commit("setToken", "");
      }
    },
    signOut({ commit }) {
      commit("setToken", "");
      localStorage.removeItem("auth-token");
    },
  },
  modules: {},
});
