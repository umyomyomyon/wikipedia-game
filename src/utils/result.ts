import { doc, getDoc } from "firebase/firestore";

import { fs } from "../firebaseConfig";

// types
import { Result } from "../types/result";

export const getResult = async (
  roomId: number
): Promise<Result | undefined> => {
  try {
    const docRef = doc(fs, "game-results", String(roomId));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      const result: Result = {
        createdAt: docData["createdAt"].toDate(),
        start: docData["start"],
        goal: docData["goal"],
        results: docData["results"],
      };
      return result;
    }
  } catch (e) {
    console.error("error occurred in getResult().");
    console.error(e);
  }
};
