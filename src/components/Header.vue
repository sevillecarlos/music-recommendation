<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="header">
      <b-navbar-brand class="logo-img" href="#"
        ><img class="logo-img" src="../assets/logo.png" alt="Logo" /> Music
        Recommendation Spotify</b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap");
.logo-img {
  font-size: 30px;
  font-family: "Quicksand", sans-serif;
}
.header {
  background-color: rgba(39, 121, 108, 0.58);
}
</style>
