/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { Player } from "@/types";
import { DialogSeeRoles } from "@/components";

type Props = {
  item: Player;
  areRolesDistributed: boolean;
};

function PlayerBox({ item, areRolesDistributed }: Props) {
  const [openDialog, setoOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setoOpenDialog(true);
  };

  return (
    <>
      <div aria-label="player-box" className="basis-1/12">
        <button
          onClick={handleClickOpenDialog}
          className="bg-indigo-800 text-center mb-5 shadow-lg
          lg:p-16 lg:rounded-xl
          sm:p-10
          p-6 rounded-lg"
        >
          <div
            className="text-white mb-1
          lg:text-xl 
          sm:text-lg
          text-base"
          >
            {item.name}
          </div>
        </button>
      </div>

      <DialogSeeRoles
        openDialog={openDialog}
        setoOpenDialog={setoOpenDialog}
        item={item}
        areRolesDistributed={areRolesDistributed}
      />
    </>
  );
}

export default PlayerBox;
