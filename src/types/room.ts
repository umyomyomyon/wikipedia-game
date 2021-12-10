import { UserData } from "./user";

export interface RoomData {
  users: UserData[];
  isReady: boolean;
  start: string | undefined;
  goal: string | undefined;
}
