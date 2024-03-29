import {defineStore} from "pinia";

// Interface for state type safety
// interface StoreState {
//   darkMode: boolean;
// }

export const useStore = defineStore("store", {
  state: () => ({
    darkMode: false,
  }),
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
});
