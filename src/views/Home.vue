<template>
  <Overlay :showOverlay="overLayHome">
    <div class="home">
      <b-container fluid>
        <div class="shuffle-btn-container">
          <button
            :disabled="showOverlayRecommendTable"
            class="shuffle-btn"
            @click="shuffleBtn"
          >
            Shuffle!
            <b-icon
              class="btn-get-icon"
              :icon="shuffleIcons"
              font-scale="1"
            ></b-icon>
          </button>
        </div>
        <div class="content-table">
          <Overlay
            :showOverlay="recommenedTracks.length === 0 && accessToken !== null"
          >
            <Tabs nav-class="item-tab" pills class="tabs-control-table">
              <b-tab
                title="Recommendate Tracks"
                active
                title-link-class="title-tab"
                class="tab-recommendate-table"
              >
                <template #title>
                  <b-icon icon="music-note-list" font-scale="1"></b-icon>
                  Tracks
                </template>
                <h2 v-if="emptyTracksMsg" class="empty-save-track">
                  {{ emptyTracksMsg }}
                </h2>
                <Overlay v-else :showOverlay="showOverlayRecommendTable">
                  <b-table-simple
                    responsive
                    class="table-recommendate borderless"
                    v-show="recommenedTracks.length !== 0"
                  >
                    <b-thead>
                      <b-tr>
                        <b-th>Save</b-th>
                        <b-th>Demo</b-th>
                        <b-th>Name</b-th>
                        <b-th>Artist/Artists</b-th>
                        <b-th>Album</b-th>
                        <b-th></b-th>
                      </b-tr>
                    </b-thead>
                    <b-tbody
                      v-for="tracks in recommenedTracks"
                      :key="tracks.id"
                    >
                      <b-tr>
                        <b-th class="save-icon-th">
                          <b-icon
                            class="like-icon"
                            @click="toggleSaveTrack(tracks.id)"
                            :animation="
                              loadingTrackSave(tracks.id) ||
                              loadingTrackRemove(tracks.id)
                                ? 'throb'
                                : ''
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
                          <div class="vue-aplyer">
                            <VueAPlayer
                              theme="rgb(0, 255, 21)"
                              :mini="true"
                              :music="{
                                src: tracks.demoUrl,
                                pic: tracks.albumCover,
                              }"
                            />
                          </div>
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
                  <b-icon
                    icon="lightning"
                    animation="fade"
                    font-scale="1"
                  ></b-icon>
                  <strong>Likes Tracks</strong>
                </template>
                <b-table-simple
                  v-if="savedTracks.length !== 0"
                  responsive
                  class="table-recommendate borderless"
                >
                  <b-thead>
                    <b-tr>
                      <b-th>Cover</b-th>
                      <b-th>Name</b-th>
                      <b-th>Artist/Artists</b-th>
                      <b-th>Album</b-th>
                      <b-th></b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody
                    v-for="tracks in reverseSavedTrackList"
                    :key="tracks.id"
                  >
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
                        ><a :href="tracks.url" target="_blank">
                          <img
                            class="spotify-logo"
                            src="../assets/listen-on-spotify.png"
                            alt="spotify-logo"
                          /> </a
                      ></b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
                <div class="empty-save-track" v-else>
                  <h2>You don't have any save track</h2>
                </div>
              </b-tab>
            </Tabs>
          </Overlay>
        </div>
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
import { hashParams } from "../helpers/hash-params";
export default {
  name: "Home",
  components: {
    Overlay,
    Tabs,
    AuthoToSpotify,
    VueAPlayer,
  },
  created() {
    this.getToken();
    this.getAccessToken();
  },
  data() {
    return {
      recommenedTracks: [],
      likeSongs: [],
      savedTracks: [],
      shuffleIcons: "dice-1-fill",
      showOverlayRecommendTable: false,
      showOverlayCard: false,
      reverseSavedTrackList: [],
      emptyTracksMsg: "",
    };
  },
  computed: {
    ...mapState({
      userId: "userId",
      overLayHome: "overLayHome",
      accessToken: "accessToken",
      token: "token",
    }),
  },

  watch: {
    accessToken() {
      if (this.accessToken) this.getRecommendateTracks();
    },
    token() {
      if (this.token) this.getSavedTracks();
    },
    savedTracks() {
      if (this.savedTracks) {
        this.likeSongs = [...this.savedTracks.map((v) => v.id)];
        this.reverseSavedTrackList = [...this.savedTracks.slice()].reverse();
      }
    },
  },

  methods: {
    ...mapActions({
      getToken: "getToken",
      signOut: "signOut",
    }),
    toggleSaveTrack(trackId) {
      if (!this.loadingTrackSave(trackId)) {
        if (this.likeSongs.indexOf(trackId) !== -1) {
          this.removeSaveTrack(trackId);
        } else {
          this.saveTrack(trackId);
        }
      }
    },
    loadingTrackSave(trackId) {
      return (
        this.likeSongs.includes(trackId) &&
        !this.savedTracks.some((v) => v.id === trackId)
      );
    },
    loadingTrackRemove(trackId) {
      return (
        !this.likeSongs.includes(trackId) &&
        this.savedTracks.some((v) => v.id === trackId)
      );
    },
    shuffleBtn() {
      this.shuffleIcons = `dice-${randomNumberMinOne(6)}-fill`;
      this.showOverlayRecommendTable = true;
      this.getRecommendateTracks();
    },
    getAccessToken() {
      const { access_token } = hashParams();
      if (access_token) {
        localStorage.setItem("_@ccess", access_token);
        // this.$router.push("/home");
      }
    },
    async getRecommendateTracks() {
      const res = await fetch(`${process.env.VUE_APP_URL}/recommendation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken: this.accessToken }),
      });

      const data = await res.json();
      if (data.empty_tracks) {
        this.emptyTracksMsg = data.empty_tracks;
      }
      if (data.refreshToken) {
        localStorage.removeItem("_@ccess");
        this.$store.commit("setAccessToken", null);
        this.recommenedTracks = [];
        return;
      }
      this.recommenedTracks = data;
      this.showOverlayRecommendTable = false;
    },

    async getSavedTracks() {
      const res = await fetch(`${process.env.VUE_APP_URL}/saved-tracks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: this.userId }),
      });
      const {
        data: { tracks },
      } = await res.json();
      this.savedTracks = tracks;
    },

    async saveTrack(idTrack) {
      const [saveTrack] = this.recommenedTracks.filter((v) => v.id === idTrack);
      this.likeSongs.push(idTrack);
      const res = await fetch(`${process.env.VUE_APP_URL}/save-track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: this.userId,
          track: saveTrack,
        }),
      });
      const {
        data: { added },
      } = await res.json();
      if (added) this.savedTracks.push(saveTrack);
    },

    async removeSaveTrack(trackId) {
      const trackIndex = this.likeSongs.indexOf(trackId);
      this.likeSongs.splice(trackIndex, 1);

      const res = await fetch(`${process.env.VUE_APP_URL}/remove-save-track`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: this.userId,
          trackId: trackId,
        }),
      });

      const {
        data: { removedTrackId },
      } = await res.json();

      if (removedTrackId !== -1) this.savedTracks.splice(removedTrackId, 1);
    },
  },
};
</script>
<style>
.table-recommendate {
  box-shadow: 0 0 10px #fff, 0 0 20px rgb(157, 255, 0);
  border-radius: 15px;
  border: none;
  height: 31vw;
}
.empty-tracks-msg {
  color: rgb(0, 255, 21);
  margin-top: 10%;
  text-align: center;
}
.borderless td,
.borderless th {
  border: none;
}
.save-icon-th {
  text-align: center;
}
.content-table {
  width: 70vw;
  margin: auto;
}
.album-cover-img {
  width: 5vw;
}
.spotify-logo {
  width: 8vw !important;
  border-radius: 50px !important;
  box-shadow: 0 0 7px #fff, 0 0 10px rgba(157, 255, 0, 0.699);
}

.like-icon {
  width: 2.2vw;
}

.tabs-table {
  height: 75vh;
}
.empty-save-track {
  text-align: center;
  font-size: 2vw !important;
  color: #fff;
  margin-top: 10%;
  text-shadow: 0 0 7px #fff, 0 0 1px rgb(157, 255, 0);
}

th {
  color: rgb(62, 228, 29);
  text-shadow: 0 0 7px rgb(10, 9, 9), 0 0 15px rgb(157, 255, 0);
  font-size: 1.3vw;
  letter-spacing: 1px;
}
tr {
  color: #fff;
  text-shadow: 0 0 7px rgb(5, 34, 12), 0 0 10px rgb(228, 255, 184);
  font-size: 1.2vw;
  border: none;
  margin-bottom: 50vw !important;
}
thead {
  background-color: rgba(41, 46, 33, 0.582);
  border-radius: 30px;
}

.title-tab {
  font-size: 1vw;
  letter-spacing: 3px;
  color: rgb(0, 255, 21) !important;
  border-radius: 15px !important;
  font-weight: bold !important;
}
.active-class {
  box-shadow: 0 0 7px #fff, 0 0 10px rgba(157, 255, 0, 0.699);
  border-radius: 15px !important;
  background-color: black !important;
  color: rgb(0, 255, 21) !important;
}

.small-spiner {
  color: #d4d700;
}
.big-spiner {
  color: #dddf00;
}

.shuffle-btn-container {
  text-align: center !important;
  padding: 1%;
}
.shuffle-btn {
  width: 20%;
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
  color: rgb(0, 255, 21);
  font-size: 1.8vw !important;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  letter-spacing: 2px;
  background-color: rgb(18, 20, 15);
  border: none !important;
  border-radius: 100px;
  margin-top: 1%;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.062);
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
  width: 100%;
  padding: 15px;
}

.spotify-logo {
  width: auto;
  border-radius: 20px;
  border: none;
}
/*************************************************************************/
@media only screen and (max-width: 1035px) {
  .table-recommendate {
    width: 100%;
    height: 70vw;
    box-shadow: 0 0 10px #fff, 0 0 10px rgb(157, 255, 0);
  }
  .content-table {
    width: 100%;
  }
  .album-cover-img {
    width: 12vw;
  }
  .tabs-table {
    height: 75vh;
  }
  .spotify-logo {
    width: 15vw !important;
    border-radius: 20px;
    border: none;
  }
  .empty-save-track {
    text-align: center;
    font-size: 50px;
    color: #fff;
    margin-top: 10%;
    text-shadow: 0 0 7px #fff, 0 0 1px rgb(157, 255, 0);
  }
  .save-icon-th {
    text-align: center;
  }
  th {
    font-size: 3vw;
  }
  tr {
    font-size: 3vw;
  }
  .title-tab {
    font-size: 3vw;
  }
  .shuffle-btn {
    width: 30%;
    font-size: 3vw !important;
    padding: 2%;
  }
  .shuffle-btn-container {
    padding: 1px;
    margin-bottom: 3%;
  }
  .tabs-control-table {
    width: 100%;
    padding: 1%;
  }
  .like-icon {
    text-align: center;
    color: rgb(0, 255, 21);
    width: 8vw;
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-corner {
    width: 5px;
    background: rgba(0, 0, 0, 0) !important;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(0, 255, 21);
    border-radius: 10px;
    box-shadow: 0 0 5px #fff, 0 0 5px rgb(157, 255, 0);
  }
}
/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
    .table-recommendate {
    width: 100%;
    height: 100vw;
    box-shadow: 0 0 10px #fff, 0 0 10px rgb(157, 255, 0);
  }
  .content-table {
    width: 100%;
  }
  .album-cover-img {
    width: 12vw;
  }
  .tabs-table {
    height: 75vh;
  }
  .spotify-logo {
    width: 15vw !important;
    border-radius: 20px;
    border: none;
  }
  .empty-save-track {
    text-align: center;
    font-size: 50px;
    color: #fff;
    margin-top: 10%;
    text-shadow: 0 0 7px #fff, 0 0 1px rgb(157, 255, 0);
  }
  .save-icon-th {
    text-align: center;
  }
  th {
    font-size: 3vw;
  }
  tr {
    font-size: 3vw;
  }
  .title-tab {
    font-size: 3vw;
  }
  .shuffle-btn {
    width: 50%;
    font-size: 4vw !important;
    padding: 2%;
  }
  .shuffle-btn-container {
    padding: 1px;
    margin-bottom: 8%;
  }
  .tabs-control-table {
    width: 100%;
    padding: 1%;
  }
  .like-icon {
    text-align: center;
    color: rgb(0, 255, 21);
    width: 8vw;
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-corner {
    width: 5px;
    background: rgba(0, 0, 0, 0) !important;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(0, 255, 21);
    border-radius: 10px;
    box-shadow: 0 0 5px #fff, 0 0 5px rgb(157, 255, 0);
  }
}
/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .table-recommendate {
    width: 100%;
    height: 100vw;
    box-shadow: 0 0 10px #fff, 0 0 10px rgb(157, 255, 0);
  }
  .content-table {
    width: 100%;
  }
  .album-cover-img {
    width: 12vw;
  }
  .tabs-table {
    height: 75vh;
  }
  .spotify-logo {
    width: 15vw !important;
    border-radius: 20px;
    border: none;
  }
  .empty-save-track {
    text-align: center;
    font-size: 50px;
    color: #fff;
    margin-top: 10%;
    text-shadow: 0 0 7px #fff, 0 0 1px rgb(157, 255, 0);
  }
  .save-icon-th {
    text-align: center;
  }
  th {
    font-size: 3vw;
  }
  tr {
    font-size: 3vw;
  }
  .title-tab {
    font-size: 3vw;
  }
  .shuffle-btn {
    width: 50%;
    font-size: 4vw !important;
    padding: 2%;
  }
  .shuffle-btn-container {
    padding: 1px;
    margin-bottom: 8%;
  }
  .tabs-control-table {
    width: 100%;
    padding: 1%;
  }
  .like-icon {
    text-align: center;
    color: rgb(0, 255, 21);
    width: 8vw;
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-corner {
    width: 5px;
    background: rgba(0, 0, 0, 0) !important;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(0, 255, 21);
    border-radius: 10px;
    box-shadow: 0 0 5px #fff, 0 0 5px rgb(157, 255, 0);
  }
}
@media (hover: hover) and (pointer: fine) {
  .active-class:hover {
    background-color: rgba(0, 0, 0, 0.432) !important;
    color: rgb(0, 255, 21) !important;
  }

  .shuffle-btn:hover {
    background-color: black;
  }

  .spotify-logo:hover {
    box-shadow: 0 0 10px #fff, 0 0 20px rgba(157, 255, 0, 0.699) !important;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(10, 179, 24);
  }
  .active-class:hover {
    background-color: rgb(44, 39, 39) !important;
  }
}
</style>
