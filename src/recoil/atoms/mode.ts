import { atom } from "recoil";

export const mode = atom<"top" | "game" | "result">({
  key: "mode",
  default: "top",
});
