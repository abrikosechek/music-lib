const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "artists", component: () => import("pages/ArtistsPage.vue") },
      { path: "albums", component: () => import("pages/AlbumsPage.vue") },
      { path: "album/:album", component: () => import("pages/AlbumPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
