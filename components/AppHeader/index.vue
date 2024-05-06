<script setup lang="ts">
import {useAuth} from "#imports";
import {useCartStore} from "#imports";
import {useDarkMode} from "~/stores/useDarkMode";
const router = useRouter();
const category = useRoute().params.category;

const authStore = useAuth();
const cartStore = useCartStore();

const navigateToCategory = (newCategory: any) => {
  router.push(`/category/${newCategory}`); // Dynamically create route
};
const categories = ["Men's Clothing", "Women's Clothing", "Electronics", "Jewelery"];

const searchTerm = ref("");

const handleSearch = () => {
  if (searchTerm.value !== "") {
    router.push(`/search/${searchTerm.value}`);
  }

  searchTerm.value = "";
};

const {isDark, toggleDarkMode} = useDarkMode();

type Theme = "light" | "dark";

const setColorTheme = (theme: Theme) => {
  useColorMode().preference = theme;
};
</script>

<template>
  <div class="w-full h-16 flex justify-between items-center fixed top-0 left-0 z-40 border-b px-2 bg-white dark:bg-slate-800">
    <nuxtLink to="/" class="logo hidden md:flex text-xl font-Pacifico">Classico</nuxtLink>
    <nuxtLink to="/" class="text-xl md:hidden bg-gray-200 hover:bg-gray-300 rounded-lg p-2 mr-2 grid place-items-center">
      <Icon name="tabler:home" color="black" />
    </nuxtLink>
    <div class="hidden md:flex gap-5">
      <div class="hidden cursor-default group md:flex items-center gap-1 whitespace-nowrap text-ellipsis relative">
        <h1>Categories</h1>
        <div class="absolute hidden group-hover:flex items-start top-6 left-0 bg-gray-200 w-56 p-2 flex-col gap-3 rounded-xl">
          <button @click="navigateToCategory(category)" class="hover:text-gray-500" v-for="category in categories" :key="category">{{ category }}</button>
        </div>
      </div>
      <button class="hidden md:flex hover:text-gray-500">Deals</button>
      <button class="hidden lg:flex hover:text-gray-500 whitespace-nowrap">What's New</button>
      <button class="hidden lg:flex hover:text-gray-500">Delivery</button>
    </div>
    <div class="flex gap-5 h-16 items-center">
      <div class="search-container relative flex gap-1 items-center focus-within:border focus-within:border-gray-500 rounded-md bg-white p-1">
        <Icon class="h-5 w-5" name="tabler:search" color="black" />
        <input type="text" @keyup.enter="handleSearch" v-model="searchTerm" class="search-input w-full focus:outline-none placeholder:text-gray-400" placeholder="Search..." />
      </div>
      <div class="relative flex items-center p-1">
        <button class="ml-5" @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')">
          <svg v-if="$colorMode.value == 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-50" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="group relative">
        <div v-if="cartStore.cart.length" class="absolute bg-blue-300 w-4 h-4 text-xs right-0 rounded-lg grid place-items-center">
          <h1>{{ cartStore.cart.length }}</h1>
        </div>
        <nuxtLink to="/cart" class="text-xl bg-gray-200 hover:bg-gray-300 rounded-lg p-2 grid place-items-center">
          <Icon name="tabler:shopping-cart" color="black" />
        </nuxtLink>
        <div class="absolute hidden lg:group-hover:flex items-start p-2 top-9 -left-52">
          <div class="bg-gray-200 w-[22rem] p-2 flex-col gap-3 rounded-xl">
            <ModalCart />
          </div>
        </div>
      </div>
      <div class="group relative">
        <nuxtLink to="/favorites" class="text-xl bg-gray-200 hover:bg-gray-300 rounded-lg p-2 grid place-items-center">
          <Icon name="tabler:heart" color="black" />
        </nuxtLink>
      </div>
      <!-- <button @click="setColorTheme('dark' ? 'light' : 'dark')">darkMode</button> -->
      <!-- <div :class="{dark: isDark}">
        <button @click="toggleDarkMode">Toggle Dark Mode</button>
      </div> -->

      <div class="group relative">
        <nuxtLink to="/user/settings" class="text-xl bg-gray-200 hover:bg-gray-300 rounded-lg p-2 grid place-items-center">
          <Icon name="tabler:user" color="black" />
        </nuxtLink>
        <div class="absolute hidden lg:group-hover:flex items-start p-2 top-9 right-0">
          <div class="bg-gray-200 w-56 p-2 flex-col gap-3 rounded-xl">
            <h1>Hii {{ authStore.username }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  font-family: Pacifico, cursive;
}
</style>
