<script setup lang="ts">
import {computed} from "vue";
import type {Product} from "~/type";
import {useCartStore} from "~/stores/useCartStore";
import {useRoute} from "vue-router";
import {ref, onMounted} from "vue";
import {useFavoritesStore} from "#imports";

const favoritesStore = useFavoritesStore();

const {id} = useRoute().params;
const detailProduct = ref<Product | null>(null);
let rate = ref(null);
let rateCount = ref(null);
let description = ref(null);
const cartStore = useCartStore();
const isLoading = ref(true);

const fetchProduct = async () => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    detailProduct.value = await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    // Handle the error gracefully, e.g., display an error message
  }
};

const product = computed(() => {
  return (
    detailProduct.value || {
      id: 0,
      title: "",
      image: "",
      price: 0,
      category: "",
      description: "",
      quantity: 0,
      rating: {
        rate: 0,
        count: 0,
      },
      handleAddToCart: () => {},
      // isFavorite: favoritesStore.isFavorite(product.value),
    }
  );
});

onMounted(async () => {
  await fetchProduct();
  isLoading.value = false;
});

const qty = ref(1);
const readMore = ref(false);

const addQty = () => {
  qty.value++;
};

const subQty = () => {
  if (qty.value > 1) {
    qty.value--;
  }
};

const isUserLoggedIn = localStorage.getItem("token");
const loginStatus = ref(false);

const handleAddToCart = (product: Product) => {
  if (!isUserLoggedIn) {
    loginStatus.value = true;
    return;
  } else {
    cartStore.addToCart(product, qty.value);
  }
};

// const handleAddToCart = (product: Product) => {
//   cartStore.addToCart(product, qty.value);
//   console.log(product, qty.value);
// };

const handleAddToFavorites = (product: Product) => {
  if (!isUserLoggedIn) {
    loginStatus.value = true;
    return;
  } else {
    favoritesStore.addToFavorites(product);
  }
};

const isFavorite = (product: Product) => {
  return favoritesStore.isFavorite(product);
};

const toggleReadMore = () => {
  readMore.value = !readMore.value;
};

const setLogin = ref(false);

const toggleModalLogin = () => {
  loginStatus.value = !loginStatus.value;
};
</script>

<template>
  <div v-if="loginStatus" class="bg-gray-600 bg-opacity-50 right-0 left-0 top-0 bottom-0 grid place-items-center absolute">
    <div>
      <ModalAuth :toggleModalLogin="toggleModalLogin" />
    </div>
  </div>
  <div v-if="product" class="flex pt-10 h-screen">
    <div class="flex flex-col gap-10 w-[50%]">
      <div class="w-[28rem] h-[28rem] p-32 overflow-hidden bg-white rounded-lg shadow-xl flex items-center">
        <img class="hover:scale-125 transition-all ease-in-out duration-300" :src="product.image" alt="" />
      </div>
      <div class="flex h-36 gap-x-5">
        <div class="w-24 h-24 overflow-hidden p-6 flex items-center bg-white rounded-lg shadow-xl">
          <img :src="product.image" alt="" />
        </div>
        <div class="w-24 h-24 overflow-hidden p-6 flex items-center bg-white rounded-lg shadow-xl">
          <img :src="product.image" alt="" />
        </div>
        <div class="w-24 h-24 overflow-hidden p-6 flex items-center bg-white rounded-lg shadow-xl">
          <img :src="product.image" alt="" />
        </div>
        <div class="w-24 h-24 overflow-hidden p-6 flex items-center bg-white rounded-lg shadow-xl">
          <img :src="product.image" alt="" />
        </div>
      </div>
    </div>
    <div class="flex flex-col w-[50%] px-10">
      <div class="flex flex-col border-b pb-5">
        <h1 class="text-3xl font-bold">{{ product.title }}</h1>

        <p @click="toggleReadMore" class="cursor-default" v-if="!readMore">
          {{ product.description ? (typeof product.description === "string" ? (product.description.length > 100 ? product.description.substring(0, 100) + "..." : product.description) : "") : "" }}
        </p>
        <p @click="toggleReadMore" class="cursor-default" v-if="readMore">{{ product.description }}</p>
        <button class="text-slate-500 text-sm" @click="toggleReadMore">{{ readMore ? "See Less" : "See More" }}</button>
        <div class="flex items-center gap-2">
          <icon name="tabler:star-filled" class="text-yellow-500 h-4 w-4" />
          <h1>{{ product.rating.rate }}({{ product.rating.count }})</h1>
        </div>
      </div>
      <div class="py-10 flex flex-col gap-5">
        <h1 class="text-3xl font-bold">${{ product.price }}</h1>
        <div class="flex justify-between">
          <div class="flex w-36 justify-between items-center rounded-full bg-slate-300 overflow-hidden">
            <button @click="subQty" class="p-2 px-4">-</button>
            <h1>{{ qty }}</h1>
            <button @click="addQty" class="p-2 px-4">+</button>
          </div>
          <div>
            <div class="z-10 bg-gray-200 rounded-full grid place-items-center p-2">
              <icon v-if="isFavorite(product)" @click="handleAddToFavorites(product)" name="tabler:heart-filled" :color="isFavorite(product) ? '#d8556f' : 'black'" class="h-6 w-6" />
              <icon v-else @click="handleAddToFavorites(product)" name="tabler:heart" class="h-6 w-6" />
            </div>
          </div>
        </div>
        <div class="flex gap-5">
          <button @click="handleAddToCart(product)" class="w-full bg-blue-700 text-white p-3 rounded-lg">+ Add to Cart</button>
          <button class="w-full border-2 border-blue-700 text-blue-700 p-3 rounded-lg">Buy Now</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    Loading...
    <!-- Optionally, you can show a loading indicator -->
  </div>
</template>
