<template>
  <router-view />
</template>

<script setup>
import { useCounterStore } from "stores/artists";

defineOptions({
  name: "App",
});

const artistsStore = useCounterStore();
artistsStore.getArtists();
</script>
