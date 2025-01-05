"use client";
import { localStorageNames } from "./constantsValues";

const playersStoredInfo =
  typeof window !== "undefined"
    ? localStorage.getItem(localStorageNames.playersInfo)
    : null;

export const playersInfo = playersStoredInfo ? JSON.parse(playersStoredInfo) : [];
