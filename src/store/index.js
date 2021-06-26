import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    error: "",
    errorRegister: "",
    successMsg: "",
    showLogOut: false,
    userName: "",
    userEmail: "",
    overLayHome: false,
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
    setOverLayHome(state, payload) {
      state.overLayHome = payload;
    },
  },
  actions: {
    async signIn({ commit }, user) {
      try {
        const res = await fetch(`${process.env.URL}/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const valideUser = await res.json();

        console.log(valideUser);
        if (valideUser.error) {
          console.log(valideUser.error);
          commit("setError", valideUser.error);
          return;
        }
        commit("setToken", valideUser.data.jwtToken);
        localStorage.setItem("auth-token", valideUser.data.jwtToken);
        localStorage.setItem("ref-log", valideUser.data.userID);
      } catch (error) {
        console.log(error);
      }
    },
    async signUp({ commit }, user) {
      try {
        const res = await fetch(`${process.env.URL}/signup`, {
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
        console.log(error + 78484);
      }
    },
    getToken({ commit }) {
      const token = localStorage.getItem("auth-token");
      console.log(this.state.userEmail);
      if (token) {
        commit("setToken", token);
        commit("setLogOutShow", true);
      } else {
        commit("setToken", "");
      }
    },
    async getLog({ commit }) {
      const idLog = localStorage.getItem("ref-log");
      console.log(idLog);
      try {
        const res = await fetch(`${process.env.URL}/get-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: idLog,
          }),
        });
        const user = await res.json();
        commit("setUserName", user.name);
        commit("setUserEmail", user.email);
      } catch (err) {
        console.log(err);
      }
    },
    signOut({ commit }) {
      commit("setToken", "");
      commit("setOverLayHome", true);
      localStorage.removeItem("auth-token");
      localStorage.removeItem("ref-log");
      localStorage.removeItem("access-token");
    },
  },
  modules: {},
});
