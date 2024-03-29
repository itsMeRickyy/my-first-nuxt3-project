<script setup>
import {useCartStore} from "~/stores/useCartStore";
const cartStore = useCartStore();
</script>

<template>
  <div>
    <div class="flex justify-between mb-2">
      <h1>Cart ({{ cartStore.cart.length }})</h1>
      <NuxtLink to="/cart">See</NuxtLink>
    </div>
    <div class="flex flex-col gap-2">
      <NuxtLink :to="/product/ + product.id" v-for="product in cartStore.cart" :key="product.id">
        <div class="flex gap-2 justify-between text-sm">
          <div class="flex gap-2">
            <div class="w-14 h-14 p-4 bg-white flex justify-center items-center rounded-lg overflow-hidden">
              <img :src="product.image" alt="" />
            </div>
            <h1>{{ product.title.substring(0, 20) }}...</h1>
          </div>
          <div>
            <p>{{ product.quantity }} x {{ product.price }}</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
