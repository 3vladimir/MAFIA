/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { homePageAddress, dayAddress, nightAddress } from "@/routes";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";
import { removePlayer } from "@/redux/reducers/playersReducer";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { localStorageNames, NO, UNDEFINED } from "@/lib/constantsValues";
import { daysToPersian } from "@/lib/daysToPersian";
import * as types from "@/types/dialogesTypes";

export function DialogEnterFirstDay({
  openDialog,
  handleClickCloseDialog,
}: types.PropsForDialogEnterFirstDay) {
  const router = useRouter();
  let round: number | string =
    typeof window !== UNDEFINED
      ? localStorage.getItem(localStorageNames.round) || "1"
      : "1";
  round = parseInt(round);

  function handleClickConfirm() {
    router.replace(`${dayAddress}/${round}`);
  }

  return (
    <>
      <Dialog open={openDialog}>
        <DialogActions>
          <button
            className="absolute top-0 right-0 bg-orange-500 hover:bg-orange-600 rounded
            lg:p-2
            p-1"
            onClick={handleClickCloseDialog}
          >
            <IoMdClose
              className="text-gray-100
              lg:text-xl
              text-lg"
            />
          </button>
        </DialogActions>
        <div
          aria-label="dialog-inner-container"
          className="py-8
          lg:rounded-xl
          rounded-lg"
        >
          <p
            className="
            lg:px-20 
            sm:px-14 sm:text-base sm:mb-10
            px-10 mb-8 text-sm"
          >
            {`وارد روز ${daysToPersian({ round: round })} بازی میشوید؟`}
          </p>
          <DialogActions>
            <div
              aria-label="button-container"
              className="w-full flex justify-center"
            >
              <button
                className="hover:text-sky-700
                sm:text-base
                text-sm"
                onClick={handleClickConfirm}
              >
                تایید
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
}: types.PropsForDialogExitGame) {
  const router = useRouter();

  function handleClickConfirmDialog() {
    if (typeof window !== UNDEFINED) {
      localStorage.setItem(localStorageNames.isGameStarted, NO);
    }
    router.push(homePageAddress);
  }

  return (
    <>
      <Dialog open={openDialog}>
        <DialogActions>
          <button
            className="absolute top-0 right-0 bg-orange-500 hover:bg-orange-600 rounded
            lg:p-2
            p-1"
            onClick={handleClickCloseDialog}
          >
            <IoMdClose
              className="text-gray-100
              lg:text-xl
              text-lg"
            />
          </button>
        </DialogActions>
        <div
          aria-label="dialog-inner-container"
          className="py-8 
          lg:rounded-xl
          rounded-lg"
        >
          <p
            className="
            lg:px-10 
            sm:px-7 sm:text-base sm:mb-10
            px-5 mb-8 text-sm"
          >
            آیا مطمئن هستید میخواهید از بازی خارج شوید؟
          </p>
          <DialogActions>
            <div
              aria-label="button-container"
              className="w-full flex justify-center"
            >
              <button
                className="basis-1/4 text-center hover:text-sky-700
                sm:text-base
                text-sm"
                onClick={handleClickConfirmDialog}
              >
                بله
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
}: types.PropsForDialogPlayerOut) {
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
        <DialogActions>
          <button
            className="absolute top-0 right-0 bg-orange-500 hover:bg-orange-600 rounded
            lg:p-2
            p-1"
            onClick={handleClickCloseDialog}
          >
            <IoMdClose
              className="text-gray-100
              lg:text-xl
              text-lg"
            />
          </button>
        </DialogActions>
        <div
          aria-label="dialog-inner-container"
          className="py-8
          lg:rounded-xl
          rounded-lg"
        >
          <p
            className="
            lg:px-20 
            sm:px-16 sm:text-base ms:mb-10
            px-12 mb-8 text-sm"
          >
            {playerOut == "هیچکس"
              ? "هیچکس از بازی خارج نشد؟"
              : `${playerOut} از بازی خارج شد؟`}
          </p>
          <DialogActions>
            <div
              aria-label="button-container"
              className="w-full flex justify-center"
            >
              <button
                className="basis-1/4 text-center hover:text-sky-700
                sm:text-base
                text-sm"
                onClick={handleClickConfirmDialog}
              >
                تایید
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
  areRolesDistributed,
}: types.PropsForDialogSeeRoles) {
  const [isRoleSeen, setIsRoleSeen] = React.useState(false);

  function handleClickCloseDialog() {
    setoOpenDialog(false);
    if (areRolesDistributed) {
      setTimeout(() => {
        // wait a moment to dialog get closed
        setIsRoleSeen(true);
      }, 100);
    }
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
}: types.PropsForDialogNightKeels) {
  const path = usePathname();
  const lengthOfNightAddress = nightAddress.length + 1;
  // current address is something like: '/night/NUMBER' and we need only that NUMBER
  const round = parseInt(path.slice(lengthOfNightAddress));

  const router = useRouter();

  const unParsedNightKills =
    typeof window !== UNDEFINED
      ? localStorage.getItem(localStorageNames.nightKills) || "[]"
      : // becasue of JSON.parse(),initial value should be an array
        "[]";
  const nightKills = JSON.parse(unParsedNightKills) || [];

  if (!nightKills[0]) {
    // the array is like [null] and the null should be deleted
    nightKills.pop();
  }

  function handleClickCloseDialog() {
    setOpenDialog(false);
    if (typeof window !== UNDEFINED) {
      localStorage.setItem(localStorageNames.round, (round + 1).toString());
    }
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
              ? // means no one is killed
                "کسی کشته نشد"
              : nightKills.length == 1
              ? // means only one player is killed
                "کشته شد"
              : // means two players are killed
                "کشته شدند"}
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
