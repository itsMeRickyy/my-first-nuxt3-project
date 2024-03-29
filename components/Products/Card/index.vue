<script setup>
import {useFavoritesStore} from "~/stores/useFavoritesStore";

const favoritesStore = useFavoritesStore();

const isFavorite = product => {
  return favoritesStore.isFavorite(product);
};

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  handleAddToFavorites: {
    type: Function,
    required: true,
  },
  handleAddToCart: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="w-48 h-64 md:w-48 md:h-72 flex flex-col rounded-xl shadow-md relative overflow-hidden">
    <div class="absolute top-5 right-5 z-10 bg-gray-200 rounded-full grid place-items-center p-2">
      <icon v-if="isFavorite(props.product)" @click="handleAddToFavorites(props.product)" name="tabler:heart-filled" :color="isFavorite(props.product) ? '#d8556f' : 'black'" class="h-4 w-4" />
      <icon v-else @click="handleAddToFavorites(props.product)" name="tabler:heart" class="h-4 w-4" />
    </div>
    <NuxtLink :to="/product/ + props.product.id" class="p-14 w-48 h-48 bg-white overflow-hidden relative">
      <img class="hover:scale-125 transition-all ease-in-out duration-300" :src="props.product.image" />
    </NuxtLink>
    <div class="flex flex-col justify-between h-20 px-3">
      <div class="flex flex-col">
        <h1 class="text-sm font-normal line-clamp-1">{{ props.product.title.substring(0, 30) }}...</h1>
        <div class="flex text-sm items-center gap-1">
          <icon name="tabler:star-filled" class="text-yellow-500 h-4 w-4" />
          <p>{{ props.product.rating.rate }}</p>
        </div>
      </div>

      <div class="flex justify-between">
        <p class="whitespace-nowrap font-bold">$ {{ props.product.price }}</p>
        <button @click="handleAddToCart(props.product)" class="px-2 py-2 border border-slate-800 rounded-lg grid place-items-center">
          <icon name="tabler:shopping-cart-plus" class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>
