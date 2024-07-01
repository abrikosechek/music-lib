import { LocalStorage, Notify } from "quasar";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("artists", {
  state: () => ({
    artists: [],
  }),
  getters: {
    artistsList: (state) => state.artists,
  },
  actions: {
    getArtists() {
      this.artists = LocalStorage.getItem("artists") || [];
    },
    addArtist(name) {
      if (!name) {
        Notify.create({
          message: "Enter artist name",
          icon: "warning",
        });
        return "Enter artist name";
      }
      if (this.artists.find((item) => item.name == name)) {
        Notify.create({
          message: "Such artist already exists",
          icon: "warning",
        });
        return "Such artist already exists";
      }

      const newArtistObject = {
        name: name,
        listeners: Math.floor(Math.random() * 750) + 1,
      };

      try {
        LocalStorage.set("artists", [...this.artists, newArtistObject]);
        this.artists.push(newArtistObject);
        Notify.create({
          message: "Artist added",
        });
        return "success";
      } catch (e) {
        Notify.create({
          message: "Unknown web storage error",
          icon: "warning",
        });
        return "Unknown web storage error";
      }
    },
  },
});
