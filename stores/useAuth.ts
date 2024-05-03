import {defineStore} from "pinia";
import axios from "axios";
import {ref, watch, onMounted} from "vue";
import {getUsername} from "../services/auth.service";
// import {useRouter} from "nuxt/app";
// const router = useRouter();

type LoginData = {
  username: string;
  password: string;
};

export const useAuth = defineStore("auth", {
  state: () => ({
    token: typeof window !== "undefined" && typeof window.localStorage !== "undefined" ? localStorage.getItem("token") || "" : "",
    username: typeof window !== "undefined" && typeof window.localStorage !== "undefined" ? localStorage.getItem("username") || null : null,
    isLoggedIn: typeof window !== "undefined" && typeof window.localStorage !== "undefined" ? !!localStorage.getItem("token") : false,
  }),
  actions: {
    initialize() {
      if (process.client) {
        this.token = localStorage.getItem("token") || "";
        this.username = localStorage.getItem("username") || null;
        this.isLoggedIn = !!this.token;
      }
    },
    setToken(token: string) {
      this.token = token;
      if (process.client) {
        localStorage.setItem("token", token);
      }
    },
    setUsername(username: string | null) {
      this.username = username;
      if (process.client) {
        localStorage.setItem("username", username ?? "");
      }
    },
    setIsLoggedIn(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn;
      if (process.client) {
        localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
      }
    },
    async login(data: LoginData) {
      try {
        await axios
          .post("https://fakestoreapi.com/auth/login", data)
          .then(res => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", getUsername(res.data.token));
            this.token = res.data.token;
            this.username = getUsername(res.data.token);
            this.isLoggedIn = true;
          })
          .catch(error => {
            console.log(error);
          });
      } catch (error) {
        console.log("Login error:", error);
      }
    },

    async logout() {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        this.username = "";
        this.token = "";
        this.isLoggedIn = false; // Add this line
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  },
});

// export function useAuth() {
//   const token = ref<string>('');
//   const username = ref<string | null>(null);
//   const isLoggedIn = ref<boolean>(false);

//   // Function to set token, username, and isLoggedIn values from localStorage
//   const initializeAuthState = () => {
//     if (typeof localStorage !== 'undefined') {
//       token.value = localStorage.getItem('token') || '';
//       username.value = localStorage.getItem('username') || null;
//       isLoggedIn.value = !!localStorage.getItem('token');
//     }
//   }

//   // Call the function when the component is mounted
//   onMounted(() => {
//     initializeAuthState();
//   });

//   const login = async (data: LoginData) => {
//     try {
//       const response = await axios.post("https://fakestoreapi.com/auth/login", data);
//       const newToken = response.data.token;
//       const newUsername = getUsername(newToken);
//       token.value = newToken;
//       username.value = newUsername;
//       isLoggedIn.value = true;

//       if (typeof localStorage !== 'undefined') {
//         localStorage.setItem('token', newToken);
//         localStorage.setItem('username', newUsername);
//       }
//     } catch (error) {
//       console.log("Login error:", error);
//     }
//   }

//   watch(token, (newToken) => {
//     if (typeof localStorage !== 'undefined') {
//       localStorage.setItem('token', newToken);
//     }
//   });

//   watch(username, (newUsername) => {
//     if (typeof localStorage !== 'undefined' && newUsername) {
//       localStorage.setItem('username', newUsername);
//     }
//   });

//   return { token, username, isLoggedIn, login };
// }
