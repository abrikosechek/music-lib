<template>
  <q-page padding>
    <div class="flex column flex-center" style="width: 100%; max-width: 700px">
      <q-list style="width: 100%">
        <q-item v-for="artist in shownArtists" :key="artist.name" clickable>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ artist.name[0] }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label> {{ artist.name }} </q-item-label>
            <q-item-label caption>
              {{ artist.listeners }}k listeners
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>
      </q-list>

      <q-pagination
        v-if="artists.length"
        v-model="currentPage"
        direction-links
        :max-pages="6"
        :max="paginationItems"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, computed } from "vue";

defineOptions({
  name: "ArtistsPage",
});

const $q = useQuasar();

const artists = $q.localStorage.getItem("artists");

const pageSize = 10;
const currentPage = ref(1);
const paginationItems = computed(() => Math.ceil(artists.length / pageSize));
const shownArtists = computed(() =>
  artists.slice(pageSize * currentPage.value - 10, currentPage.value * pageSize)
);
</script>
