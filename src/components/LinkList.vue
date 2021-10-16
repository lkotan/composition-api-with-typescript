<script lang="ts">
import { defineComponent, ref } from "vue";
import LinkItem from "./LinkItem.vue";
import Select from "./Select.vue";
import Link from "../types/Link";

export default defineComponent({
  components: {
    LinkItem,
    Select,
  },
  setup() {
    const links = ref<Link[]>(
      JSON.parse(localStorage.getItem("links") || "[]")
    );

    const updateLink = (isUp: boolean, link: Link) => {
      let index = links.value.findIndex((x: Link) => x.id == link.id);
      if (index != -1) {
        if (isUp) link.point++;
        else link.point--;
        localStorage.setItem("links", JSON.stringify(links.value));
      }
    };

    const updateChange = (value: string) => {
      if (value == "1") {
        links.value.sort((a: Link, b: Link) => {
          return b.point - a.point;
        });
      } else {
        links.value.sort((a: Link, b: Link) => {
          return a.point - b.point;
        });
      }
    };

    return { links, updateChange, updateLink };
  },
  methods: {
    deleteLink(link: Link) {
      this.links = JSON.parse(localStorage.getItem("links") || "[]");
      let index = this.links.findIndex((x: Link) => x.id == link.id);
      if (index != -1) {
        this.links.splice(index, 1);
        this.links.filter((x: Link) => x.id != link.id);
        localStorage.setItem("links", JSON.stringify(this.links));
        const body = document.getElementsByTagName("body")[0];
        body.style.overflow = "auto";
      }
      this.$toast.success(`${link.name} removed`, {
        position: "top",
      });
    },
  },
});
</script>

<template>
  <h1 class="title">Link Vote <span>App</span></h1>
  <header>
    <Select @updateChange="updateChange" />
    <router-link to="/add" tag="button">Add New Link</router-link>
  </header>
  <LinkItem
    v-for="(link, index) in links"
    :key="index"
    :link="link"
    @deleteLink="deleteLink"
    @updateLink="updateLink"
  />
  <div v-if="links.length == 0" class="message">
    <p>No records to show</p>
  </div>
</template>

<style scoped>
header {
  @apply mt-5
  flex
  justify-around;
}
header [tag="button"] {
  @apply p-2
  rounded-lg
  hover:bg-black
  transition
  delay-75
  text-md
  text-white
  bg-green-700;
}
.title {
  @apply px-3
    py-2
    rounded-md
    text-lg
    tracking-wider
    uppercase
    text-center
    text-gray-900;
}
.title span {
  @apply text-green-800;
}

.message {
  @apply mt-7
  mb-5
  flex
  justify-center;
}
.message p {
  @apply w-3/5
  py-2
  text-center
  text-lg
  rounded-md
  text-white
  bg-green-900;

  text-shadow: 2px 2px 4px #b9b9b9;
}
</style>
