<template>
  <b-card class="tab" no-body>
    <b-tabs
      pills
      card
      class="tabs"
      active-nav-item-class="active-class"
      nav-wrapper-class="control-tab"
    >
      <slot />
    </b-tabs>
  </b-card>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    firstTitle: String,
    secondTitle: String,
  },
};
</script>

<style></style>
