<script lang="ts">
import { defineComponent, ref } from "vue";
import Form from "./Form.vue";

export default defineComponent({
  components: {
    Form,
  },
});
</script>

<template>
  <div>
    <router-link to="/" tag="a" class="return-list">Return to list</router-link>
  </div>
  <Form />
</template>

<style scoped>
div{
  @apply
  flex
}
.return-list {
  @apply ml-4
  flex
  items-center
  text-md;
}
.return-list::before {
  @apply mr-2
  text-3xl;
  content: "\21E0";
}
</style>
