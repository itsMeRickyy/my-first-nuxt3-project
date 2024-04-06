<script setup>
import {login, getUsername} from "~/services/auth.service";

const username = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = event => {
  event.preventDefault();

  const data = {
    username: username.value,
    password: password.value,
  };

  login(data, (success, tokenOrError) => {
    // Use the login function with a callback
    if (success) {
      localStorage.setItem("token", tokenOrError); // Store the token in local storage
      const username = getUsername(tokenOrError); // Get the username from the token
      console.log("Logged in as", username);

      const currentRoute = router.currentRoute.value;
      if (currentRoute.query.redirect) {
        router.push(currentRoute.query.redirect.toString());
      } else {
        router.push("/");
      }
    } else {
      // Handle login error, e.g., show error message
      console.error("Login error:", tokenOrError);
    }
  });
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
        <div class="w-full h-9 flex items-center">
          <!-- <p class="text-red-500 mb-2 ml-2">{loginFailed}</p> -->
        </div>
        <button class="w-full px-2 py-2 border outline-none rounded-lg bg-slate-700 text-white hover:bg-slate-600" type="submit">Sign in</button>
      </form>
    </div>
  </div>
</template>
