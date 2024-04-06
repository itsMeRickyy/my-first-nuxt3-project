<script setup lang="ts">
import {useRoute} from "nuxt/app";
import {computed, onMounted, ref} from "vue";
// import types from {Product} from "../../type";
import {useProductsStore} from "../../stores/useProductsStore";

const searchTerm = useRoute().params.id;
const productsStore = useProductsStore();

const products = computed(() => productsStore.products);

const filteredProducts = computed(() => {
  if (searchTerm) {
    return products.value.filter((product: {title: string}) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  } else {
    return products.value;
  }
});
console.log(filteredProducts.value);

// const getProducts = () => {};
</script>

<template>
  <div class="text-3xl font-bold">Search {{ searchTerm }}</div>
  <div>
    <div class="flex flex-wrap gap-4">
      <div v-for="product in filteredProducts" :key="product.id">
        <ProductsCard :product="product" />
      </div>
    </div>
  </div>
</template>
