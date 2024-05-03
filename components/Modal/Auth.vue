<script setup lang="ts">
const props = defineProps({
  toggleModalLogin: {
    type: Function,
    required: true,
  },
});

const setLogin = ref(false);
const toggleLogin = () => {
  setLogin.value = !setLogin.value;
};
</script>

<template>
  <div class="bg-gray-200 flex flex-col justify-between h-[35rem] w-[20rem] rounded-2xl relative overflow-hidden p-5">
    <h1>Login</h1>
    <button @click="toggleModalLogin" class="absolute top-2 right-2 w-8 h-8 rounded-full hover:bg-slate-300 grid place-items-center">
      <Icon name="tabler:x" color="black" />
    </button>
    <div>
      <div v-show="!setLogin">
        <AuthLogin />
      </div>
      <div v-show="setLogin"><AuthRegister /></div>
    </div>
    <div class="">
      <h1 class="text-sm">Don't have an account?</h1>
      <button @click="toggleLogin" class="w-full px-2 py-2 border outline-none rounded-lg bg-blue-700 text-white">Register</button>
    </div>
  </div>
</template>
