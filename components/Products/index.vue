<script setup lang="ts">
import {useProductsStore} from "#imports";
const router = useRouter();

const productsStore = useProductsStore();
const products = computed(() => productsStore.products);

const categories = ["Men's Clothing", "Women's Clothing", "Electronics", "Jewelery"];

const navigateToCategory: (newCategory: string) => void = newCategory => {
  router.push(`/category/${newCategory}`);
};
</script>

<template>
  <div class="w-full rounded-xl shadow-lg p-5">
    <!-- <h1 class="font-bold text-xl my-5">Category</h1> -->
    <div class="flex gap-5">
      <button @click="navigateToCategory(category)" v-for="category in categories" :key="category" class="border p-2 rounded-xl text-sm">{{ category }}</button>
    </div>
  </div>
  <div class="flex flex-wrap gap-4 justify-between mt-10">
    <div v-for="product in products" :key="product.id">
      <ProductsCard :product="product" />
    </div>
  </div>
</template>
