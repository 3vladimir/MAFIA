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
import { localStorageNames } from "../../lib/constantsValues";

type PropsOfStateAndCloseFunction = {
  openDialog: boolean;
  handleClickCloseDialog: () => void;
};
type PropsForDialogPlayerOut = {
  openDialog: boolean;
  handleClickCloseDialog: () => void;
  playerOut: string;
};

type PropsForDialogSeeRoles = {
  openDialog: boolean;
  setoOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  item: Player;
};

type PropsForDialogNightKeels = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
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
    if (typeof window !== "undefined") {
      localStorage.setItem(localStorageNames.isGameStarted, "no");
    }

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
}: PropsForDialogPlayerOut) {
  const path = usePathname();
  const round = parseInt(path.slice(5));
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

export function DialogNightKeels({
  openDialog,
  setOpenDialog,
}: PropsForDialogNightKeels) {
  const path = usePathname();
  const round = parseInt(path.slice(7));
  const router = useRouter();

  const unParsedNightKills =
    typeof window !== "undefined"
      ? localStorage.getItem(localStorageNames.nightKills) || ""
      : "defaultValue";

  const nightKills = JSON.parse(unParsedNightKills);
  if (!nightKills[0]) {
    // the array is like [null] and the null should be deleted
    nightKills.pop();
  }

  function handleClickCloseDialog() {
    setOpenDialog(false);
    router.replace(`${dayAddress}/${round + 1}`);
  }

  return (
    <>
      <Dialog open={openDialog}>
        <div
          aria-label="dialog-inner-container"
          className="px-20 py-14 rounded-xl"
        >
          <div className="mb-10">
            در شب گذشته{" "}
            {[...nightKills].map((item, index) => (
              <span key={index}>
                {`${item} `}
                {nightKills.length > index + 1 && "و "}
              </span>
            ))}
            {nightKills.length == 0
              ? "کسی کشته نشد"
              : nightKills.length == 1
              ? "کشته شد"
              : "کشته شدند"}
          </div>

          <DialogActions>
            <button
              onClick={handleClickCloseDialog}
              className="bg-red-500 text-white p-2 mx-auto rounded"
            >
              شروع روز بعدی
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
