/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store";
import { addPlayer, clearList } from "../../redux/reducers/playersReducer";
import { distributionOfRolesAddress } from "../../routes";
import produceRandomNames from "../../lib/randomNames";
import {
  UNKNOWN,
  gameModes,
  localStorageNames,
  dieHardAllStatuses,
} from "../../lib/constantsValues";

type Props = {
  listOfPlayers: string[];
  numberOfPlayers: number;
  setListOfPlayers: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Form({
  listOfPlayers,
  numberOfPlayers,
  setListOfPlayers,
}: Props) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const playersInfo = useSelector((state: RootState) => state.players.value);

  function registerNamesOfPlayers() {
    listOfPlayers.forEach((element) => {
      dispatch(
        addPlayer({
          name: element,
          side: UNKNOWN,
          role: UNKNOWN,
        })
      );
    });
  }

  function handleClickRandomNames(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    produceRandomNames({
      listOfPlayers,
      setListOfPlayers,
      numberOfPlayers,
    });
  }

  React.useEffect(() => {
    localStorage.setItem(
      localStorageNames.playersInfo,
      JSON.stringify(playersInfo)
    );
  }, [playersInfo]);

  function initiateLocalStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem(localStorageNames.isGameStarted, "yes");
      localStorage.setItem(localStorageNames.gameMode, gameModes.NORMAL);
      localStorage.setItem(localStorageNames.sniperShots, "0");
      localStorage.setItem(
        localStorageNames.dieHardStatus,
        dieHardAllStatuses.withShield
      );
    }
  }

  function handleSubmitNamesOfPlayers(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    initiateLocalStorage();
    dispatch(clearList());
    registerNamesOfPlayers();
    router.replace(distributionOfRolesAddress);
  }
  return (
    <>
      <form onSubmit={handleSubmitNamesOfPlayers}>
        <div aria-label="form-holder" className="text-center mb-10">
          <div className="mb-2">
            نام بازیکنان را وارد کنید
            <button
              onClick={handleClickRandomNames}
              className="absolute top-[355px] left-[450px] text-blue-700"
            >
              ایجاد اسم های رندوم
            </button>
          </div>
          {[
            ...listOfPlayers.map((item, index) => (
              <li key={index} className="mb-1">
                <input
                  required
                  defaultValue={item}
                  type="text"
                  className="focus:outline-none border-2 p-3 text-center shadow"
                />
              </li>
            )),
          ]}
          <button
            type="submit"
            className="mt-2 bg-red-900 py-4 px-20 rounded text-[white]"
          >
            شروع
          </button>
        </div>
      </form>
    </>
  );
}
