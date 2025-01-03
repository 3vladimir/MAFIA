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

function Main() {
  const dispatch = useDispatch<AppDispatch>();
  const playersInfo = useSelector((state: RootState) => state.players.value);
  const numberOfPlayers = playersInfo.length;
  const rolesForCurrentGame = new Array(numberOfPlayers).fill("");
  rolesForCurrentGame.forEach((element, index) => {
    rolesForCurrentGame[index] = rolesListByOrder[index];
  });
  const [areRolesDistribute, setAreRolesDistribute] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  function distributeTheRoles() {
    if (!areRolesDistribute) {
      for (let i = 0; i < numberOfPlayers; i++) {
        const randomNumber = Math.floor(
          Math.random() * (rolesForCurrentGame.length - 1)
        );
        const randomRole = rolesForCurrentGame[randomNumber];
        dispatch(indicateRole({ role: randomRole, index: i }));

        const mafiaRoles = [role.GODFATHER, role.LECTER, role.MAFIA];
        if (mafiaRoles.includes(randomRole)) {
          dispatch(indicateSide({ side: side.MAFIA, index: i }));
        } else {
          dispatch(indicateSide({ side: side.CITIZEN, index: i }));
        }
        rolesForCurrentGame.splice(randomNumber, 1);
        setAreRolesDistribute(true);
      }
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
      <div aria-label="whole-container" className="my-10">
        <main>
          <div
            aria-label="distribute-roles-container"
            className="text-center mb-10 text-lg"
          >
            {areRolesDistribute ? (
              <p className="py-6">
                نقش ها پخش شد.با کلیک کردن بر روی هر اسم،میتوانید نقش خود را
                ببینید
              </p>
            ) : (
              <button
                className="px-3 py-6 bg-sky-500 rounded-lg shadow-md text-gray-200"
                onClick={distributeTheRoles}
              >
                پخش کردن نقش ها
              </button>
            )}
          </div>

          <div
            aria-label="players-boxes-container"
            className="flex justify-evenly flex-wrap w-5/6 mx-auto"
          >
            {[...playersInfo].map((item, index) => (
              <PlayerBox key={index} item={item} />
            ))}
          </div>
          {areRolesDistribute && (
            <div
              aria-label="go-to-first-day-button-container"
              className="text-center mt-10"
            >
              <button
                onClick={handleClickOpenDialog}
                className="px-16 py-6 bg-green-700 rounded-lg shadow-md text-gray-200
                hover:scale-110 transition duration-300"
              >
                ورود به روز اول
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
      <Title>پخش کردن نقش ها</Title>
      <ContainerOfHeaderAndMain Main={<Main />} />
    </>
  );
}
