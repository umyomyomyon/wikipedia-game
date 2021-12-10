import axios from "axios";

// types
import { UserData } from "../types/user";

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
  title: string,
  startOrGoal: "start" | "goal"
): Promise<void> => {
  const url = `${cloudrunUrl}/room/articles`;
  try {
    await axios.post<{
      roomId: number;
      target: string;
      url: string;
      title: string;
    }>(url, {
      room_id: roomId,
      target: startOrGoal,
      url: articleUrl,
      title,
    });
  } catch {
    console.log("error occurred in setStartOrGoalArticle.");
  }
};
