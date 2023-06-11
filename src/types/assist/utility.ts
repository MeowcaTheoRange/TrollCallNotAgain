import { CookieSetOptions } from "universal-cookie";

export function GiveUserCookies(
  setCookie: (
    name: string,
    value: any,
    options?: CookieSetOptions | undefined
  ) => void,
  name: string,
  code: string
) {
  setCookie("TROLLCALL_NAME", name, {
    expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    path: "/",
  });
  setCookie("TROLLCALL_CODE", code, {
    expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    path: "/",
  });
}

export function RemoveUserCookies(
  removeCookie: (name: string, options?: CookieSetOptions | undefined) => void
) {
  removeCookie("TROLLCALL_NAME", {
    path: "/",
  });
  removeCookie("TROLLCALL_CODE", {
    path: "/",
  });
}
