/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";
import { localStorageNames, NO_ONE, UNDEFINED } from "@/lib/constantsValues";

type Props = {
  sniperShotSelectRef: React.RefObject<HTMLSelectElement | null>;
};

export default function Form({ sniperShotSelectRef }: Props) {
  const playersInfo = useSelector((state: RootState) => state.players.value);
  const unParsedSniperShotsNumber =
    typeof window !== UNDEFINED
      ? localStorage.getItem(localStorageNames.sniperShots) || ""
      : "";
  const sniperShotsNumber = parseInt(unParsedSniperShotsNumber);

  return (
    <>
      <div
        aria-label="sniper-shot"
        className="
        sm:mb-8
        mb-6
        "
      >
        <p
          className="
          text-gray-100
          lg:mb-2 lg:text-base
          mb-1 text-sm
          "
        >
          حرفه ای را بیدار کنید
        </p>
        {sniperShotsNumber < 2 ? (
          // sniper has still bullets to shot
          <>
            <div aria-label="container-for-label" className="mb-3">
              <label
                htmlFor="sniperShot"
                className="
                text-gray-100
                lg:text-base
                text-sm
                "
              >
                اگر حرفه ای قصد شلیک دارد،هدف شلیک او را مشخص کنید
              </label>
              <p
                className="text-gray-300 mt-1
                lg:text-base
                text-sm"
              >
                (حرفه ای فقط دو گلوله برای شلیک دارد)
              </p>
            </div>
            <select
              id="sniperShot"
              ref={sniperShotSelectRef}
              className="rounded bg-gray-50 border-gray-200 
              lg:px-10 lg:py-3 lg:mb-5
              sm:text-base sm:px-8 sm:border-2
              text-sm px-6 py-2 mb-3 border-1 
              "
            >
              <option>{NO_ONE}</option>
              {playersInfo.map((item, index) => (
                <option key={index}>{item.name}</option>
              ))}
            </select>
          </>
        ) : (
          // sniper has no more bullets to shot
          <p
            className="
            text-gray-100
            lg:text-base
            text-sm
            "
          >
            حرفه ای امکان شلیک ندارد !
          </p>
        )}
      </div>
    </>
  );
}
