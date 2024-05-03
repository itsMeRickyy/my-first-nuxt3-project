<script setup lang="ts">
const handleLogout = async () => {
  try {
    await logout(); // Call the logout action from the store
    router.push("/");
  } catch (error) {
    console.error("Logout error:", error);
    // Handle logout error (optional: display error message to user)
  }
};
</script>

<template>
  <div class="font-poppins min-h-screen sm:px-5 md:px-12 lg:px-12 xl:px-40 2xl:px-[18rem] relative">
    <AppHeader />
    <!-- sidebar -->
    <div>
      <div>
        <div class="flex flex-col gap-5 bg-green-200 p-5 min-w-[10rem] w-[30%]">
          <h1 class="text-lg font-bold text-gray-700">User Profile</h1>
          <div class="flex flex-col items-start justify-start gap-5">
            <button>User Info</button>
            <button>Favorites</button>
            <button>Orders</button>
            <button>Addressesss</button>
            <button>Setting</button>
            <button @click="handleLogout">Sign Out</button>
          </div>
        </div>
      </div>
      <div class="mt-16">
        <slot />
      </div>
    </div>
    <div class="bottom-0">
      <AppFooter />
    </div>
  </div>
</template>
