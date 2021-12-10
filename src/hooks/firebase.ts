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

// types
import { UserData } from "../types/user";
import { RoomData } from "../types/room";

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

const useRoomData = (open: boolean, roomId: number | undefined): RoomData => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [start, setStart] = useState<string | undefined>(undefined);
  const [goal, setGoal] = useState<string | undefined>(undefined);
  const userUuid = useRecoilValue(userUuidAtom);

  useEffect(() => {
    if (!userUuid && (!open || !roomId)) return;
    const roomRef = ref(rtdb, `${roomId}/`);
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arrangedUsers = arrangeUsers(data.users);
        setUsers(arrangedUsers);
        setIsReady(data.isReady);
        setStart(data.start);
        setGoal(data.goal);
      }
    });

    const userRef = ref(rtdb, `${roomId}/users/${userUuid}`);
    onDisconnect(userRef).remove();
  }, [open, roomId]);

  return { users, isReady, start, goal };
};

export { useCreateRoom, useRoomData };
