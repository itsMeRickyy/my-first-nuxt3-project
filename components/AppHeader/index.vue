<script setup></script>

<template>
  <div class="w-full h-16 flex justify-between items-center fixed top-0 left-0 z-40 bg-white border-b sm:px-5 md:px-10 lg:px-12 xl:px-40 2xl:px-[18rem]">
    <nuxtLink to="/" class="logo flex text-xl font-Pacifico">Catto</nuxtLink>
    <div class="hidden md:flex gap-5">
      <div class="hidden cursor-default group md:flex items-center gap-1 whitespace-nowrap text-ellipsis relative">
        <h1>Categories</h1>
        <div class="absolute hidden group-hover:flex items-start top-6 left-0 bg-gray-200 w-56 p-2 flex-col gap-3 rounded-xl">
          <button>Categories</button>
          <button>Men's Clothing</button>
          <button>Women's Clothing</button>
          <button>Electronics</button>
          <button>Jewelery</button>
        </div>
      </div>
      <button class="hidden md:flex">Deals</button>
      <button class="hidden lg:flex whitespace-nowrap">What's New</button>
      <button class="hidden lg:flex">Delivery</button>
    </div>
    <div class="flex gap-5">
      <div class="flex bg-slate-300 rounded-full px-4 py-1 overflow-hidden">
        <input class="placeholder:text-black placeholder:text-sm bg-transparent outline-none border-none w-44" placeholder="Search Product" type="text" />
        <button>search</button>
      </div>
      <div class="group relative">
        <nuxtLink to="/cart" class="text-xl bg-gray-200 rounded-lg p-2 grid place-items-center">
          <Icon name="tabler:shopping-cart" color="black" />
        </nuxtLink>
        <div class="absolute group-hover:flex hidden items-start p-2 top-9 -left-52">
          <div class="bg-gray-200 w-[22rem] p-2 flex-col gap-3 rounded-xl">
            <ModalCart />
          </div>
        </div>
      </div>
      <div class="group relative">
        <nuxtLink to="/user" class="text-xl bg-gray-200 rounded-lg p-2 grid place-items-center">
          <Icon name="tabler:user" color="black" />
        </nuxtLink>
        <div class="absolute hidden group-hover:flex items-start p-2 top-9 -left-24">
          <div class="bg-gray-200 w-56 p-2 flex-col gap-3 rounded-xl">
            <h1>Hii</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  font-family: Pacifico, cursive;
}
</style>
