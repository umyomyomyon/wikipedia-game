import { atom } from "recoil";

type SceneMode = "top" | "game" | "result";

export const mode = atom<SceneMode>({
  key: "mode",
  default: "top",
});
