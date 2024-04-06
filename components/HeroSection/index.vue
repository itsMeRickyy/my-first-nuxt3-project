<script setup>
import {useProductsStore} from "~/stores/useProductsStore";
import {useSwiper} from "swiper/vue";

const productsStore = useProductsStore();
await useAsyncData("products", () => productsStore.getProducts());
const products = computed(() => productsStore.products);

const swiper = useSwiper();
const swiperRef = ref(null);

const prev = () => {
  swiperRef.slidePrev();
};
const next = () => {
  swiperRef.slideNext();
};

const slides = ref(
  Array.from({length: 10}, () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // Figure out contrast color for font
    const contrast = r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "black" : "white";

    return {bg: `rgb(${r}, ${g}, ${b})`, color: contrast};
  })
);
</script>

<template>
  <div class="bg-white my-4 overflow-hidden rounded-xl">
    <Swiper
      :ref="swiperRef"
      :height="300"
      :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination]"
      :slides-per-view="1"
      :loop="true"
      :effect="'creative'"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: true,
      }"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
      class="w-full">
      <!-- <SwiperSlide v-for="(slide, idx) in slides" :key="idx" :style="`background-color: ${slide.bg}; color: ${slide.color}`">
        {{ idx }}
      </SwiperSlide> -->
      <SwiperSlide>
        <div class="w-full h-full grid place-items-center rounded-xl overflow-hidden">
          <img src="/assets/images/banner1.jpg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="w-full h-full grid place-items-center rounded-xl overflow-hidden">
          <img src="/assets/images/banner2.jpg" alt="" />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
