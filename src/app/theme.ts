import { useCookies } from "react-cookie";

export enum Theme {
  Light = "l",
  Dark = "d",
  System = "s",
}

export function useThemeState(): [Theme, (x: Theme) => void] {
  const [cookies, setCookies] = useCookies(["theme"]);
  return [
    cookies.theme ? cookies.theme : Theme.System,
    (x) => setCookies("theme", x),
  ];
}

export const invert = (x: Theme): Theme =>
  (x == Theme.System ? invert(system()) : x == Theme.Dark)
    ? Theme.Light
    : Theme.Dark;
export const system = () =>
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? Theme.Dark
      : Theme.Light
    : Theme.Light;
export const light = (x: Theme): boolean =>
  x == Theme.System ? light(system()) : x == Theme.Light;
