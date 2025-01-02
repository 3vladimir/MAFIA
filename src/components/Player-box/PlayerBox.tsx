/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { Player } from "../../types";
import { DialogSeeRoles } from "../../components";

type Props = {
  item: Player;
};

function PlayerBox({ item }: Props) {
  const [openDialog, setoOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setoOpenDialog(true);
  };

  return (
    <>
      <div aria-label="player-box" className="basis-1/12">
        <button
          onClick={handleClickOpenDialog}
          className="p-16 bg-indigo-800 text-center rounded-xl mb-5 shadow-lg"
        >
          <div className="text-xl text-white mb-1">{item.name}</div>
        </button>
      </div>
      <DialogSeeRoles
        openDialog={openDialog}
        setoOpenDialog={setoOpenDialog}
        item={item}
      />
    </>
  );
}

export default PlayerBox;
