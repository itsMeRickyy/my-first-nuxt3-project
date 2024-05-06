<template>
  <div class="font-poppins dark:bg-slate-800 dark:text-slate-200 min-h-screen px-1 sm:px-5 md:px-12 lg:px-12 xl:px-40 2xl:px-[18rem] relative overflow-hidden">
    <AppHeader />
    <div class="mt-16">
      <slot />
    </div>
    <div class="bottom-0 hidden md:block">
      <AppFooter />
    </div>
  </div>
</template>
