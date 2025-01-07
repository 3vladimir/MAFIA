/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { ImExit } from "react-icons/im";
import { DialogExitGame } from "../../components";
import { localStorageNames } from "../../lib/constantsValues";

export default function Header() {
  const [isGameStarted, setIsGameStarted] = React.useState(
    typeof window !== "undefined"
      ? localStorage.getItem(localStorageNames.isGameStarted) === "yes"
      : false
  );

  const [openDialog, setOpenDialog] = React.useState(false);

  function handleClickOpenDialog() {
    setOpenDialog(true);
  }
  function handleClickCloseDialog() {
    setOpenDialog(false);
  }

  return (
    <>
      <div
        className="bg-red-800 
        lg:py-6
        sm:p-5
        p-4      
        "
      >
        <div
          aria-label="flexbox-parent"
          className="w-11/12 mx-auto flex justify-between items-center"
        >
          <div aria-label="helper-element"></div>
          <div
            className="gotichFont tracking-widest font-black
            lg:text-6xl
            sm:text-5xl
            text-4xl
            "
          >
            M A F I A
          </div>
          <div aria-label="container-for-quit-button">
            {isGameStarted && (
              <button id="quitButton" onClick={handleClickOpenDialog}>
                <div
                  className="flex items-center hover:text-stone-800
                  lg:text-base
                  sm:text-sm
                  text-xs"
                >
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
