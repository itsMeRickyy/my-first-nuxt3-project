<script setup>
import {getUsername} from "../services/auth.service";
import {useAuth} from "#imports";
import {useRouter} from "nuxt/app";

const {login, logout} = useAuth();
const router = useRouter();

const hasToken = localStorage.getItem("token"); // Check for token existence
const username = hasToken ? getUsername(localStorage.getItem("token")) : "";

const setLogin = ref(false);

const toggleModalLogin = () => {
  setLogin.value = !setLogin.value;
};

const handleLogout = async () => {
  try {
    await logout(); // Call the logout action from the store
    router.push("/");
  } catch (error) {
    console.error("Logout error:", error);
    // Handle logout error (optional: display error message to user)
  }
};
</script>

<template>
  <div class="relative">
    <div v-if="username">
      <h1>You are logged in as {{ username }}</h1>
      <button @click="handleLogout">Logout</button>
    </div>
    <div v-else>
      <h1>You are not logged in</h1>
      <button @click="toggleModalLogin">Login</button>
      <div v-show="setLogin" class="absolute w-full h-[35rem] grid place-items-center">
        <ModalAuth :toggleModalLogin="toggleModalLogin" />
      </div>
    </div>
  </div>
</template>
