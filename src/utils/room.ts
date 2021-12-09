import axios from "axios";

// types
import { UserData } from "../types/user";

export const createRoom = async (
  uuid: string,
  name: string,
  url: string
): Promise<number | undefined> => {
  try {
    const res = await axios.post<{ room_id: number }>(url, {
      uuid,
      name,
    });
    return res.data.room_id;
  } catch {
    console.error("error occurred in createRoom().");
  }
};

export const arrangeUsers = (
  usersObj: { [uuid: string]: string } | null
): UserData[] => {
  if (!usersObj) return [];
  const arrangedUsers: UserData[] = Object.entries(usersObj).map(
    ([uuid, name]) => ({
      uuid,
      name,
    })
  );
  return arrangedUsers;
};

export const joinRoom = (roomId: number) => {
  console.log(roomId);
};
