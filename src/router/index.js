import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: () => import("../components/LinkList.vue") },
  { path: "/add", component: () => import("../components/AddLink.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
