import { Colors } from "./styles";

export const getButtonColor = (screen: string, currentRoute?: string) => {
  return currentRoute === screen ? "#777" : Colors.MAIN;
};

export const getIconColor = (
  screen: string | string[],
  currentRoute?: string
) => {
  if (Array.isArray(screen)) {
    return [...screen].includes(currentRoute!) ? "#fff" : "#ffffff63";
  }
  return currentRoute === screen ? "#fff" : "#ffffff63";
};

export const getAvatarBorderColor = (
  screen: string | string[],
  currentRoute?: string
) => {
  if (Array.isArray(screen)) {
    return [...screen].includes(currentRoute!) ? "#3c3c3c" : "transparent";
  }
  return currentRoute === screen ? "#3c3c3c" : "transparent";
};
