import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { rtdb } from "../firebaseConfig";
import { onDisconnect, onValue, ref } from "@firebase/database";

// atoms
import {
  userName as userNameAtom,
  userUuid as userUuidAtom,
} from "../recoil/atoms/user";
import { roomId as roomIdAtom } from "../recoil/atoms/room";

import { createRoom, arrangeUsers } from "../utils/room";
import { UserData } from "../types/user";

const useCreateRoom = (open: boolean): void => {
  const setRoomId = useSetRecoilState(roomIdAtom);
  const userUuid = useRecoilValue(userUuidAtom);
  const userName = useRecoilValue(userNameAtom);

  useEffect(() => {
    if (!open) return;
    if (!userUuid) return;

    createRoom(userUuid, userName).then((result) => {
      setRoomId(result);
    });
  }, [open]);
};

const useRoomUsers = (
  open: boolean,
  roomId: number | undefined
): UserData[] => {
  const [users, setUsers] = useState<UserData[]>([]);
  const userUuid = useRecoilValue(userUuidAtom);

  useEffect(() => {
    if (!userUuid && (!open || !roomId)) return;
    const roomRef = ref(rtdb, `${roomId}/`);
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arrangedUsers = arrangeUsers(data.users);
        setUsers(arrangedUsers);
      }
    });

    const userRef = ref(rtdb, `${roomId}/users/${userUuid}`);
    onDisconnect(userRef).remove();
  }, [open, roomId]);

  return users;
};

export { useCreateRoom, useRoomUsers };
