<template>
  <div class="home">
    <b-container fluid>
      <b-card no-body>
        <b-tabs pills card>
          <b-tab title="Recommendate Tracks" active>
            <b-table-simple v-show="showRecommendateTable" responsive>
              <b-thead>
                <b-tr>
                  <b-th> </b-th>
                  <b-th sticky-column>Demo Track</b-th>
                  <b-th>Name</b-th>
                  <b-th>Artist/Artists</b-th>
                  <b-th>Cover Album</b-th>
                  <b-th>Album</b-th>
                  <b-th> </b-th>
                </b-tr>
              </b-thead>
              <b-tbody v-for="tracks in recommenedTracks" :key="tracks.id">
                <b-tr>
                  <b-th sticky-column>
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
                    <audio controls :src="tracks.demoUrl"></audio>
                  </b-th>
                  <b-td>{{ tracks.track }}</b-td>
                  <b-td>{{ tracks.artists }}</b-td>
                  <b-td
                    ><img
                      class="album-cover-img"
                      :src="tracks.albumCover"
                      alt="Album Cover"
                  /></b-td>
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
            <b-table-simple v-show="showSaveTable" responsive>
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
import SpotifyWebApi from "spotify-web-api-js";
import { hashParams } from "../helpers/hash-params";
import { randomNumber } from "../helpers/random-number";

const spotifyApi = new SpotifyWebApi();

export default {
  data() {
    return {
      savedTracks: [],
      recommenedTracks: [],
      modalShow: true,
      showOverlay: false,
      showRecommendateTable: false,
      like: false,
      likeSongs: [],
      savedTrack: [],
      showSaveTable: false,
      savesTrack: [],
      email: [],
    };
  },
  created() {
    this.exe();
  },
  updated() {
    if (this.likeSongsC) {
      this.getSavedTracks();
    }
  },
  computed: {
    likeSongsC() {
      return this.likeSongs.length;
    },
  },
  methods: {
    async exe() {
      await this.$store.dispatch("getToken");
      await this.$store.dispatch("getLog");
      if (this.$store.state.userEmail) {
        console.log(this.$store.state.userEmail);
        this.getSavedTracks();
        this.getRecommendateTracks();
      }
    },
    returnToLogin() {
      this.showOverlay = true;

      setTimeout(() => {
        this.$router.push("/");
      }, 3000);
    },
    async getRecommendateTracks() {
      const params = hashParams();
      const token = params.access_token;
      if (token) {
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
              this.recommenedTracks = this.recommenedTracks.map((el) => {
                return {
                  albumCover: el.album.images[0].url,
                  album: el.album.name,
                  track: el.name,
                  artists: el.artists.map((artist) => artist.name).join(" x "),
                  linkTrack: el.external_urls.spotify,
                  demoUrl: el.preview_url,
                  id: el.id,
                };
              });
              this.showRecommendateTable = true;
            });
        });
      }
    },
    async getSavedTracks() {
      console.log("asd");
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
          this.savesTrack = [...tracks];
          console.log(this.savesTrack);
          this.showSaveTable = true;
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
          tracks.map((track) => this.likeSongs.push(track.id));
        });
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
.listen-spotify-btn {
  width: 150px;
}
.album-cover-img {
  width: 100px;
}
.like-icon {
  fill: grey;
}
</style>
