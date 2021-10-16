<script lang="ts">
import { defineComponent, PropType, toRefs, watch } from "vue";
import Link from "../types/Link";

export default defineComponent({
  props: {
    modal: {
      type: Boolean,
      required: true,
    },
    link: {
      type: Object as PropType<Link>,
      required: true,
    },
  },
  emits: ["modalClose", "deleteLink"],
  setup(props) {
    const { modal,link } = toRefs(props);
    watch(modal, () => {
      const body = document.getElementsByTagName("body")[0];
      if (modal.value) {
        window.scrollTo(0, 0);
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    });
    return {};
  },
});
</script>

<template>
  <teleport to="#modal">
    <div v-if="modal" class="modal">
      <div class="modal__wrapper">
        <header class="modal__header">
          <h2>Remove Link</h2>
          <button @click="$emit('modalClose', false)">X</button>
        </header>
        <div class="modal__content">
          <p>Dou you want to remove:</p>
          <p>{{ link.name }}</p>
        </div>
        <footer class="modal__footer">
          <button @click="$emit('deleteLink', link)">Ok</button>
          <button @click="$emit('modalClose', false)">Close</button>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.modal {
  @apply absolute
    top-0
    left-0
    bottom-0
    right-0
    flex
    flex-col
    items-center
    justify-center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal__wrapper {
  @apply w-72
  rounded-md
  bg-white;
}
.modal__header {
  @apply rounded-sm
    flex
    justify-between
    p-3
    text-lg
    text-white
    bg-black;
}
.modal__content {
  @apply mt-3
    flex
    flex-col
    items-center
    text-lg;
}
.modal__content p:first-child {
  @apply text-sm;
}
.modal__content p:nth-child(2) {
  @apply text-red-700;
}
.modal__footer {
  @apply my-5
    px-3
    flex
    justify-around;
}
.modal__footer button {
  @apply rounded-lg
    py-1
    px-3
    text-md
    text-white;
}
.modal__footer button:first-child {
  @apply bg-black;
}
.modal__footer button:nth-child(2) {
  @apply bg-gray-700;
}
</style>
