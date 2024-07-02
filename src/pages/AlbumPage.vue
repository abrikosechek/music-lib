<template>
  <q-page padding>
    <!-- Album about -->
    <div class="album--about">
      <q-avatar
        rounded
        color="primary"
        text-color="white"
        icon="album"
        size="100px"
      />
      <div class="album--about__text">
        <div class="text-h3">
          {{ album.name }}
        </div>
        <div class="album--about__text--author text-h6">
          {{ album.author }}, {{ album.year }}
        </div>
      </div>
    </div>

    <!-- songs -->
    <q-list style="width: 100%; max-width: 500px; margin-top: 24px">
      <q-item
        v-for="song in albumSongs"
        clickable
        tag="router-link"
        :key="song.name"
      >
        <q-item-section avatar>
          <q-avatar
            rounded
            color="primary"
            text-color="white"
            icon="play_arrow"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <span class="place"> {{ song.place }}.</span> {{ song.name }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable @mousedown="addSongModal = true">
        <q-btn round outline icon="add" style="margin: 0 auto" />
      </q-item>
    </q-list>
  </q-page>

  <!-- dialogs -->
  <q-dialog v-model="addSongModal">
    <q-card style="width: 100%; max-width: 500px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add song</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-list>
          <q-item
            v-for="song in nonAlbumSongs"
            clickable
            tag="router-link"
            :key="song.name"
            @click="addSong(song)"
          >
            <q-item-section avatar>
              <q-avatar rounded color="primary" text-color="white" icon="add" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{ song.name }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";

defineOptions({
  name: "AlbumPage",
});

const $q = useQuasar();
const route = useRoute();

const addSongModal = ref(false);

const album = $q.localStorage
  .getItem("albums")
  .filter((i) => i.name == route.params.album)[0];

let songs = ref([]);
let albumSongs = ref([]);
let nonAlbumSongs = ref([]);

const getSongs = () => {
  songs.value = $q.localStorage.getItem("songs");

  let filteredSongs = songs.value.filter((song) => {
    let result = false;
    song.albums.forEach((i) => {
      if (i.name == album.name) {
        result = true;
        return;
      }
    });
    return result;
  });
  albumSongs.value = filteredSongs
    .map((song) => ({
      name: song.name,
      place: song.albums.find((i) => i.name == album.name).place,
    }))
    .sort((a, b) => a.place - b.place);

  nonAlbumSongs.value = songs.value.filter((song) => {
    let result = true;
    song.albums.forEach((i) => {
      if (i.name == album.name) {
        result = false;
        return;
      }
    });
    return result;
  });
};

const addSong = (song) => {
  songs.value
    .find((i) => i.name == song.name)
    .albums.push({
      name: album.name,
      place: albumSongs.value.length + 1,
    });

  $q.localStorage.set("songs", songs.value);

  addSongModal.value = false;
  getSongs();
};

getSongs();
</script>

<style scoped lang="scss">
.album--about {
  display: flex;
  gap: 12px;

  &__text {
    &--author {
      opacity: 0.8;
      margin-top: 8px;
    }
  }
}

.place {
  opacity: 0.8;
}
</style>
