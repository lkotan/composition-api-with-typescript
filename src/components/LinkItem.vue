<script lang="ts">
import { defineComponent, PropType, ref, toRefs } from "vue";
import Button from "./Button.vue";
import Modal from "./Modal.vue";
import Link from "../types/Link";

export default defineComponent({
  components: {
    Button,
    Modal,
  },
  props: {
    link: {
      type: Object as PropType<Link>,
      required: true,
    },
  },
  emits: ["deleteLink", "updateLink"],
  setup(props, context) {
    const { link } = toRefs(props);
    const modal = ref<boolean>(false);

    const modalOpen = () => (modal.value = true);
    const modalClose = (value: boolean) => (modal.value = value);

    const deleteLink = (link: Link) => {
      context.emit("deleteLink", link);
      modal.value = false;
    };

    return { modal, modalOpen, modalClose, deleteLink };
  },
});
</script>

<template>
  <Modal
    :link="link"
    :modal="modal"
    @modalClose="modalClose"
    @deleteLink="deleteLink"
  />
  <div class="card">
    <p class="card__point">{{ link.point }} Points</p>
    <div class="card__body">
      <h1>{{ link.name }}</h1>
      <a :href="'https://' + link.url" target="_blank">{{ link.url }}</a>
      <Button>
        <button @click="modalOpen" class="btn btn--circle">-</button>
      </Button>
      <footer class="card__footer">
        <Button>
          <button @click="$emit('updateLink', true, link)" class="btn btn--up">
            Up
          </button>
        </Button>
        <Button>
          <button
            @click="$emit('updateLink', false, link)"
            class="btn btn--down"
          >
            Down
          </button>
        </Button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply flex
  items-center
  relative
  mt-10
  mx-2
  p-2
  cursor-pointer
  delay-100
  hover:bg-gray-200;
}
.card__body .btn--circle {
  @apply absolute
  right-0
  top-0
  flex
  justify-center
  w-6
  h-6
  text-lg
  text-center
  rounded-full
  opacity-0
  delay-100
  bg-black
  text-white;
  content: "\229D";
}
.card:hover .btn--circle {
  @apply opacity-100;
}
.card__point {
  @apply w-14
  text-center
  rounded-sm
  p-1
  text-md
bg-gray-300;
}
.card__body {
  @apply w-full
  flex
  flex-col
  px-5;
}
.card__body h1 {
  @apply text-xl
  font-semibold;
}
.card__body a {
  @apply text-xs
  mb-3
  text-gray-400;
}

.card__footer {
  @apply flex
  justify-between;
}
.btn {
  @apply flex
  items-center
  px-2
  hover:shadow-lg
  bg-green-700;
}
.btn::before {
  @apply mr-1
  text-lg;
}
.btn--up::before {
  content: "\219F";
}
.btn--down::before {
  content: "\21A1";
}
</style>
