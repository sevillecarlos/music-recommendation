<template>
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
      <b-overlay
        :show="showOverlayCard"
        rounded="sm"
        class="overlay"
        variant="transparent"
        opacity="0.91"
        blur="1rem"
      >
        <template #overlay>
          <div class="d-flex align-items-center">
            <b-spinner small type="grow" class="small-spiner"></b-spinner>
            <b-spinner type="grow" class="big-spiner"></b-spinner>
            <b-spinner small type="grow" class="small-spiner"></b-spinner>
          </div>
        </template>
        <b-card no-body class="tabs-table" bg-variant="dark">
          <b-tabs
            nav-class="item-tab"
            content-class="addas"
            pills
            active-nav-item-class="active-class"
            nav-wrapper-class="control-tab"
          >
            <b-tab
              title="Recommendate Tracks"
              active
              title-link-class="title-tab text-"
            >
              <template #title>
                <b-spinner class="spinner-rec" type="grow" small></b-spinner
                >Recommendate Tracks
              </template>
              <b-overlay
                :show="showOverlayRecommendTable"
                rounded="sm"
                class="overlay"
                variant="transparent"
                opacity="0.91"
                blur="1rem"
              >
                <template #overlay>
                  <div class="d-flex align-items-center">
                    <b-spinner
                      small
                      type="grow"
                      class="small-spiner"
                    ></b-spinner>
                    <b-spinner type="grow" class="big-spiner"></b-spinner>
                    <b-spinner
                      small
                      type="grow"
                      class="small-spiner"
                    ></b-spinner>
                  </div>
                </template>

                <b-table-simple
                  responsive
                  class="table-recommendate "
                  borderless
                  v-show="showRecommendateTable"
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
                          :mini="true"
                          :music="{
                            src: tracks.demoUrl,
                            pic: tracks.albumCover,
                          }"
                        />
                      </b-th>
                      <b-td>{{
                        tracks.track.indexOf("(") !== -1
                          ? tracks.track.slice(0, tracks.track.indexOf("("))
                          : tracks.track
                      }}</b-td>
                      <b-td>{{ tracks.artists }}</b-td>

                      <b-td>{{ tracks.album }}</b-td>
                      <b-td></b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-overlay>
            </b-tab>

            <b-tab title="Likes Tracks" title-link-class="title-tab">
              <b-table-simple
                v-show="showSaveTable"
                responsive
                class="table-recommendate"
                borderless
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
          </b-tabs>
        </b-card>
      </b-overlay>

      <b-modal
        no-close-on-backdrop
        no-close-on-esc
        centered
        hide-header
        hide-footer
        id="modal-1"
        v-model="modalShow"
        class="model-spotify-auth"
      >
        <b-overlay
          :show="showOverlay"
          rounded="sm"
          class="overlay"
          variant="transparent"
          opacity="0.91"
          blur="1rem"
        >
          <template #overlay>
            <div class="d-flex align-items-center">
              <b-spinner small type="grow" class="small-spiner"></b-spinner>
              <b-spinner type="grow" class="big-spiner"></b-spinner>
              <b-spinner small type="grow" class="small-spiner"></b-spinner>
            </div>
          </template>
          <b-card bg-variant="dark">
            <template #header>
              <h5 class="title-modal-header">
                Log to Spotify
                <img class="logo-model" src="../assets/logo.png" alt="logo" />
              </h5>
            </template>
            <b-button
              class="login-spotify-btn"
              pill
              variant="outline-success"
              href="http://localhost:3000/login-spotify"
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
        </b-overlay>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import VueAPlayer from "vue-aplayer";
import SpotifyWebApi from "spotify-web-api-js";
import { hashParams } from "../helpers/hash-params";
import { randomNumber } from "../helpers/random-number";
import { randomNumberMinOne } from "../helpers/random-number-one";

const spotifyApi = new SpotifyWebApi();

export default {
  components: {
    VueAPlayer,
  },
  data() {
    return {
      savedTracks: [],
      recommenedTracks: [],
      modalShow: true,
      showOverlay: false,
      showRecommendateTable: false,
      like: false,
      likeSongs: [],
      likeSongsLength: 0,
      savedTrack: [],
      showSaveTable: false,
      savesTrack: [],
      email: [],
      counter: 0,
      shuffleIcons: "dice-1-fill",
      showOverlayRecommendTable: false,
      showOverlayCard: false,
    };
  },
  created() {
    this.exe();
  },
  watch: {
    likeSongsLength() {
      console.log("asdsa");
      this.getSavedTracks();
    },
  },
  methods: {
    getShuffleDiceIcom() {
      this.shuffleIcons = `dice-${randomNumberMinOne(6)}-fill`;
      this.showOverlayRecommendTable = true;
    },
    shuffleBtn() {
      this.getShuffleDiceIcom();
      this.getRecommendateTracks();
    },
    async exe() {
      await this.$store.dispatch("getToken");
      await this.$store.dispatch("getLog");

      if (this.$store.state.userEmail) {
        this.getSavedTracks();
        this.getRecommendateTracks();
        this.fillIdSongs();
      }
    },
    async returnToLogin() {
      this.showOverlay = true;
      await this.$store.dispatch("signOut");

      setTimeout(() => {
        this.$router.push("/");
        this.$store.commit("setLogOutShow", false);
      }, 3000);
    },
    async getRecommendateTracks() {
      const params = hashParams();
      const token = params.access_token;
      if (token) {
        localStorage.setItem("access-token", token);
        this.showOverlayCard = true;
        this.modalShow = false;
        spotifyApi.setAccessToken(token);
        spotifyApi.getMySavedTracks().then((res) => {
          this.savedTracks = [...res.items];
          const sizeSavedTracks = this.savedTracks.length;
          const {
            track: { artists: artistName, id },
          } = this.savedTracks[randomNumber(sizeSavedTracks, 0)];

          const seeds = {
            seedArtist: artistName[0].id,
            seedTrack: id,
            accessToken: token,
          };
          fetch(`http://localhost:3000/recommendation`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(seeds),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                const { tracks } = data;
                this.recommenedTracks = [...tracks];
                this.recommenedTracks = this.recommenedTracks
                  .map((el) => {
                    return {
                      albumCover: el.album.images[0].url,
                      album: el.album.name,
                      track: el.name,
                      artists: el.artists
                        .map((artist) => artist.name)
                        .join(" x "),
                      linkTrack: el.external_urls.spotify,
                      demoUrl: el.preview_url,
                      id: el.id,
                    };
                  })
                  .filter((track) => track.demoUrl)
                  .slice(0, 20);
                console.log(this.recommenedTracks);
                this.showRecommendateTable = true;
                this.showOverlayRecommendTable = false;
                this.showOverlayCard = false;
              }
            });
        });
      }
    },
    async getSavedTracks() {
      fetch(`http://localhost:3000/save-tracks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email: this.$store.state.userEmail }),
      })
        .then((res) => res.json())
        .then((data) => {
          const { tracks } = data.data;
          if (tracks) {
            this.savesTrack = [...tracks];
            this.showSaveTable = true;
          }
        });
    },
    async fillIdSongs() {
      fetch(`http://localhost:3000/save-tracks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email: this.$store.state.userEmail }),
      })
        .then((res) => res.json())
        .then((data) => {
          const { tracks } = data.data;
          if (tracks) {
            tracks.map((track) => this.likeSongs.push(track.id));
            console.log(this.likeSongs);
          }
        });
    },
    async likeTrack(track) {
      this.savedTrack = [];
      this.savedTrack.push({
        albumCover: track.albumCover,
        album: track.album,
        track: track.track,
        artists: track.artists,
        linkTrack: track.linkTrack,
        id: track.id,
      });
      await fetch(`http://localhost:3000/save-track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.$store.state.userEmail,
          tracks: this.savedTrack,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const { tracks } = data.data;
          this.likeSongs.push(tracks.id);
          this.likeSongsLength = this.likeSongs.length;
        });
    },
    async removeLikeTrack(track) {
      await fetch(`http://localhost:3000/remove-save-track`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.$store.state.userEmail,
          trackId: track.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const { trackId } = data.data;
          const removeTrackIndex = this.savesTrack.findIndex(
            (track) => track.id === trackId
          );
          this.savesTrack.splice(removeTrackIndex, 1);
          console.log(this.savesTrack);
          this.likeSongs.splice(this.likeSongs.indexOf(track.id), 1);
          this.likeSongsLength = this.likeSongs.length;
        });
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap");

.login-spotify-btn {
  margin: auto;
  width: 50%;
  margin-left: 25%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
    0 4px 4px rgba(0, 0, 0, 0.11), 0 6px 8px rgba(0, 0, 0, 0.11),
    0 8px 16px rgba(0, 0, 0, 0.11);
  content: url("../assets/spotify-logo.png");
}
.login-spotify-btn:hover {
  content: url("../assets/spotify-logo-black.png");
}
.logo-model {
  width: 50px;
}
.listen-spotify-btn {
  width: 150px;
}
.album-cover-img {
  width: 100px;
}
.like-icon {
  color: greenyellow;
  width: 50px;
  transition: width 0.2s;
}
.like-icon:hover {
  width: 30px;
}
.tabs-table {
  margin-top: 1%;
  margin-left: 15%;
  width: 70%;
  height: 75vh;
}
.table-recommendate {
  background-color: rgb(18, 20, 15);
  border-radius: 10px;
  border: 3px solid rgba(0, 128, 0, 0.418);
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
  font-size: 20px;
  height: 70vh;
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
  border: 3px solid green;
}
thead {
  background-color: rgba(41, 46, 33, 0.582);
  border-radius: 30px;
}

.home {
  background-color: #25252c;
  height: 90vh;
}
.modal-header {
  padding: 9px 15px;
  border-bottom: 1px solid #292b2c;
  background-color: #339b0b;
  border: none;
}
.modal {
  background-color: rgba(55, 66, 43, 0.24);
}
.modal-body {
  padding: 9px 15px;
  background-color: #292b2c;
  border: none;
}

.modal-footer {
  padding: 9px 15px;
  background-color: #292b2c;
}
.title-modal-header {
  font-size: 150%;
  color: #fff;
  text-shadow: 0 0 7px rgb(5, 34, 12), 0 0 10px rgb(228, 255, 184);
}
.title-tab {
  font-family: "Quicksand", sans-serif;
  font-size: 20px;
  font-weight: 30px;
  letter-spacing: 3px;
  color: rgb(75, 197, 50) !important;
  text-shadow: 0 0 1px rgb(0, 0, 0), 0 0 3px;
  border-radius: 16px !important;
}
.active-class {
  font-family: "Quicksand", sans-serif;
  color: #339b0b !important;
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
}

.return-btn {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
    0 4px 4px rgba(0, 0, 0, 0.11), 0 6px 8px rgba(0, 0, 0, 0.11),
    0 8px 16px rgba(0, 0, 0, 0.11);
  color: #fff;
  text-shadow: 0 0 7px rgb(5, 34, 12), 0 0 10px rgb(228, 255, 184);
}
.small-spiner {
  color: #d4d700;
}
.big-spiner {
  color: #dddf00;
}
.item-tab {
  border: 3px solid green;
  border-radius: 20px;
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
}
.vue-aplyer {
  width: 100%;
}
.active {
  border-radius: 16px !important;
  background-color: rgba(0, 255, 21, 0.486) !important;
  color: rgb(0, 0, 0) !important;
}
.active:hover {
  background-color: rgba(0, 0, 0, 0.432) !important;
  color: rgb(0, 255, 21) !important;
}
.get-tracks-btn {
  width: 20%;
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
  color: rgb(0, 255, 21);
  height: 60px;
  font-size: 30px;
  letter-spacing: 2px;
  background-color: rgb(18, 20, 15);
  border-radius: 100px;
  font-family: "Quicksand", sans-serif;
  margin-top: 2%;
}
.get-tracks-btn:hover {
  color: rgb(18, 20, 15);
  background-color: rgb(0, 255, 21);
}
.spotify-logo{
  width: 50%;
}
.spotify-logo:hover{
  content: url("../assets/listen-on-spotif-whitey.png");
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgb(0, 255, 21);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgb(10, 179, 24);
}
</style>
