import { atom } from "recoil";

export const roomId = atom<number | undefined>({
  key: "roomId",
  default: undefined,
});
