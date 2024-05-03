<script setup lang="ts">
import {IconCaretDownFilled, IconUser, IconShoppingCart, IconMoon, IconSun, IconSearch, IconPawFilled} from "@tabler/icons-vue";
</script>

<template>
  <div class="w-full h-16 flex justify-between items-center">
    <RouterLink class="flex font-bold text-xl" to="/"><IconPawFilled />Catto</RouterLink>
    <div class="hidden md:flex gap-5">
      <div class="flex items-center gap-1 overflow-hidden whitespace-nowrap text-ellipsis">
        <h1>Categories</h1>
        <IconCaretDownFilled />
      </div>
      <button>Deals</button>
      <button class="whitespace-nowrap">What's New</button>
      <button>Delivery</button>
    </div>
    <div class="flex gap-5">
      <div class="flex bg-slate-300 rounded-full px-4 py-1 overflow-hidden">
        <input class="placeholder:text-black placeholder:text-sm bg-transparent outline-none border-none w-44" placeholder="Search Product" type="text" />
        <button>
          <IconSearch />
        </button>
      </div>
      <!-- <button @click="toggleDarkMode">
          <div v-if="darkMode == false">
            <IconMoon />
          </div>
          <div v-else>
            <IconSun />
          </div>
        </button> -->
      <RouterLink class="flex items-center gap-1"><IconUser /></RouterLink>
      <RouterLink class="flex items-center gap-1 relative">
        <div class="bg-red-500 text-white text-xs w-4 h-4 rounded-full flex justify-center items-center absolute -top-1 -right-1">{{ cartStore.cart.length }}</div>
        <IconShoppingCart />
      </RouterLink>
    </div>
  </div>
</template>
