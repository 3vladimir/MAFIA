/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";

type Props = {
  mafiaShotSelectRef: React.RefObject<HTMLSelectElement | null>;
};

export default function Form({ mafiaShotSelectRef }: Props) {
  const playersInfo = useSelector((state: RootState) => state.players.value);

  return (
    <>
      <div
        aria-label="mafiaTeam-shot"
        className="
        sm:mb-8
        mb-6
        "
      >
        <div aria-label="container-for-label" className="mb-3">
          <label
            htmlFor="mafiaShot"
            className="
            text-gray-100
            lg:text-base
            text-sm
            "
          >
            هدف شلیک پدرخوانده را مشخص کنید
          </label>
        </div>
        <select
          id="mafiaShot"
          ref={mafiaShotSelectRef}
          className="rounded bg-gray-50 border-gray-200 
          lg:px-10 lg:py-3 lg:mb-5
          sm:text-base sm:px-8 sm:border-2
          text-sm px-6 py-2 mb-3 border-1 
          "
        >
          {playersInfo.map((item, index) => (
            <option key={index}>{item.name}</option>
          ))}
        </select>
      </div>
    </>
  );
}
