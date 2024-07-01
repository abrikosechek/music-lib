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

        <AddItem clickable @mousedown="addArtistModal = true" />
      </q-list>

      <q-pagination
        v-if="artists.length"
        v-model="currentPage"
        direction-links
        :max="paginationItems"
      />

      <!-- dialogs -->
      <q-dialog v-model="addArtistModal">
        <q-card style="max-width: 400px; width: 100%">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Close icon</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <q-form class="q-gutter-md" autofocus @submit="onSubmit">
              <q-input
                filled
                v-model="artistNameField"
                label="Artist name"
                hint="Name should be unique"
              />

              <q-btn label="Submit" type="create" color="primary" />
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCounterStore } from "stores/artists";
import AddItem from "components/AddItem.vue";

defineOptions({
  name: "ArtistsPage",
});

const artistsStore = useCounterStore();
const artists = computed(() => artistsStore.artistsList);

const addArtistModal = ref(false);
const artistNameField = ref(null);

const pageSize = 10;
const currentPage = ref(1);
const paginationItems = computed(() =>
  Math.ceil(artists.value.length / pageSize)
);
const shownArtists = computed(() =>
  artists.value.slice(
    pageSize * currentPage.value - 10,
    currentPage.value * pageSize
  )
);

const onSubmit = () => {
  const result = artistsStore.addArtist(artistNameField.value);
  if (result == "success") {
    artistNameField.value = null;
    addArtistModal.value = false;
  }
};
</script>
