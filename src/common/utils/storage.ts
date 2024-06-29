import jsCookies from "js-cookie";

export const storage = {
  getDarkMode: (): boolean => {
    return jsCookies.get("dark-mode") === "true";
  },
  setDarkMode: (darkMode: string) => {
    jsCookies.set("dark-mode", darkMode, { expires: 90 });
  },
  getToken: (): string | undefined => {
    return jsCookies.get("token");
  },
  setToken: (token: string) => {
    jsCookies.set("token", token, { expires: 90 });
  },
  removeToken: () => {
    jsCookies.remove("token");
  },
};
