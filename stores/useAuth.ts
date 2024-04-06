import {defineStore} from "pinia";

export const useAuth = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    isLoggedIn: false,
  }),
  actions: {
    // logout() {
    //   localStorage.removeItem("token");
    //   this.token = "";
    //   //   this.$router.push("/login");
    // },
    async logout() {
      try {
        localStorage.removeItem("token");
        this.token = "";
        this.isLoggedIn = false; // Add this line
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  },
});
