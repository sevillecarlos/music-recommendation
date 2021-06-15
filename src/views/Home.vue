<template>
  <div class="home">
    <b-modal
      no-close-on-backdrop
      centered="true"
      id="modal-1"
      v-model="modalShow"
    >
      <template #modal-header>
        <h5>Authenticate to Spotify</h5>
        <img class="logo-model" src="../assets/logo.png" alt="logo" />
      </template>
      <b-overlay :show="showOverlay" rounded="sm">
        <template #overlay>
          <div class="d-flex align-items-center">
            <b-spinner small type="grow" variant="secondary"></b-spinner>
            <b-spinner type="grow" variant="dark"></b-spinner>
            <b-spinner small type="grow" variant="secondary"></b-spinner>
          </div>
        </template>
        <b-card>
          <b-button class="login-spotify-btn" pill variant="outline-success">
            <img
              class="spotify-logo"
              src="../assets/spotify-logo.png"
              alt="spotify-logo"
          /></b-button>
        </b-card>
      </b-overlay>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            @click="returnToLogin"
            pill
            variant="primary"
            size="md"
            class="float-right"
          >
            Return
          </b-button>
        </div>
      </template>
    </b-modal>

    <!-- <b-table :items="items"></b-table> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
      modalShow: true,
      showOverlay: false,
    };
  },
  methods: {
    returnToLogin() {
      this.showOverlay = true;
      setTimeout(() => {
        this.$router.push("/");
      }, 3000);
    },
  },
};
</script>
<style>
.spotify-logo {
  width: 150px;
}
.login-spotify-btn {
  margin: auto;
  width: 50%;
  margin-left: 25%;
}
.logo-model {
  width: 50px;
}
</style>
