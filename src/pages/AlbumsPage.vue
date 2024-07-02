<template>
  <q-page padding>
    <div class="flex column flex-center" style="width: 100%; max-width: 700px">
      <q-list style="width: 100%">
        <q-item
          v-for="album in albums"
          clickable
          tag="router-link"
          :key="album.name"
          :to="`/album/${album.name}`"
        >
          <q-item-section avatar>
            <q-avatar rounded color="primary" text-color="white" icon="album" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              {{ album.name }} <span class="year">{{ album.year }}</span>
            </q-item-label>
            <q-item-label caption> {{ album.author }} </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";

defineOptions({
  name: "AlbumsPage",
});

const $q = useQuasar();

const albums = $q.localStorage.getItem("albums");
</script>

<style scoped lang="scss">
.year {
  padding-left: 8px;
  opacity: 0.7;
  font-size: 12px;
}
</style>
