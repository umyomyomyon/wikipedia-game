import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { rtdb } from "../firebaseConfig";
import { getAuth } from "@firebase/auth";
import { onDisconnect, onValue, ref } from "@firebase/database";

import { userName as userNameAtom } from "../recoil/atoms/user";
import { createRoom, arrangeUsers } from "../utils/room";
import { cloudrunUrl } from "../conf";
import { UserData } from "../types/user";

const useCreateRoom = (open: boolean): number | undefined => {
  const [roomId, setRoomId] = useState<number | undefined>(undefined);
  const userName = useRecoilValue(userNameAtom);

  useEffect(() => {
    if (!open) return;
    const auth = getAuth();
    const uid = auth.currentUser ? auth.currentUser.uid : undefined;
    if (!uid) return;

    const url = `${cloudrunUrl}/room`;
    createRoom(uid, userName, url).then((result) => {
      setRoomId(result);
    });
  }, [open]);

  return roomId;
};

const useRoomUsers = (roomId: number | undefined): UserData[] => {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    if (!roomId) return;
    const auth = getAuth();
    const uid = auth.currentUser ? auth.currentUser.uid : undefined;
    if (!uid) return;
    const roomRef = ref(rtdb, `${roomId}/`);
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arrangedUsers = arrangeUsers(data.users);
        setUsers(arrangedUsers);
      }
    });

    const userRef = ref(rtdb, `${roomId}/users/${uid}`);
    onDisconnect(userRef).remove();
  }, [roomId]);

  return users;
};

export { useCreateRoom, useRoomUsers };
