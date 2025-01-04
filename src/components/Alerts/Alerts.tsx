"use client";
import * as React from "react";
type Props = {
  isNumberOfPlayersInvalid: boolean;
};

export function AlertForInvalidNumberOfPlayers({
  isNumberOfPlayersInvalid,
}: Props) {
  return (
    <>
      {isNumberOfPlayersInvalid && (
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
