/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { Player } from "../../types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

type Props = {
  item: Player;
};

function PlayerBox({ item }: Props) {
  const playerBoxRef = React.useRef<HTMLInputElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const [isRoleSeen, setIsRoleSeen] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClickClose() {
    setOpen(false);
    setTimeout(() => {
      setIsRoleSeen(true);
    }, 100);
  }

  return (
    <>
      <Dialog open={open}>
        <div
          aria-label="dialog-inner-container"
          className="px-20 py-14 rounded-xl"
        >
          {isRoleSeen ? (
            <div className="mb-10">{item.name} قبلا نقش خود را دیده است</div>
          ) : (
            <div className="iranSansFont text-xl text-center">
              <p className="text-base mb-10">{item.name}</p>
              <p className="text-2xl mb-10">{item.role}</p>
            </div>
          )}
          <DialogActions>
            <button
              ref={buttonRef}
              onClick={handleClickClose}
              className="bg-red-500 text-white p-2 mx-auto rounded"
            >
              متوجه شدم
            </button>
          </DialogActions>
        </div>
      </Dialog>

      <div aria-label="player-box" ref={playerBoxRef} className="basis-1/12">
        <button
          onClick={handleClickOpen}
          className="p-16 bg-indigo-800 text-center rounded-xl mb-5 shadow-lg"
        >
          <div className="text-xl text-white mb-1">{item.name}</div>
        </button>
      </div>
    </>
  );
}

export default PlayerBox;
