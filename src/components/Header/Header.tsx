/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { homePageAddress } from "../../routes";
import { ImExit } from "react-icons/im";

export default function Header() {
  const gameMode = localStorage.getItem("isGameStarted") === "yes";
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }
  function handleClickClose() {
    setOpen(false);
  }
  function handleClickConfirm() {
    localStorage.setItem("isGameStarted", "no");
    router.push(homePageAddress);
  }
  return (
    <>
      <Dialog open={open}>
        <div
          aria-label="dialog-inner-container"
          className="rounded-xl iranSansFont py-5"
        >
          <p className="px-20 mb-10">
            آیا مطمئن هستید میخواهید از بازی خارج شوید؟
          </p>
          <DialogActions>
            <div
              aria-label="buttons-container"
              className="w-full flex justify-between"
            >
              <button
                className="basis-1/4 text-center hover:text-sky-700"
                onClick={handleClickConfirm}
              >
                بله
              </button>
              <button
                className="basis-1/4 text-center hover:text-sky-700"
                onClick={handleClickClose}
              >
                بازگشت
              </button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
      <div className="bg-red-800 py-6">
        <div className="w-11/12 mx-auto flex justify-between items-center">
          <div></div>
          <div className="gotichFont text-6xl tracking-widest font-black">
            M A F I A
          </div>
          <div>
            {gameMode && (
              <button onClick={handleClickOpen}>
                <div className="flex items-center hover:text-stone-800">
                  خروج
                  <ImExit className="mr-1" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
