"use client";
import * as React from "react";
type Props = {
  isNumberOfPlayersValid: boolean;
};

export function AlertForInvalidNumberOfPlayers({
  isNumberOfPlayersValid,
}: Props) {
  return (
    <>
      {!isNumberOfPlayersValid && (
        <div
          className="w-fit mx-auto text-red-500
          lg:text-base lg:mt-2
          text-sm mt-1"
        >
          خطا!
          <br />
          تعداد بازیکنان مافیا باید بین 7 تا 12 نفر باشد
        </div>
      )}
    </>
  );
}
