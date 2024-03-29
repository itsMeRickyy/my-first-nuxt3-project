<script setup lang="ts">
import {useCartStore} from "#imports";
import {useFavoritesStore} from "#imports";
import type {Product} from "~/type";
import {useProductsStore} from "#imports";

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
</script>

<template>
  <div class="flex flex-wrap gap-4 justify-between mt-16">
    <div v-for="product in products" :key="product.id">
      <ProductsCard :product="product" :handleAddToFavorites="handleAddToFavorites" :handleAddToCart="handleAddToCart" :isFavorite="isFavorite" />
    </div>
  </div>
</template>
