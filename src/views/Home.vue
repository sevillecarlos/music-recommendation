<template>
  <Overlay :showOverlay="overLayHome">
    <div class="home">
      <b-container fluid>
        <button class="get-tracks-btn" @click="shuffleBtn">
          Shuffle!
          <b-icon
            class="btn-get-icon"
            :icon="shuffleIcons"
            font-scale="1"
          ></b-icon>
        </button>

        <Tabs nav-class="item-tab" pills class="tabs-control-table">
          <b-tab
            title="Recommendate Tracks"
            active
            title-link-class="title-tab"
          >
            <template #title>
              <b-icon icon="music-note-list" font-scale="1"></b-icon>
              Recommendate Tracks
            </template>
            <Overlay :showOverlay="showOverlayRecommendTable">
              <b-table-simple
                responsive
                class="table-recommendate borderless"
                v-show="recommenedTracks.length !== 0"
              >
                <b-thead>
                  <b-tr>
                    <b-th>Save</b-th>
                    <b-th>Track</b-th>
                    <b-th>Name</b-th>
                    <b-th>Artist/Artists</b-th>
                    <b-th>Album</b-th>
                    <b-th></b-th>
                  </b-tr>
                </b-thead>
                <b-tbody v-for="tracks in recommenedTracks" :key="tracks.id">
                  <b-tr>
                    <b-th>
                      <b-icon
                        class="like-icon"
                        @click="
                          likeSongs.indexOf(tracks.id) !== -1
                            ? removeLikeTrack(tracks)
                            : likeTrack(tracks)
                        "
                        :icon="
                          likeSongs.indexOf(tracks.id) !== -1
                            ? 'lightning-fill'
                            : 'lightning'
                        "
                        :id="tracks.id"
                        font-scale="2"
                      ></b-icon>
                    </b-th>
                    <b-th>
                      <VueAPlayer
                        class="vue-aplyer"
                        theme="rgb(0, 255, 21)"
                        :mini="true"
                        :music="{
                          src: tracks.demoUrl,
                          pic: tracks.albumCover,
                        }"
                      />
                    </b-th>
                    <b-td>{{ tracks.track }}</b-td>
                    <b-td>{{ tracks.artists }}</b-td>

                    <b-td>{{ tracks.album }}</b-td>
                    <b-td></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </Overlay>
          </b-tab>

          <b-tab title-link-class="title-tab">
            <template #title title-link-class="title-tab">
              <b-icon icon="lightning" animation="fade" font-scale="1"></b-icon>
              <strong>Likes Tracks</strong>
            </template>
            <b-table-simple
              v-show="showSaveTable"
              responsive
              class="table-recommendate borderless"
            >
              <b-thead>
                <b-tr>
                  <b-th>Album Cover</b-th>
                  <b-th>Name</b-th>
                  <b-th>Artist/Artists</b-th>
                  <b-th>Album</b-th>
                  <b-th></b-th>
                </b-tr>
              </b-thead>
              <b-tbody v-for="tracks in savesTrack" :key="tracks.id">
                <b-tr>
                  <b-td
                    ><img
                      class="album-cover-img"
                      :src="tracks.albumCover"
                      alt="Album Cover"
                  /></b-td>
                  <b-td>{{ tracks.track }}</b-td>
                  <b-td>{{ tracks.artists }}</b-td>
                  <b-td>{{ tracks.album }}</b-td>
                  <b-td
                    ><a :href="tracks.linkTrack" target="_blank">
                      <img
                        class="spotify-logo"
                        src="../assets/listen-on-spotify.png"
                        alt="spotify-logo"
                      /> </a
                  ></b-td>
                </b-tr>
              </b-tbody> </b-table-simple
          ></b-tab>
        </Tabs>
        <AuthoToSpotify />
      </b-container>
    </div>
  </Overlay>
</template>

<script>
import { randomNumberMinOne } from "../helpers/random-number-one";

import { mapState, mapActions } from "vuex";
import Tabs from "../ui/Tabs.vue";
import Overlay from "../ui/Overlay.vue";
import VueAPlayer from "vue-aplayer";
import AuthoToSpotify from "../components/AuthToSpotify.vue";

export default {
  name: "Home",
  components: {
    Overlay,
    Tabs,
    AuthoToSpotify,
    VueAPlayer,
  },
  mounted() {
    this.exe();
  },
  data() {
    return {
      recommenedTracks: [],
      like: false,
      likeSongs: [],
      likeSongsLength: 0,
      savedTrack: [],
      showSaveTable: false,
      savesTrack: [],
      shuffleIcons: "dice-1-fill",
      showOverlayRecommendTable: false,
      showOverlayCard: false,
    };
  },
  computed: {
    ...mapState({
      userEmail: "userEmail",
      overLayHome: "overLayHome",
      accessToken: "accessToken",
      token: "token",
    }),
  },

  watch: {
    likeSongsLength() {
      this.getSavedTracks();
    },
  },

  methods: {
    ...mapActions({
      getToken: "getToken",
      signOut: "signOut",
    }),

    shuffleBtn() {
      this.shuffleIcons = `dice-${randomNumberMinOne(6)}-fill`;
      this.showOverlayRecommendTable = true;
      this.getRecommendateTracks();
    },

    exe() {
      this.getToken();
      if (this.accessToken) {
        this.getRecommendateTracks();
      }
    },

    async getRecommendateTracks() {
      console.log("RecommendateTracks");
      const res = await fetch(`http://localhost:8888/recommendation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken: this.accessToken }),
      });

      this.recommenedTracks = await res.json();
      this.showOverlayRecommendTable = false;
    },

    async getSavedTracks() {
      // fetch(`${process.env.VUE_APP_URL}/save-tracks`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email: this.userEmail }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     const { tracks } = data.data;
      //     if (tracks) {
      //       this.savesTrack = [...tracks].reverse();
      //       this.showSaveTable = true;
      //     }
      //   });
    },

    async fillIdSongs() {
      // fetch(`${process.env.VUE_APP_URL}/save-tracks`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email: this.userEmail }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     const { tracks } = data.data;
      //     if (tracks) {
      //       tracks.map((track) => this.likeSongs.push(track.id));
      //     }
      //   });
    },

    async likeTrack() {
      // this.savedTrack = [];
      // this.savedTrack.push({
      //   albumCover: track.albumCover,
      //   album: track.album,
      //   track: track.track,
      //   artists: track.artists,
      //   linkTrack: track.linkTrack,
      //   id: track.id,
      // });
      // await fetch(`${process.env.VUE_APP_URL}/save-track`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: this.userEmail,
      //     tracks: this.savedTrack,
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     const { tracks } = data.data;
      //     this.likeSongs.push(tracks.id);
      //     this.likeSongsLength = this.likeSongs.length;
      //   });
    },

    async removeLikeTrack() {
      //   await fetch(`${process.env.VUE_APP_URL}/remove-save-track`, {
      //     method: "DELETE",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       email: this.userEmail,
      //       trackId: track.id,
      //     }),
      //   })
      //     .then((res) => res.json())
      //     .then((data) => {
      //       const { trackId } = data.data;
      //       const removeTrackIndex = this.savesTrack.findIndex(
      //         (track) => track.id === trackId
      //       );
      //       this.savesTrack.splice(removeTrackIndex, 1);
      //       this.likeSongs.splice(this.likeSongs.indexOf(track.id), 1);
      //       this.likeSongsLength = this.likeSongs.length;
      //     });
      // },
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap");
.table-recommendate {
  width: 70%;
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
  border-radius: 10px;
  border: none;
  font-size: 20px;
  height: 65vh;
}
.borderless td,
.borderless th {
  border: none;
}

@media only screen and (max-width: 1032px) {
  .table-recommendate {
    font-size: 15px;
    height: 70vh;
    box-shadow: 0 0 7px #fff, 0 0 13px rgb(157, 255, 0);
  }
  th {
    font-size: 20px;
  }
  tr {
    font-size: 20px;
  }
}
/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
  .table-recommendate {
    font-size: 15px;
    height: 70vh;
    box-shadow: 0 0 7px #fff, 0 0 13px rgb(157, 255, 0);
  }
  th {
    font-size: 10px;
  }
  tr {
    font-size: 10px;
  }
}
/*Medium Phome*/
@media only screen and (max-width: 568px) {
  .table-recommendate {
    font-size: 15px;
    height: 70vh;
    box-shadow: 0 0 7px #fff, 0 0 13px rgb(157, 255, 0);
  }
  th {
    font-size: 10px;
  }
  tr {
    font-size: 10px;
  }
}

/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .table-recommendate {
    font-size: 15px;
    height: 70vh;
    box-shadow: 0 0 7px #fff, 0 0 13px rgb(157, 255, 0);
  }
  th {
    font-size: 10px;
  }
  tr {
    font-size: 10px;
  }
}

.listen-spotify-btn {
  width: 100px;
}
.album-cover-img {
  width: 100px;
}
.like-icon {
  text-align: center;
  color: rgb(0, 255, 21);
  width: 50px;
  transition: width 0.2s;
}

.tabs-table {
    margin: auto;

  width: 100%;
  height: 75vh;
}

th {
  color: rgb(62, 228, 29);
  text-shadow: 0 0 7px rgb(10, 9, 9), 0 0 15px rgb(157, 255, 0);
  font-size: 20px;
  letter-spacing: 3px;
}
tr {
  color: #fff;
  text-shadow: 0 0 7px rgb(5, 34, 12), 0 0 10px rgb(228, 255, 184);
  font-family: "Quicksand", sans-serif;
  font-size: 25px;
  border: none;
}
thead {
  background-color: rgba(41, 46, 33, 0.582);
  border-radius: 30px;
}

.title-tab {
  font-family: "Quicksand", sans-serif;
  font-size: 20px;
  letter-spacing: 3px;
  color: rgb(0, 255, 21) !important;
  text-shadow: 0 0 1px rgb(0, 0, 0), 0 0 3px;
  border-radius: 16px !important;
}
.active-class {
  font-family: "Quicksand", sans-serif;
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
  border-radius: 16px !important;
  background-color: rgb(0, 255, 21) !important;
  color: rgb(0, 0, 0) !important;
}

.small-spiner {
  color: #d4d700;
}
.big-spiner {
  color: #dddf00;
}
.item-tab {
  border-radius: 20px;
  box-shadow: 0 0 7px #fff, 0 0 10px rgba(157, 255, 0, 0.719);
}

.get-tracks-btn {
  width: 20%;
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
  color: rgb(0, 255, 21);
  font-size: 200%;
  margin-left: 40%;
  letter-spacing: 2px;
  background-color: rgb(18, 20, 15);
  border-radius: 100px;
  font-family: "Quicksand", sans-serif;
  margin-top: 2%;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgb(0, 255, 21);
  border-radius: 10px;
  box-shadow: 0 0 5px #fff, 0 0 5px rgb(157, 255, 0);
}

.overlay-card {
  margin-left: 15%;
  margin-top: 1%;
  width: 70%;
}
.tabs-control-table {
  width: 90%;
  border: white 5px solid;
}

.spotify-logo {
  width: auto;
}

/* Small tablets to big tablets: from 768 to 1032*/
@media only screen and (max-width: 1032px) {
  .table-recommendate {
    font-size: 15px;
    height: 70vh;
    box-shadow: 0 0 7px #fff, 0 0 13px rgb(157, 255, 0);
  }
  th {
    font-size: 20px;
  }
  tr {
    font-size: 20px;
  }
  .overlay-card {
    margin-left: 0%;
    margin-top: 2%;
    width: 100%;
  }
  .tabs-control-table {
    width: 100%;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .title-tab {
    font-size: 15px;
    letter-spacing: 1px;
  }
  .get-tracks-btn {
    width: 50%;
    font-size: 100%;
    letter-spacing: 2px;
    margin-top: 2%;
    margin-left: 25%;
  }
  .album-cover-img {
    width: 100%;
  }
  .spotify-logo {
    width: 150px;
  }
}
/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
  .table-recommendate {
    font-size: 15px;
    height: 70vh;
    box-shadow: 0 0 7px #fff, 0 0 13px rgb(157, 255, 0);
  }
  th {
    font-size: 10px;
  }
  tr {
    font-size: 10px;
  }
  .overlay-card {
    margin-left: 0%;
    margin-top: 2%;
    width: 100%;
  }
  .tabs-control-table {
    width: 100%;
    padding: 10px;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  .title-tab {
    font-size: 10px;
    letter-spacing: 1px;
  }
  .get-tracks-btn {
    width: 70%;
    font-size: 100%;
    letter-spacing: 2px;
    margin-top: 2%;
    margin-left: 15%;
  }
  .album-cover-img {
    width: 100%;
  }
  .spotify-logo {
    width: 100px;
  }
  .return-btn {
    font-size: 100% !important;
    margin-top: 25px;
  }
  .title-modal-header {
    font-size: 120%;
  }
  .logo-model {
    width: 30px;
  }
}
/*Medium Phome*/
@media only screen and (max-width: 568px) {
  .table-recommendate {
    font-size: 15px;
    height: 70vh;
    box-shadow: 0 0 7px #fff, 0 0 13px rgb(157, 255, 0);
  }
  th {
    font-size: 10px;
  }
  tr {
    font-size: 10px;
  }
  .overlay-card {
    margin-left: 0%;
    margin-top: 2%;
    width: 100%;
  }
  .tabs-control-table {
    width: 100%;
    padding: 10px;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  .title-tab {
    font-size: 10px;
    letter-spacing: 1px;
  }
  .get-tracks-btn {
    width: 70%;
    font-size: 100%;
    letter-spacing: 2px;
    margin-top: 2%;
    margin-left: 15%;
  }
  .album-cover-img {
    width: 100%;
  }
  .spotify-logo {
    width: 100px;
  }
  .return-btn {
    font-size: 100% !important;
    margin-top: 25px;
  }
  .title-modal-header {
    font-size: 120%;
  }
  .logo-model {
    width: 30px;
  }
}

/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .table-recommendate {
    font-size: 15px;
    height: 70vh;
    box-shadow: 0 0 7px #fff, 0 0 13px rgb(157, 255, 0);
  }
  th {
    font-size: 10px;
  }
  tr {
    font-size: 10px;
  }
  .overlay-card {
    margin-left: 0%;
    margin-top: 2%;
    width: 100%;
  }
  .tabs-control-table {
    width: 100%;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  .title-tab {
    font-size: 10px;
    letter-spacing: 1px;
  }
  .get-tracks-btn {
    width: 70%;
    font-size: 100%;
    letter-spacing: 2px;
    margin-top: 2%;
    margin-left: 15%;
  }
  .album-cover-img {
    width: 100%;
  }
  .spotify-logo {
    width: 100px;
  }
  .return-btn {
    font-size: 100% !important;
    margin-top: 25px;
  }
  .title-modal-header {
    font-size: 120%;
  }
  .logo-model {
    width: 30px;
  }
}
@media (hover: hover) and (pointer: fine) {
  .return-btn:hover {
    box-shadow: 0 0 7px #fff, 0 0 30px rgb(157, 255, 0);
    background-color: transparent !important;
  }
  .login-spotify-btn:hover {
    box-shadow: 0 0 7px #fff, 0 0 30px rgb(157, 255, 0);
    background-color: transparent !important;
  }
  .active-class:hover {
    background-color: rgba(0, 0, 0, 0.432) !important;
    color: rgb(0, 255, 21) !important;
  }
  .get-tracks-btn:hover {
    color: rgb(18, 20, 15);
    background-color: rgb(0, 255, 21);
  }

  .spotify-logo:hover {
    content: url("../assets/listen-on-spotify-whitey.png");
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(10, 179, 24);
  }
}
</style>
