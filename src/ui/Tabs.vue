<template>
    <b-tabs
      pills
      :card="card"
      active-nav-item-class="active-class"
      nav-wrapper-class="control-tab"
    >
      <slot />
    </b-tabs>
</template>

<script>
export default {
  name: "Tabs",
  props:["card"]
};
</script>

<style></style>
