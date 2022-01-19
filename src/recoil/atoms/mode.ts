import { atom } from "recoil";

// types
import { SceneMode } from "../../types/mode";

// constants
import { SCENE_MODES } from "../../constants";

export const mode = atom<SceneMode>({
  key: "mode",
  default: SCENE_MODES.TOP,
});
