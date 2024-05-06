<script setup lang="ts">
import {useFavoritesStore} from "~/stores/useFavoritesStore";
import {useCartStore} from "~/stores/useCartStore";
import type {Product} from "~/type";
import {useProductsStore} from "~/stores/useProductsStore";
const router = useRouter();

const productsStore = useProductsStore();
// await useAsyncData("products", () => productsStore.getProducts());
const products = computed(() => productsStore.products);

const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

const handleAddToCart = (product: Product) => {
  cartStore.addToCart(product, 1);
};

const handleAddToFavorites = (product: Product) => {
  favoritesStore.addToFavorites(product);
};

const isFavorite = (product: Product) => {
  return favoritesStore.isFavorite(product);
};

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="w-44 h-60 md:w-48 md:h-72 flex flex-col rounded-xl shadow-md relative overflow-hidden items-center bg-white dark:bg-slate-700">
    <div class="absolute top-2 right-2 md:top-5 md:right-5 z-10 bg-gray-200 rounded-full grid place-items-center p-2 dark:text-black">
      <icon v-if="isFavorite(props.product)" @click="handleAddToFavorites(props.product)" name="tabler:heart-filled" :color="isFavorite(props.product) ? '#d8556f' : 'black'" class="h-4 w-4" />
      <icon v-else @click="handleAddToFavorites(product)" name="tabler:heart" class="h-4 w-4" />
    </div>
    <div class="bg-white px-12 overflow-hidden h-[85%] grid place-items-center">
      <NuxtLink :to="/product/ + props.product.id" class="p-7 w-28 h-28 md:p-14 md:w-48 md:h-48overflow-hidden relative">
        <img class="hover:scale-125 transition-all ease-in-out duration-300" :src="props.product.image" />
      </NuxtLink>
    </div>
    <div class="flex flex-col justify-between h-20 px-3">
      <div class="flex flex-col">
        <h1 class="text-sm font-normal line-clamp-1">{{ props.product.title.substring(0, 30) }}...</h1>
        <div class="flex text-sm items-center gap-1">
          <icon name="tabler:star-filled" class="text-yellow-500 h-4 w-4" />
          <p>{{ props.product.rating.rate }}</p>
        </div>
      </div>

      <div class="flex justify-between mb-2">
        <p class="whitespace-nowrap font-bold">$ {{ props.product.price }}</p>
      </div>
    </div>
  </div>
</template>
