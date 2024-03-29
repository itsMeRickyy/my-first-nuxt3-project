<script setup>
import {useCartStore} from "~/stores/useCartStore";
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
</script>

<template>
  <h1 class="text-3xl font-bold">Cart</h1>
  <div class="flex justify-between">
    <div class="bg-gray-200 p-5 rounded-xl flex flex-col gap-4">
      <div v-for="product in cartStore.cart" :key="product.id">
        <div class="flex justify-between">
          <div class="flex gap-2">
            <div class="w-24 h-24 p-7 overflow-hidden bg-white border rounded-lg flex justify-center items-center">
              <img :src="product.image" alt="" />
            </div>
            <h1 class="mt-3">{{ product.title.substring(0, 30) }}</h1>
          </div>
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
    </div>
    <div class="bg-gray-200 w-[40%] rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div class="border-b py-2 mb-2 border-gray-400">
          <h1 class="text-xl font-bold text-gray-700">Shopping summary</h1>
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
