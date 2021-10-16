<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<style>
body{
  @apply
  h-screen
  box-border
  p-0
  bg-green-600;
  font-family: monospace !important;
}
#app{
  @apply
  flex
  justify-center
}
.wrapper{
  @apply
  mt-16
  pt-4
  pb-1
  w-96
  rounded-lg
  bg-gray-100
}
.btn{
  @apply
  rounded-md
  text-md
  text-white;
}
</style>
