/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { ImExit } from "react-icons/im";
import { DialogExitGame } from "../../components";
import { localStorageNames } from "../../lib/constantsValues";

export default function Header() {
  const isGameStarted =
    localStorage.getItem(localStorageNames.isGameStarted) === "yes";
  const [openDialog, setOpenDialog] = React.useState(false);

  function handleClickOpenDialog() {
    setOpenDialog(true);
  }
  function handleClickCloseDialog() {
    setOpenDialog(false);
  }

  return (
    <>
      <div className="bg-red-800 py-6">
        <div className="w-11/12 mx-auto flex justify-between items-center">
          <div></div>
          <div className="gotichFont text-6xl tracking-widest font-black">
            M A F I A
          </div>
          <div>
            {isGameStarted && (
              <button onClick={handleClickOpenDialog}>
                <div className="flex items-center hover:text-stone-800">
                  خروج
                  <ImExit className="mr-1" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
      <DialogExitGame
        openDialog={openDialog}
        handleClickCloseDialog={handleClickCloseDialog}
      />
    </>
  );
}
