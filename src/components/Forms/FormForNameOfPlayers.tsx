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
  const formRef = React.useRef<HTMLFormElement>(null);

  function registerNamesOfPlayers() {
    listOfPlayers.forEach((item) => {
      dispatch(
        addPlayer({
          name: item,
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

  function handleInputChange(index: number, value: string) {
    const updatedPlayers = [...listOfPlayers];
    updatedPlayers[index] = value;
    setListOfPlayers(updatedPlayers);
  }

  function initiateLocalStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem(localStorageNames.isGameStarted, "yes");
      localStorage.setItem(localStorageNames.round, "1");
      localStorage.setItem(localStorageNames.gameMode, gameModes.NORMAL);
      localStorage.setItem(localStorageNames.areRolesDistributed, "no");
      localStorage.setItem(localStorageNames.sniperShots, "0");
      localStorage.setItem(
        localStorageNames.dieHardStatus,
        dieHardAllStatuses.withShield
      );
    }
  }

  function handleSubmitNamesOfPlayers(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;

    if (form) {
      // access to input values
      const inputs = form.querySelectorAll("input");
      let hasEmptyFields = false;

      inputs.forEach((item) => {
        if (!item.value.trim()) {
          hasEmptyFields = true;
          item.classList.add("border-red-500");
          // error mode
        } else {
          item.classList.remove("border-red-500");
          // remove error mode
        }
      });

      if (hasEmptyFields) {
        alert("لطفاً همه فیلدها را پر کنید.");
        return;
      } else {
        console.log("فرم با موفقیت ارسال شد!");
      }
    }
    initiateLocalStorage();
    dispatch(clearList());
    // clear loaclStorage
    registerNamesOfPlayers();
    // set the new names
    router.replace(distributionOfRolesAddress);
  }

  React.useEffect(() => {
    localStorage.setItem(
      localStorageNames.playersInfo,
      JSON.stringify(playersInfo)
    );
  }, [playersInfo]);

  return (
    <>
      <div aria-label="form-holder" className="text-center">
        <form ref={formRef} onSubmit={handleSubmitNamesOfPlayers}>
          <div
            aria-label="container-for-button"
            className="
            lg:text-base
            text-sm mb-2"
          >
            نام بازیکنان را وارد کنید{" "}
            <button
              type="button"
              onClick={handleClickRandomNames}
              className="text-blue-700
              lg:text-sm
              text-xs"
            >
              (ایجاد اسم های رندوم)
            </button>
          </div>

          <ul>
            {listOfPlayers.map((item, index) => (
              <li
                key={index}
                className="
                  lg:mb-1 
                  mb-2 "
              >
                <input
                  defaultValue={item}
                  // if user clicked the random names button,show the names in input
                  type="text"
                  className="focus:outline-none text-center shadow rounded
                    lg:border-2 lg:p-3 lg:text-base
                    border-1 p-2 text-sm"
                  onChange={(event) => {
                    handleInputChange(index, event.target.value);
                  }}
                />
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className="mt-2 bg-red-900 rounded text-[white]
            lg:py-4 lg:px-20
            sm:text-base
            py-3 px-12 text-sm"
          >
            شروع
          </button>
        </form>
      </div>
    </>
  );
}
