/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { Player } from "../../types";
import { side } from "../../lib/constantsValues";

type Props = {
  item: Player;
};

function PlayerBox({ item }: Props) {
  const playerLabelRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (item.side == side.MAFIA) {
      playerLabelRef.current?.classList.add("bg-red-700");
    } else {
      playerLabelRef.current?.classList.remove("bg-red-700");
    }
  });

  return (
    <>
      <div
        aria-label="player-label"
        ref={playerLabelRef}
        className="basis-1/12 bg-green-800 text-center shadow-lg
        lg:p-10 lg:rounded-xl lg:mb-5
        sm:p-6 sm:mb-3
        p-3 mb-2 rounded-lg"
      >
        <div
          className="text-white 
        lg:text-lg lg:mb-2
        sm:text-base 
        text-sm mb-1"
        >
          {item.name}
        </div>
        <div
          className="text-gray-300 text-nowrap
        lg:text-sm 
        text-xs"
        >
          {item.role}
        </div>
      </div>
    </>
  );
}

export default PlayerBox;
