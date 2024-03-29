import {defineStore} from "pinia";

export const useAuth = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    isLoggedIn: false,
  }),
  actions: {
    logout() {
      localStorage.removeItem("token");
      this.token = "";
      //   this.$router.push("/login");
    },
  },
});
