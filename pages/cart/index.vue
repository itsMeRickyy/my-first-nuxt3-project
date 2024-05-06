<script setup lang="ts">
import {useCartStore} from "~/stores/useCartStore";
// import {getUsername} from "../services/auth.service";
// import {useClient} from "@nuxt/app";

definePageMeta({
  middleware: ["auth"],
});

const cartStore = useCartStore();

const cart = computed(() => cartStore.cart);

const totalPrice = ref(0);
const totalPriceComputed = computed(() => {
  return cart.value.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
});

onMounted(async () => {
  const sum = cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalPrice.value = sum.toFixed(1);
});

const subQty = cartStore.subQty;
const addQty = cartStore.addQty;

const handleRemoveAll = cartStore.removeAll;
</script>

<template>
  <h1 class="text-3xl font-bold">Cart</h1>
  <div class="flex flex-col md:flex-row justify-between gap-5">
    <div class="bg-gray-200 dark:bg-slate-700 text-slate-200 min-w-[40%] w-full p-5 rounded-xl flex flex-col gap-4">
      <button v-show="cart.length > 0" @click="handleRemoveAll" class="top-2 right-2 w-8 h-8 rounded-full hover:bg-slate-300 grid place-items-center">
        <Icon name="tabler:x" color="black" />
      </button>
      <div v-if="cart.length > 0" v-for="product in cartStore.cart" :key="product.id">
        <div class="flex justify-between">
          <NuxtLink :to="/product/ + product.id" class="flex gap-2">
            <div class="w-24 h-24 p-7 overflow-hidden bg-white border rounded-lg flex justify-center items-center">
              <img :src="product.image" alt="" />
            </div>
            <h1 class="mt-3">{{ product.title.substring(0, 30) }}</h1>
          </NuxtLink>
          <div>
            <div class="flex flex-col items-end justify-between h-full">
              <p class="text-lg font-bold">${{ product.price }}</p>
              <div class="flex w-36 justify-between items-center rounded-full bg-slate-300 overflow-hidden">
                <button @click="subQty(product.id)" class="p-2 px-4">-</button>
                <h1>{{ product.quantity }}</h1>
                <button @click="addQty(product.id)" class="p-2 px-4">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col gap-5 h-full w-full justify-center items-center">
        <div class="text-slate-800 dark:text-slate-200">
          <h1 class="text-xl">Your cart is empty</h1>
          <p>Want something? Add it to your cart now!</p>
        </div>

        <NuxtLink to="/" class="bg-blue-700 text-white p-3 rounded-lg">Start Shopping</NuxtLink>
      </div>
    </div>
    <!-- total -->
    <div class="bg-gray-200 dark:bg-slate-700 w-full md:w-[45%] absolute left-0 right-2 bottom-10 md:relative rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div class="border-b py-2 mb-2 border-gray-400">
          <h1 class="md:text-xl font-bold text-gray-700 dark:text-slate-200">Shopping summary</h1>
        </div>
        <div class="border-b py-2 mb-2 border-gray-400">
          <h1 class="text-lg">Total ${{ totalPriceComputed.toFixed(1) }}</h1>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <button class="bg-green-500 w-full text-white p-2 rounded-lg">Save even more by using promos ></button>
        <button class="bg-blue-700 w-full text-white p-2 rounded-lg">Checkout {{ cart.length }}</button>
      </div>
    </div>
  </div>
</template>
