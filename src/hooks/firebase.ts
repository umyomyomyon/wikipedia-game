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
import { RoomData, RoomStatus } from "../types/room";

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
  const [host, setHost] = useState<string | undefined>(undefined);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [status, setStatus] = useState<RoomStatus | undefined>(undefined);
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
        setHost(data.host);
        setIsReady(data.isReady);
        setStatus(data.status);
        setStart(data.start);
        setGoal(data.goal);
      }
    });

    const userRef = ref(rtdb, `${roomId}/users/${userUuid}`);
    onDisconnect(userRef).remove();
  }, [open, roomId]);

  return { users, host, isReady, status, start, goal };
};

export { useCreateRoom, useRoomData };
