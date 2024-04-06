import {defineStore} from "pinia";
import type {Product} from "~/type";

interface cartItem extends Product {
  quantity: number;
  decrease?: () => void;
  increase: () => void;
}

type CartStore = {
  cart: cartItem[];
  // count: () => number;
  add: (product: Product, quantity: number) => void;
  addQty: (id: number) => void;
  subQty: (id: number) => void;
  remove: (id: number) => void;
  removeAll: () => void;
  // setQuantity?: (id: number, quantity: number) => void;
  quantity?: number;
};

export const useCartStore = defineStore("cart", () => {
  const cart = ref<cartItem[]>([]);
  const router = useRouter();
  const loginStatus = ref(false);

  function addToCart(product: Product, quantity: number) {
    // const alert = useAlert();
    const isUserLoggedIn = localStorage.getItem("token");

    if (!isUserLoggedIn) {
      // router.push("/user");

      return;
    } else {
      const itemInCart = cart.value.find(item => item.id === product.id);
      if (itemInCart) {
        itemInCart.quantity += quantity;
      } else {
        const updatedCart = updatecart({...product}, cart.value, quantity);
        cart.value = updatedCart;
      }
    }
  }
  // function addToCart(product: Product, quantity: number) {
  //   // cart.value.push({ ...product, quantity });
  //   const itemInCart = cart.value.find(item => item.id === product.id);
  //   if (itemInCart) {
  //     itemInCart.quantity += quantity;
  //   } else {
  //     const updatedCart = updatecart({...product}, cart.value, quantity);
  //     cart.value = updatedCart;
  //   }
  // }

  function addQty(id: number) {
    const updatedCart = cart.value.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity + 1};
      } else {
        return item;
      }
    });
    cart.value = updatedCart;
  }

  function subQty(id: number) {
    const updatedCart = cart.value.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity - 1 < 1 ? 1 : item.quantity - 1};
      } else {
        return item;
      }
    });
    cart.value = updatedCart;
  }

  function removeItem(id: number) {
    const updatedCart = cart.value.filter(item => item.id !== id);
    cart.value = updatedCart;
  }

  function removeAll() {
    cart.value = [];
  }

  return {
    cart,
    addToCart,
    addQty,
    subQty,
    removeItem,
    removeAll,
  };
});

function updatecart(product: Product, cart: cartItem[], quantity: number) {
  const cartItem = {...product, quantity: quantity} as cartItem;
  const productOnCart = cart.map(item => item.id).includes(product.id);

  if (!productOnCart) cart.push(cartItem);
  else {
    return cart.map(item => {
      if (item.id === product.id) {
        return {...item, quantity: item.quantity + 1};
      } else {
        return item;
      }
    });
  }
  return cart;
}

function isUserLoggedIn() {
  return !!localStorage.getItem("token");
}
