/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { Player } from "../../types";
import { side } from "../../lib/constantsValues";

type Props = {
  item: Player;
};

function PlayerBox({ item }: Props) {
  const playerBoxRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (item.side == side.MAFIA) {
      playerBoxRef.current?.classList.add("bg-red-700");
    } else {
      playerBoxRef.current?.classList.remove("bg-red-700");
    }
  });

  return (
    <>
      <div
        aria-label="player-box"
        ref={playerBoxRef}
        className="basis-1/12 p-10 bg-green-800 text-center rounded-xl mb-5 shadow-lg"
      >
        <div className="text-lg text-white mb-2">{item.name}</div>
        <div className="text-sm text-gray-300 text-nowrap">{item.role}</div>
      </div>
    </>
  );
}

export default PlayerBox;
