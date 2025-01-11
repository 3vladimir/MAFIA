/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";
import { role, YES } from "@/lib/constantsValues";
import { localStorageNames, NO_ONE, UNDEFINED } from "@/lib/constantsValues";

type Props = {
  doctorSaveSelectRef: React.RefObject<HTMLSelectElement | null>;
};

export default function Form({ doctorSaveSelectRef }: Props) {
  const playersInfo = useSelector((state: RootState) => state.players.value);
  const isDoctorSavedOnce =
    typeof window !== UNDEFINED
      ? localStorage.getItem(localStorageNames.isDoctorSavedOnce) === YES
      : false;

  return (
    <>
      <div
        aria-label="doctor-save"
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
          سپس دکتر را بیدار کنید
        </p>
        <div aria-label="container-for-label" className="mb-3">
          <label
            htmlFor="docrotSave"
            className="
            text-gray-100
            lg:text-base
            text-sm
            "
          >
            فردی که دکتر نجات میدهد را مشخص کنید
          </label>
          <p
            className="text-gray-300 mt-1
            lg:text-base
            text-sm"
          >
            {isDoctorSavedOnce
              ? "دکتر یک بار خودش را نجات داده و امکان تکرار این کار را ندارد !"
              : "(دکتر خودش را فقط یکبار میتواند نجات دهد)"}
          </p>
        </div>
        <select
          id="docrotSave"
          ref={doctorSaveSelectRef}
          className="rounded bg-gray-50 border-gray-200 
          lg:px-10 lg:py-3 lg:mb-5
          sm:text-base sm:px-8 sm:border-2
          text-sm px-6 py-2 mb-3 border-1 
          "
        >
          <option>{NO_ONE}</option>
          {isDoctorSavedOnce ? (
            // doctor has saved himself and he wouldn't do this again in future
            <>
              {playersInfo
                .filter((item) => item.role !== role.DOCTOR)
                .map((player, index) => (
                  <option key={index}>{player.name}</option>
                ))}
            </>
          ) : (
            // doctor hasn't saved himself and he can do that now
            <>
              {playersInfo.map((item, index) => (
                <option key={index}>{item.name}</option>
              ))}
            </>
          )}
        </select>
      </div>
    </>
  );
}
