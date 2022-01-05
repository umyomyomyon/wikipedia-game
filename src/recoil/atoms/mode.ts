import { atom } from "recoil";

export const mode = atom<"top" | "game">({
  key: "mode",
  default: "top",
});
