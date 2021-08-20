<template>
  <b-table-simple
    responsive
    class="table-recommendate borderless"
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
</template>

<script>
import VueAPlayer from "vue-aplayer";

export default {
  props: [
    "showRecommendateTable",
    "recommenedTracks",
    "likeSongs",
    "removeLikeTrack",
    "likeTrack",
  ],
  components: {
    VueAPlayer,
  },
};
</script>

<style>
.table-recommendate {
  width:100%;
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
</style>
