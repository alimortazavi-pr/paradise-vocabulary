import jsCookies from "js-cookie";

//Types
import { IProfile } from "../interfaces";

export const storage = {
  getDarkMode: (): boolean => {
    return jsCookies.get("dark-mode") === "true";
  },
  setDarkMode: (darkMode: string) => {
    jsCookies.set("dark-mode", darkMode, { expires: 90 });
  },
  getUserAuthorization: (): string | undefined => {
    return jsCookies.get("userAuthorization");
  },
  setUserAuthorization: (token: string, user: IProfile) => {
    jsCookies.set(
      "userAuthorization",
      JSON.stringify({
        token: token,
        user: user,
      }),
      { expires: 90 }
    );
  },
  removeUserAuthorization: () => {
    jsCookies.remove("userAuthorization");
  },
};
