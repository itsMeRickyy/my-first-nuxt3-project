<script setup lang="ts">
import {ref} from "vue";

const setLogin = ref(true);

const toggleModalLogin = () => {
  setLogin.value = !setLogin.value;
};
</script>

<template>
  <div class="w-full h grid place-items-center px-36 py-16">
    <ModalAuth :toggleModalLogin="toggleModalLogin" />
  </div>
</template>
