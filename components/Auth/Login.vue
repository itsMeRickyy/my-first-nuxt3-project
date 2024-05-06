<script setup lang="ts">
// import {login, getUsername} from "~/services/auth.service";
// import {useAuthToken} from "~/stores/useAuthToken";
// import {useAuth} from "~/stores/useAuth";
// const {login, logout} = useAuth();
import {useAuth} from "../../stores/useAuth";

const authStore = useAuth();
// const nuxtApp = defineNuxtComponent();
// const auth = useAuth(nuxtApp);
const isLoggedIn = computed(() => authStore.isLoggedIn);

const username = ref("");
const password = ref("");
const router = useRouter();

// const handleLogin = event => {
//   event.preventDefault();

//   const data = {
//     username: username.value,
//     password: password.value,
//   };
//   authStore.login(data);
// };

const handleLogin = async event => {
  event.preventDefault();

  const data = {
    username: username.value,
    password: password.value,
  };

  try {
    await authStore.login(data);
    window.location.reload();
    // router.push("/");
  } catch (error) {
    // Handle login error
  }
};
</script>

<template>
  <div>
    <div class="flex flex-col gap-3">
      <div class="flex flex-col justify-center items-center w-full my-5">
        <h1 class="font-bold text-3xl my-2">Classico</h1>
        <h1 class="text-xl">Welcome back!</h1>
      </div>
      <form @submit="handleLogin" class="flex flex-col justify-center items-center w-full gap-2">
        <input v-model="username" class="w-full px-2 py-2 border outline-none rounded-lg bg-none" placeholder="Enter your username" name="username" />
        <input v-model="password" class="w-full px-2 py-2 border outline-none rounded-lg bg-none" type="password" placeholder="******" name="password" />
        <div class="w-full h-9 flex items-center"></div>
        <button class="w-full px-2 py-2 border outline-none rounded-lg bg-slate-700 text-white hover:bg-slate-600" type="submit">Sign in</button>
      </form>
    </div>
  </div>
</template>
