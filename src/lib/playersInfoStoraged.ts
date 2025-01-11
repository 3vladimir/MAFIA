"use client";
import { localStorageNames, UNDEFINED } from "@/lib/constantsValues";

const playersStoredInfo =
  typeof window !== UNDEFINED
    ? localStorage.getItem(localStorageNames.playersInfo)
    : null;

export const playersInfo = playersStoredInfo
  ? JSON.parse(playersStoredInfo)
  : [];
