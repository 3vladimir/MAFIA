/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store";
import {
  indicateRole,
  indicateSide,
} from "../../redux/reducers/playersReducer";
import {
  ContainerOfHeaderAndMain,
  PlayerBox,
  DialogEnterFirstDay,
  Title,
} from "../../components";
import { rolesListByOrder } from "../../lib/rolesListByOrder";
import { role, side, localStorageNames } from "../../lib/constantsValues";
import { daysToPersian } from "@/lib/daysToPersian";

function Main() {
  const dispatch = useDispatch<AppDispatch>();
  const playersInfo = useSelector((state: RootState) => state.players.value);

  const numberOfPlayers = playersInfo.length;
  const rolesForCurrentGame = new Array(numberOfPlayers).fill("");
  rolesForCurrentGame.forEach((item, index) => {
    // according to the number of players,roles determine
    rolesForCurrentGame[index] = rolesListByOrder[index];
  });

  const [areRolesDistributed, setAreRolesDistributed] = React.useState(
    typeof window !== "undefined"
      ? localStorage.getItem(localStorageNames.areRolesDistributed) === "yes"
      : false
  );
  const [openDialog, setOpenDialog] = React.useState(false);

  let round: string | number =
    typeof window !== "undefined"
      ? localStorage.getItem(localStorageNames.round) || "1"
      : "1";
  round = parseInt(round);

  function handleClickDistributeTheRoles() {
    for (let i = 0; i < numberOfPlayers; i++) {
      const randomNumber =
        typeof window !== "undefined"
          ? Math.floor(Math.random() * (rolesForCurrentGame.length - 1))
          : 0;
      const randomRole = rolesForCurrentGame[randomNumber];
      dispatch(indicateRole({ role: randomRole, index: i }));

      const mafiaRoles = [role.GODFATHER, role.LECTER, role.MAFIA];
      if (mafiaRoles.includes(randomRole)) {
        dispatch(indicateSide({ side: side.MAFIA, index: i }));
      } else {
        dispatch(indicateSide({ side: side.CITIZEN, index: i }));
      }
      // after assigning the role to a player,the role should be deleted from the list
      rolesForCurrentGame.splice(randomNumber, 1);
      setAreRolesDistributed(true);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(localStorageNames.areRolesDistributed, "yes");
    }
  }

  React.useEffect(() => {
    localStorage.setItem(
      localStorageNames.playersInfo,
      JSON.stringify(playersInfo)
    );
  }, [playersInfo]);

  function handleClickOpenDialog() {
    setOpenDialog(true);
  }
  function handleClickCloseDialog() {
    setOpenDialog(false);
  }

  return (
    <>
      <div
        aria-label="whole-container"
        className="
        lg:my-10
        my-8"
      >
        <main>
          <div
            aria-label="distribute-roles-container"
            className="text-center mb-10 
            lg:text-lg
            sm:text-base"
          >
            {areRolesDistributed ? (
              <p
                className="
                lg:py-6 mx-auto
                sm:text-base sm:w-full
                py-5 text-sm w-1/2"
              >
                نقش ها پخش شد.با کلیک کردن بر روی هر اسم،میتوانید نقش خود را
                ببینید
              </p>
            ) : (
              <button
                className="bg-sky-500 rounded-lg shadow-md text-gray-200
                lg:px-3 lg:py-6
                sm:text-base
                px-2 py-5 text-sm"
                onClick={handleClickDistributeTheRoles}
              >
                پخش کردن نقش ها
              </button>
            )}
          </div>

          <div
            aria-label="players-boxes-container"
            className="flex justify-evenly flex-wrap w-5/6 mx-auto"
          >
            {playersInfo.map((item, index) => (
              <div key={index}>
                <PlayerBox
                  item={item}
                  areRolesDistributed={areRolesDistributed}
                />
              </div>
            ))}
          </div>
          {areRolesDistributed && (
            <div
              aria-label="go-to-first-day-button-container"
              className="text-center
              lg:mt-10
              sm:mt-5
              mt-2"
            >
              <button
                onClick={handleClickOpenDialog}
                className="bg-green-700 rounded-lg shadow-md text-gray-200 
                hover:scale-110 transition duration-300
                lg:px-16 lg:py-6
                sm:px-12 sm:py-5 sm:text-base
                px-10 py-4 text-sm"
              >
                {`ورود به روز ${daysToPersian({ round: round })}`}
              </button>
            </div>
          )}
        </main>
      </div>
      <DialogEnterFirstDay
        openDialog={openDialog}
        handleClickCloseDialog={handleClickCloseDialog}
      />
    </>
  );
}

export default function App() {
  return (
    <>
      <Title>توزیع نقش ها</Title>
      <ContainerOfHeaderAndMain Main={<Main />} />
    </>
  );
}
