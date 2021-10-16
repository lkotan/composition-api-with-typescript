<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Button from "./Button.vue";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  components: {
    Button,
  },
  setup() {
    const name = ref<string>("");
    const url = ref<string>("");
    const urlMessage = ref<string>("Please start with 'w' for url");
    const urlControl = computed(() => {
      if (url.value != "") return !url.value.startsWith("w")
      else return false
    });

    return {
      name,
      url,
      urlControl,
      urlMessage,
    };
  },
  methods: {
    addLink() {
      if (this.name == "" || this.url == "") return;
      const links = JSON.parse(localStorage.getItem("links") || "[]");
      links.unshift({
        id: uuidv4(),
        name: this.name.toUpperCase(),
        url: this.url,
        point: 0,
      });
      localStorage.setItem("links", JSON.stringify(links));
      this.$toast.info(`${this.name.toUpperCase()} added`);
      this.name = "";
      this.url = "";
    },
  },
});
</script>

<template>
  <h3 class="new-link">Add New Link</h3>
  <form @submit.prevent="addLink">
    <div class="form-control">
      <label>Link Name:</label>
      <input type="text" autofocus placeholder="Link Name" v-model="name" />
    </div>
    <div class="form-control">
      <label>Link URL:</label>
      <input type="text" placeholder="Link URL" v-model="url" />
    </div>
    <p v-if="urlControl" class="message">
      {{ urlMessage }}
    </p>
    <div class="form-control">
      <Button>
        <button
          class="btn"
          :class="[urlControl ? 'btn--disabled' : '']"
          :disabled="urlControl"
        >
          Add
        </button>
      </Button>
    </div>
  </form>
</template>

<style scoped>
.new-link {
  @apply text-xl
    my-3
    text-center;
}
form {
  @apply flex
    flex-col
    items-center;
}
.form-control {
  @apply flex
    flex-col
    mb-4
    w-6/12;
}
.btn {
  @apply self-end
  px-4
  py-2
  uppercase
  hover:bg-green-900
  delay-100
  bg-black;
}
label {
  @apply font-semibold
    text-lg;
}
input {
  @apply py-1
    px-2
    outline-none
    border-none
    rounded-md
    text-md
    caret-green-800
    bg-green-700
    text-white;
}
input::placeholder {
  @apply text-white;
}
input:focus {
  @apply delay-75
    bg-black;
}
.form-control .btn--disabled {
  @apply cursor-not-allowed
  opacity-50
  text-black
  bg-gray-300;
}
.message {
  @apply mb-3
  w-3/6
  text-md
  text-center
  text-red-600;
}
</style>
