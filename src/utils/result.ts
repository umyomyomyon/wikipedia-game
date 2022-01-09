import { doc, getDoc } from "firebase/firestore";

import { fs } from "../firebaseConfig";

// types
import { Result, UserResult } from "../types/result";

import { extractTitleFromURL } from "./validations";

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

export const makeUrlAndTitlesFromUrls = (
  start: string,
  goal: string,
  urls: string[]
): { url: string; title: string; isLastItem: boolean }[] => {
  const _urls = [start, ...urls, goal];
  const urlAndTitles = _urls.map((url, index) => ({
    url,
    title: extractTitleFromURL(url),
    isLastItem: index === _urls.length - 1,
  }));
  return urlAndTitles;
};

export const makeWinnerLength = (userResults: UserResult[]): number => {
  const resultLengths = userResults.map((result) => result.urls.length);
  const sorted = [...resultLengths.sort()];
  return sorted[0];
};
