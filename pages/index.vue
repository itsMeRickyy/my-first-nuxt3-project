<script setup lang="ts">
import {useProductsStore} from "~/stores/useProductsStore";
import {useCartStore} from "~/stores/useCartStore";
import {useFavoritesStore} from "~/stores/useFavoritesStore";

const favoritesStore = useFavoritesStore();
const productStore = useProductsStore();

await useAsyncData("products", () => productStore.getProducts());
</script>

<template>
  <div class="flex flex-col">
    <HeroSection />
    <Products />
  </div>
</template>
