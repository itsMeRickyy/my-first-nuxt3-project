<script setup lang="ts">
import {useAuth} from "#imports";
const authStore = useAuth();

// const username = authStore.username;
// const isLoggedIn = authStore.isLoggedIn;

const username = computed(() => authStore.username);
const isLoggedIn = computed(() => authStore.isLoggedIn);

const setLogin = ref(true);

const toggleModalLogin = () => {
  setLogin.value = !setLogin.value;
};

const handleLogout = async () => {
  try {
    await authStore.logout(); // Call the logout action from the store
    window.location.reload();
  } catch (error) {
    console.error("Logout error:", error);
    // Handle logout error (optional: display error message to user)
  }
};
</script>

<template>
  <div class="relative min-h-[30rem]">
    <!-- <h1>Settings {{ token }}</h1> -->
    <div v-if="isLoggedIn" class="flex">
      <div class="flex flex-col gap-5 p-5 min-w-[10rem] w-[30%]">
        <h1 class="text-lg font-bold text-gray-700">User Profile</h1>
        <div class="flex flex-col items-start justify-start gap-5">
          <button>User Info</button>
          <button>Favorites</button>
          <button>Orders</button>
          <button>Addresses</button>
          <button>Setting</button>
          <button @click="handleLogout">Sign Out</button>
        </div>
      </div>
      <div class="p-5">
        <div class="flex gap-5 items-center">
          <div class="w-24 h-24 text-5xl overflow-hidden bg-white border-2 rounded-full grid place-items-center">
            <Icon name="tabler:user" color="black" />
          </div>
          <div class="flex flex-col">
            <h1 class="text-3xl font-bold">{{ username }}</h1>
            <h1>New York, USA</h1>
          </div>
        </div>
        <div>
          <div class="flex gap-5">
            <div>
              <label for="first-name">First Name</label>
              <input type="text" id="first-name" class="w-full px-2 py-2 border outline-none rounded-lg bg-none" />
            </div>
            <div>
              <label for="Last-name">Last Name</label>
              <input type="text" id="last-name" class="w-full px-2 py-2 border outline-none rounded-lg bg-none" />
            </div>
          </div>
          <div class="flex gap-5">
            <div>
              <label for="email">Email Address</label>
              <input type="text" id="email" class="w-full px-2 py-2 border outline-none rounded-lg bg-none" />
            </div>
            <div>
              <label for="phone">Phone Number</label>
              <input type="text" id="phone" class="w-full px-2 py-2 border outline-none rounded-lg bg-none" />
            </div>
          </div>
          <div>
            <div>
              <label for="address">Address</label>
              <textarea type="text" id="address" class="resize-y min-h-10 w-full px-2 py-2 border outline-none rounded-lg bg-none" />
            </div>
          </div>
          <div class="flex gap-5">
            <div>
              <label for="city">City</label>
              <input type="text" id="city" class="w-full px-2 py-2 border outline-none rounded-lg bg-none" />
            </div>
            <div>
              <label for="post-code">Postcode</label>
              <input type="text" id="post-code" class="w-full px-2 py-2 border outline-none rounded-lg bg-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex-col gap-5 h-[40rem] w-full justify-center items-center mt-28 my-10">
      <!-- <button @click="toggleModalLogin">Login</button> -->
      <!-- <h1 class="text-3xl font-bold text-gray-800">You are not logged in</h1> -->
      <div v-show="setLogin" class="absolute w-full h-[35rem] grid place-items-center">
        <ModalAuth :toggleModalLogin="toggleModalLogin" />
      </div>
    </div>
  </div>
</template>
