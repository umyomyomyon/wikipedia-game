import { atom } from "recoil";

export const userName = atom<string>({
  key: "userName",
  default: "",
});

export const userNameConfirmed = atom<boolean>({
  key: "userNameConfirmed",
  default: false,
});
