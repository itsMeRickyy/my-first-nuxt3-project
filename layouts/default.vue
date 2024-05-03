<template>
  <div class="font-poppins min-h-screen sm:px-5 md:px-12 lg:px-12 xl:px-40 2xl:px-[18rem] relative">
    <AppHeader />
    <div class="mt-16">
      <slot />
    </div>
    <div class="bottom-0">
      <AppFooter />
    </div>
  </div>
</template>
