import { UserData } from "./user";

export interface RoomData {
  users: UserData[];
  isReady: boolean;
  status: RoomStatus | undefined;
  start: string | undefined;
  goal: string | undefined;
}

export type RoomStatus = "PREPARATION" | "ONGOING" | "ENDED";
