import axios from "axios";

// types
import { UserData, UserObj } from "../types/user";

import { cloudrunUrl } from "../conf";

export const createRoom = async (
  uuid: string,
  name: string
): Promise<number | undefined> => {
  try {
    const url = `${cloudrunUrl}/room`;
    const res = await axios.post<{ room_id: number }>(url, {
      uuid,
      name,
    });
    return res.data.room_id;
  } catch {
    console.error("error occurred in createRoom().");
  }
};

export const arrangeUsers = (usersObj: UserObj | null): UserData[] => {
  if (!usersObj) return [];
  const arrangedUsers: UserData[] = Object.entries(usersObj).map(
    ([uuid, { name, isDone, isSurrendered }]) => ({
      uuid,
      name,
      isDone,
      isSurrendered,
    })
  );
  return arrangedUsers;
};

export const joinRoom = async (
  roomId: number,
  uuid: string,
  name: string
): Promise<number | undefined> => {
  try {
    const url = `${cloudrunUrl}/room/join`;
    const res = await axios.post<{ room_id: number }>(url, {
      room_id: roomId,
      uuid,
      name,
    });
    return res.data.room_id;
  } catch {
    console.error("error occurred in joinRoom().");
  }
};

export const setStartOrGoalArticle = async (
  roomId: number,
  articleUrl: string,
  startOrGoal: "start" | "goal"
): Promise<void> => {
  const url = `${cloudrunUrl}/room/articles`;
  try {
    await axios.post<{
      roomId: number;
      target: string;
      url: string;
    }>(url, {
      room_id: roomId,
      target: startOrGoal,
      url: articleUrl,
    });
  } catch {
    console.error("error occurred in setStartOrGoalArticle.");
  }
};

export const startRoom = async (
  uuid: string,
  roomId: number
): Promise<void> => {
  const url = `${cloudrunUrl}/room/start`;
  try {
    await axios.post<void>(url, {
      uuid: uuid,
      room_id: roomId,
    });
  } catch {
    console.error("error in startRoom.");
  }
};

export const done = async (
  roomId: number,
  uuid: string,
  isDone: boolean,
  isSurrendered: boolean,
  urls?: string[],
  name?: string
): Promise<void> => {
  const url = `${cloudrunUrl}/room/player-progress`;
  try {
    await axios.post<void>(url, {
      room_id: roomId,
      urls,
      uuid,
      name,
      is_done: isDone,
      is_surrendered: isSurrendered,
    });
  } catch {
    console.error("error in done.");
  }
};

export const destroy = async (roomId: number, uuid: string): Promise<void> => {
  const url = `${cloudrunUrl}/room`;
  try {
    await axios.delete<void>(url, {
      data: {
        room_id: roomId,
        uuid,
      },
    });
  } catch {
    console.error("error in destroy.");
  }
};
