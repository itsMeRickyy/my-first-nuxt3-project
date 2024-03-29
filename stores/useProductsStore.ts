import {defineStore} from "pinia";
import type {Product} from "~/type";

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);

  async function getProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      products.value = data;
      console.log("Data is fetched.");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  getProducts();

  //   onMounted(() => {
  //     getProducts();
  //   });

  return {
    products,
    getProducts,
  };
});
