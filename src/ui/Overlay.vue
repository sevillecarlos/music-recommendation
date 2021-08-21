<template>
  <b-overlay
    :show="showOverlay"
    class="overlay-f"
    variant="transparent"
    opacity="0"
  >
    <template #overlay>
      <div class="d-flex align-items-center">
        <b-spinner small type="grow" class="small-spiner"></b-spinner>
        <b-spinner type="grow" class="big-spiner"></b-spinner>
        <b-spinner small type="grow" class="small-spiner"></b-spinner>
      </div>
    </template>
    <slot />
  </b-overlay>
</template>

<script>
export default {
  props: ["showOverlay"],
};
</script>

<style>
.overlay {
  border-radius: 20px !important;
}

.small-spiner {
  color: #d4d700;
}
.big-spiner {
  color: #dddf00;
}
</style>
