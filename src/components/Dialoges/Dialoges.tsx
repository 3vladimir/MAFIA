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
          className="
         lg:py-8 lg:rounded-xl
         py-5 rounded-lg"
        >
          <p
            className="
          lg:px-20 
          sm:px-14 sm:text-base
          px-10 mb-10 text-sm"
          >
            وارد روز اول بازی میشوید؟
          </p>
          <DialogActions>
            <div
              aria-label="buttons-container"
              className="w-full flex justify-between"
            >
              <button
                className="basis-1/4 text-center hover:text-sky-700
                sm:text-base
                text-sm"
                onClick={handleClickConfirm}
              >
                تایید
              </button>
              <button
                className="basis-1/4 text-center hover:text-sky-700
                sm:text-base
                text-sm
                "
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
          // className="rounded-xl iranSansFont py-5"
          className="
          lg:py-8 lg:rounded-xl
          py-5 rounded-lg"
        >
          <p
            className="
          lg:px-10 
          sm:px-7 sm:text-base
          px-5 mb-10 text-sm"
          >
            آیا مطمئن هستید میخواهید از بازی خارج شوید؟
          </p>
          <DialogActions>
            <div
              aria-label="buttons-container"
              className="w-full flex justify-between"
            >
              <button
                className="basis-1/4 text-center hover:text-sky-700
                sm:text-base
                text-sm"
                onClick={handleClickConfirmDialog}
              >
                بله
              </button>
              <button
                className="basis-1/4 text-center hover:text-sky-700
                sm:text-base
                text-sm"
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
          className="
          lg:py-8 lg:rounded-xl
          py-5 rounded-lg"
        >
          <p
            className="
          lg:px-20 
          sm:px-16 sm:text-base
          px-12 mb-10 text-sm"
          >
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
                className="basis-1/4 text-center hover:text-sky-700
              sm:text-base
              text-sm"
                onClick={handleClickConfirmDialog}
              >
                تایید
              </button>
              <button
                className="basis-1/4 text-center hover:text-sky-700
               sm:text-base
               text-sm"
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
          className="
          lg:px-20 lg:py-14 lg:rounded-xl
          sm:px-16 sm:py-10
          px-12 py-8 rounded-lg"
        >
          {isRoleSeen ? (
            <div
              className="
            lg:mb-10
            sm:mb-6
            mb-5"
            >
              {item.name} قبلا نقش خود را دیده است
            </div>
          ) : (
            <div className="text-center">
              <p
                className=" 
              lg:mb-10 lg:text-base
              sm:mb-6 
              mb-5 text-sm"
              >
                {item.name}
              </p>
              <p
                className=" 
              lg:mb-10 lg:text-2xl
              sm:mb-6 sm:text-xl
              mb-5 text-lg"
              >
                {item.role}
              </p>
            </div>
          )}
          <DialogActions>
            <button
              onClick={handleClickCloseDialog}
              className="bg-red-500 text-white mx-auto rounded
              lg:p-2
              sm:text-base
              p-1 text-sm"
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
      : "";

  let nightKills;
  try {
    nightKills = unParsedNightKills ? JSON.parse(unParsedNightKills) : [];
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
    nightKills = [];
  }
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
          className="
           lg:px-16 lg:py-10 lg:rounded-xl
          sm:px-12 sm:py-8
          px-8 py-6 rounded-lg"
        >
          <div
            className=" 
           lg:mb-10 lg:text-base
           sm:mb-6 
           mb-5 text-sm"
          >
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
              className="bg-red-500 text-white mx-auto rounded
              lg:p-2
              sm:text-base
              p-1 text-sm"
            >
              شروع روز بعدی
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
