import {useColorMode} from "@nuxtjs/color-mode";

export function useDarkMode() {
  const {preference, setPreference} = useColorMode();

  const toggleDarkMode = () => {
    setPreference(preference === "light" ? "dark" : "light");
  };

  return {isDark: preference === "dark", toggleDarkMode};
}
