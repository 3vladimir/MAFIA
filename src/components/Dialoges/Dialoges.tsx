/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { homePageAddress, dayAddress, nightAddress } from "../../routes";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store";
import { removePlayer } from "../../redux/reducers/playersReducer";
import { usePathname } from "next/navigation";
import { Player } from "../../types";

type PropsOfStateAndCloseFunction = {
  openDialog: boolean;
  handleClickCloseDialog: () => void;
};
type ProPsForDialogPlayerOut = {
  openDialog: boolean;
  handleClickCloseDialog: () => void;
  playerOut: string;
};

type PropsForDialogSeeRoles = {
  openDialog: boolean;
  setoOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  item: Player;
};

export function DialogEnterFirstDay({
  openDialog,
  handleClickCloseDialog,
}: PropsOfStateAndCloseFunction) {
  const router = useRouter();

  function handleClickConfirm() {
    router.replace(`${dayAddress}/1`);
  }
  return (
    <>
      <Dialog open={openDialog}>
        <div
          aria-label="dialog-inner-container"
          className="rounded-xl iranSansFont py-5"
        >
          <p className="px-20 mb-10">وارد روز اول بازی میشوید؟</p>
          <DialogActions>
            <div
              aria-label="buttons-container"
              className="w-full flex justify-between"
            >
              <button
                className="basis-1/4 text-center hover:text-sky-700"
                onClick={handleClickConfirm}
              >
                تایید
              </button>
              <button
                className="basis-1/4 text-center hover:text-sky-700"
                onClick={handleClickCloseDialog}
              >
                بازگشت
              </button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

export function DialogExitGame({
  openDialog,
  handleClickCloseDialog,
}: PropsOfStateAndCloseFunction) {
  const router = useRouter();

  function handleClickConfirmDialog() {
    localStorage.setItem("isGameStarted", "no");
    router.push(homePageAddress);
  }
  return (
    <>
      <Dialog open={openDialog}>
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
                onClick={handleClickConfirmDialog}
              >
                بله
              </button>
              <button
                className="basis-1/4 text-center hover:text-sky-700"
                onClick={handleClickCloseDialog}
              >
                بازگشت
              </button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

export function DialogPlayerOut({
  openDialog,
  handleClickCloseDialog,
  playerOut,
}: ProPsForDialogPlayerOut) {
  const path = usePathname();
  const round = path.slice(5);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  function handleClickConfirmDialog() {
    dispatch(removePlayer({ name: playerOut }));
    router.replace(`${nightAddress}/${round}`);
  }

  return (
    <>
      <Dialog open={openDialog}>
        <div
          aria-label="dialog-inner-container"
          className="rounded-xl iranSansFont py-5"
        >
          <p className="px-20 mb-10">
            {playerOut == "هیچکس"
              ? "هیچکس از بازی خارج نشد؟"
              : `${playerOut} از بازی خارج شد؟`}
          </p>
          <DialogActions>
            <div
              aria-label="buttons-container"
              className="w-full flex justify-between"
            >
              <button
                className="basis-1/4 text-center hover:text-sky-700"
                onClick={handleClickConfirmDialog}
              >
                تایید
              </button>
              <button
                className="basis-1/4 text-center hover:text-sky-700"
                onClick={handleClickCloseDialog}
              >
                بازگشت
              </button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

export function DialogSeeRoles({
  openDialog,
  setoOpenDialog,
  item,
}: PropsForDialogSeeRoles) {
  const [isRoleSeen, setIsRoleSeen] = React.useState(false);
  function handleClickCloseDialog() {
    setoOpenDialog(false);
    setTimeout(() => {
      setIsRoleSeen(true);
    }, 100);
  }

  return (
    <>
      <Dialog open={openDialog}>
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
              onClick={handleClickCloseDialog}
              className="bg-red-500 text-white p-2 mx-auto rounded"
            >
              متوجه شدم
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
