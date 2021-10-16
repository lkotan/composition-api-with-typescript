<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(_, context) {
    const updateChange = (e: Event) => {
      context.emit("updateChange", (e.target as HTMLSelectElement).value);
    };
    return {
      updateChange,
    };
  },
});
</script>

<template>
  <select @change="updateChange($event)">
    <option selected disabled>Order by...</option>
    <option value="1">Most Voted</option>
    <option value="2">Less Voted</option>
  </select>
</template>

<style scoped>
select {
  @apply w-5/12
  px-1
  text-base
  outline-none
  border
  rounded-sm
  border-gray-400
  bg-gray-200;
}
</style>
