<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <div>
    <div class="flex justify-between pt-10 pb-36 border-t mt-10">
      <div class="flex gap-5">
        <div>
          <h1 class="font-bold">Company</h1>
          <h1>About</h1>
          <h1>Contact</h1>
          <h1>Help</h1>
        </div>
        <div>
          <h1 class="font-bold">Communities</h1>
          <h1>Advertising</h1>
          <h1>Business</h1>
          <h1>Developers</h1>
        </div>
      </div>
      <div class="flex gap-5">
        <div class="w-10 h-10 bg-slate-300 rounded-full grid place-items-center">
          <Icon name="tabler:brand-facebook" color="black" />
        </div>
        <div class="w-10 h-10 bg-slate-300 rounded-full grid place-items-center">
          <Icon name="tabler:brand-twitter" color="black" />
        </div>
        <div class="w-10 h-10 bg-slate-300 rounded-full grid place-items-center">
          <Icon name="tabler:brand-instagram" color="black" />
        </div>
      </div>
    </div>
    <hr />
    <p class="text-right py-3">© {{ year }} Classico</p>
  </div>
</template>
