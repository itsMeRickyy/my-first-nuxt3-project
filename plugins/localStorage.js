export default defineNuxtPlugin(() => {
  return {
    provide: {
      useLocalStorage() {
        return {
          getItem(key) {
            if (process.client) {
              return localStorage.getItem(key);
            }
            return undefined;
          },
          setItem(key, value) {
            if (process.client) {
              localStorage.setItem(key, value);
              return true;
            }
            return false;
          },
          removeItem(key) {
            if (process.client) {
              localStorage.removeItem(key);
            }
          },
        };
      },
    },
  };
});
