<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useRoute} from "nuxt/app";
import type {Product} from "../../type";
import {useProductsStore} from "../../stores/useProductsStore";

const productsStore = useProductsStore();
// const products = computed(() => productsStore.products);
const category = useRoute().params.id;

const products = ref<Product[]>([]);

const fetchProductByCategory = async () => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/category/${useRoute().params.id.toLowerCase()}`);
    const data = await response.json();
    products.value = data;
    console.log("products is fetched", products.value);
  } catch (error) {
    console.error("Error fetching product:", error);
    // Handle the error gracefully, e.g., display an error message
  }
};

fetchProductByCategory();
</script>

<template>
  <div>
    <!-- <h1 class="text-lg font-bold">{{ category }}</h1> -->
    <div class="flex flex-wrap gap-4 justify-between">
      <div v-for="product in products" :key="product.id">
        <ProductsCard :product="product" />
      </div>
    </div>
  </div>
</template>
