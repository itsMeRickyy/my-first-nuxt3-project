<script setup lang="ts">
import {useAuth} from "#imports";
const router = useRouter();
const category = useRoute().params.category;

const authStore = useAuth();

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
</script>

<template>
  <div class="w-full h-16 flex justify-between items-center fixed top-0 left-0 z-40 bg-white border-b px-2 sm:px-5 md:px-10 lg:px-12 xl:px-40 2xl:px-[18rem]">
    <nuxtLink to="/" class="logo hidden md:flex text-xl font-Pacifico">Classico</nuxtLink>
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
    <div class="flex gap-5">
      <div class="search-container relative flex gap-1 items-center focus-within:border focus-within:border-gray-500 rounded-md px-2">
        <Icon class="h-5 w-5" name="tabler:search" color="black" />
        <input type="text" @keyup.enter="handleSearch" v-model="searchTerm" class="search-input w-full focus:outline-none placeholder:text-gray-400" placeholder="Search..." />
      </div>
      <div class="group relative">
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
        <nuxtLink to="/user/settings" class="text-xl bg-gray-200 hover:bg-gray-300 rounded-lg p-2 grid place-items-center">
          <Icon name="tabler:user" color="black" />
        </nuxtLink>
        <div class="absolute hidden lg:group-hover:flex items-start p-2 top-9 -left-24">
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
