import { UserData } from "./user";

import { ROOM_STATUSES } from "../constants";

// types
import { ConstantsTypes } from "./utils";

interface RoomData {
  users: UserData[];
  host: string | undefined;
  isReady: boolean;
  status: RoomStatus | undefined;
  start: string | undefined;
  goal: string | undefined;
}

export type ImmutableRoomData = Readonly<RoomData>;
export type RoomStatus = ConstantsTypes<typeof ROOM_STATUSES>;
