<template>
  <router-view />
</template>

<script setup>
import { useQuasar } from "quasar";

defineOptions({
  name: "App",
});

const $q = useQuasar();

const albumsArray = [
  {
    name: "Rock",
    author: "Artist 1",
    year: 1992,
  },
  {
    name: "Lo-Fi",
    author: "Artist 1",
    year: 2005,
  },
  {
    name: "Favorite",
    author: "Artist 2",
    year: 2013,
  },
];
const songsArray = [
  {
    name: "Song 1",
    albums: [
      {
        name: "Rock",
        place: 1,
      },
    ],
  },
  {
    name: "Song 2",
    albums: [
      {
        name: "Rock",
        place: 2,
      },
    ],
  },
  {
    name: "Song 3",
    albums: [
      {
        name: "Rock",
        place: 3,
      },
    ],
  },
  {
    name: "Heart",
    albums: [
      {
        name: "Rock",
        place: 4,
      },
    ],
  },
  {
    name: "Tube",
    albums: [
      {
        name: "Rock",
        place: 5,
      },
    ],
  },
  //
  {
    name: "Wake up",
    albums: [
      {
        name: "Lo-Fi",
        place: 1,
      },
    ],
  },
  {
    name: "Standalone",
    albums: [
      {
        name: "Lo-Fi",
        place: 2,
      },
    ],
  },
  {
    name: "Week",
    albums: [
      {
        name: "Lo-Fi",
        place: 3,
      },
    ],
  },
  //
  {
    name: "Holidays",
    albums: [
      {
        name: "Favorite",
        place: 1,
      },
    ],
  },
  {
    name: "Just another song",
    albums: [
      {
        name: "Favorite",
        place: 2,
      },
    ],
  },
  {
    name: "Piu-piu-pow",
    albums: [
      {
        name: "Favorite",
        place: 3,
      },
    ],
  },
  {
    name: ":(",
    albums: [
      {
        name: "Favorite",
        place: 4,
      },
    ],
  },
  //
  {
    name: "Happy",
    albums: [
      {
        name: "Rock",
        place: 6,
      },
      {
        name: "Lo-Fi",
        place: 4,
      },
    ],
  },
  {
    name: "Nihon",
    albums: [
      {
        name: "Favorite",
        place: 5,
      },
      {
        name: "Lo-Fi",
        place: 5,
      },
    ],
  },
];

if (!$q.localStorage.getItem("artists")) {
  // set artists
  let generatedArtists = new Array(47);
  for (let i = 0; i < 47; ++i)
    generatedArtists[i] = {
      name: `Artist ${i + 1}`,
      listeners: Math.floor(Math.random() * 750) + 1,
    };
  $q.localStorage.set("artists", generatedArtists);
  // set albums
  $q.localStorage.set("albums", albumsArray);
  // set songs
  $q.localStorage.set("songs", songsArray);
}
</script>
