<template>
  <div class="home">
    <b-container fluid>
      <b-overlay rounded="sm">
        <template #overlay>
          <div class="d-flex align-items-center">
            <b-spinner small type="grow" variant="secondary"></b-spinner>
            <b-spinner type="grow" variant="dark"></b-spinner>
            <b-spinner small type="grow" variant="secondary"></b-spinner>
          </div>
        </template>
        <b-card no-body class="tabs-table">
          <b-tabs pills card>
            <b-tab title="Recommendate Tracks" active>
              <b-table-simple
                v-show="showRecommendateTable"
                responsive
                class="table-recommendate"
                borderless
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
                        @click="likeTrack(tracks)"
                        :icon="
                          likeSongs.indexOf(tracks.id) !== -1
                            ? 'heart-fill'
                            : 'heart'
                        "
                        :id="tracks.id"
                        font-scale="2"
                      ></b-icon>
                    </b-th>
                    <b-th>
                      <VueAPlayer
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
            <b-tab title="Likes Tracks">
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
            <b-button
              class="login-spotify-btn"
              pill
              variant="outline-success"
              href="http://localhost:3000/login-spotify"
            >
              <img
                class="spotify-logo"
                src="../assets/spotify-logo.png"
                alt="spotify-logo"
              />
            </b-button>
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
    </b-container>
  </div>
</template>

<script>
import VueAPlayer from "vue-aplayer";
import SpotifyWebApi from "spotify-web-api-js";
import { hashParams } from "../helpers/hash-params";
import { randomNumber } from "../helpers/random-number";
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
    };
  },
  created() {
    this.exe();
  },
  watch: {
    likeSongsLength() {
      this.getSavedTracks();
    },
  },
  methods: {
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
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap");
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
.listen-spotify-btn {
  width: 150px;
}
.album-cover-img {
  width: 100px;
}
.like-icon {
  fill: grey;
}
.tabs-table {
  margin-top: 2%;
  margin-left: 10%;
  width: 70%;
}
.table-recommendate {
  height: 70vh;
  background-color: rgb(18, 20, 15);
}
th {
  color: white;
  font-size: 20px;
}
tr {
  color: rgb(50, 205, 50);
  font-family: "Quicksand", sans-serif;
  font-size: 20px;
  font-weight: bolder;
}
thead {
  background-color: rgb(41, 46, 33);
}

.home {
  background-color: #25252c;
  height: 90vh;
}
</style>
