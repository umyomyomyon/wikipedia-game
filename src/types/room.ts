import { UserData } from "./user";

interface RoomData {
  users: UserData[];
  host: string | undefined;
  isReady: boolean;
  status: RoomStatus | undefined;
  start: string | undefined;
  goal: string | undefined;
}

export type ImmutableRoomData = Readonly<RoomData>;

export type RoomStatus = "PREPARATION" | "ONGOING" | "ENDED";
