import { atom } from "recoil";

export const userName = atom<string>({
  key: "userName",
  default: "",
});

export const userNameConfirmed = atom<boolean>({
  key: "userNameConfirmed",
  default: false,
});

export const userUuid = atom<string | undefined>({
  key: "userUuid",
  default: undefined,
});
