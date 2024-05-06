<script setup>
import {useFavoritesStore} from "~/stores/useFavoritesStore";
definePageMeta({
  middleware: ["auth"],
});

const favoritesStore = useFavoritesStore();
</script>

<template>
  <div v-if="favoritesStore.favorites.length > 0">
    <h1>Favorites</h1>
    <div>
      <div class="flex px-2 md:px-0 flex-wrap gap-4 mt-10">
        <div v-for="product in favoritesStore.favorites" :key="product.id">
          <ProductsCard :product="product" />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center p-20 md:p-36">
    <h1 class="md:text-xl my-5">You have no favorites</h1>
    <NuxtLink to="/" class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg">See Products</NuxtLink>
  </div>
</template>
