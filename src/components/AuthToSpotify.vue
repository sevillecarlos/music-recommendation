<template>
  <b-modal
    no-close-on-backdrop
    no-close-on-esc
    centered
    hide-header
    hide-footer
    id="modal-1"
    modal-class="modal"
    content-class="content-modal-auth-spotify"
    v-model="modalShow"
  >
    <Overlay :showOverlay="showOverlay">
      <b-card class="card-auth">
        <template #header>
          <h5 class="title-modal-header">
            Log to Spotify {{ modalShow }}
            <img
              class="logo-model"
              src="../assets/cover-image.png"
              alt="logo"
            />
          </h5>
        </template>
        <b-button
          class="login-spotify-btn"
          pill
          variant="outline-success"
          :href="urlRedirect"
        >
        </b-button>
        <div class="w-100">
          <b-button
            @click="returnToLogin"
            pill
            size="md"
            class="float-right return-btn"
            variant="outline-secondary"
          >
            Sign Out
          </b-button>
        </div>
      </b-card>
    </Overlay>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import Overlay from "../ui/Overlay.vue";
import { hashParams } from "../helpers/hash-params";

export default {
  name: "AuthToSpotify",
  components: {
    Overlay,
  },
  data() {
    return {
      showOverlay: false,
      urlRedirect: `http://localhost:8888/login-spotify`,
      modalShow: true,
    };
  },
  methods: {
    ...mapActions({
      signOut: "signOut",
    }),

    async returnToLogin() {
      this.showOverlay = true;
      await this.signOut();
      setTimeout(() => {
        this.$router.push("/");
      }, 3000);
    },

    getAccessToken() {
      const { access_token } = hashParams();
      if (access_token) {
        this.modalShow = false;
        this.$store.commit("setAccessToken", access_token);
      }
    },
  },
  created() {
    this.getAccessToken();
  },
};
</script>

<style>
.login-spotify-btn {
  margin: auto;
  width: 50%;
  margin-left: 25%;
  content: url("../assets/spotify-logo.png");
  box-shadow: 0 0 7px #fff, 0 0 5px rgb(157, 255, 0);
}
.modal {
  background-color: rgba(55, 66, 43, 0.24);
}
.card-auth {
  background-color: transparent !important;
  border: 1px solid green !important;
  border-radius: 50px !important;
  box-shadow: 0 0 7px #fff, 0 0 5px rgb(157, 255, 0);
}
.logo-model {
  width: 50px;
}

.modal-body {
  padding: 9px 15px;
  background-color: transparent !important;
  border: none;
  border-radius: 50px !important;
}

.modal-footer {
  padding: 9px 15px;
  background-color: #292b2c;
}
.title-modal-header {
  font-size: 150%;
  color: #fff;
  text-shadow: 0 0 7px rgb(5, 34, 12), 0 0 10px rgb(228, 255, 184);
  text-align: center;
}

.return-btn {
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
  color: rgba(0, 255, 21) !important;
  font-size: 20px !important;
  letter-spacing: 2px;
  background-color: rgb(18, 20, 15) !important;
  font-family: "Quicksand", sans-serif;
  transition: color background-color 0.3s !important;
}
.content-modal-auth-spotify {
  background: transparent !important;
  border: none !important;
  border-radius: 50px !important;
}
</style>
