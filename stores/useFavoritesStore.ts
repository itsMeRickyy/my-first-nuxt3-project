import {defineStore} from "pinia";
import type {Product} from "~/type";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref<Product[]>([]);

  function addToFavorites(product: Product) {
    const itemInFavorites = favorites.value.find(item => item.id === product.id);
    if (itemInFavorites) {
      // If product already exists in favorites, remove it
      favorites.value = favorites.value.filter(item => item.id !== product.id);
    } else {
      // If not in favorites, add it
      favorites.value.push(product);
    }
  }

  function isFavorite(product: Product): boolean {
    return favorites.value.some(item => item.id === product.id);
  }

  return {
    favorites,
    addToFavorites,
    isFavorite,
  };
});
