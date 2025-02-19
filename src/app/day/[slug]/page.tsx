/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import {
  WholeContainer,
  PlayerLabel,
  DialogPlayerOut,
  FormForPlayerOut,
} from "@/components";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";
import { daysToPersian } from "@/lib/daysToPersian";
import {
  side,
  gameModes,
  localStorageNames,
  NO_ONE,
} from "@/lib/constantsValues";
import { victoryAddress, dayAddress } from "@/routes";

function Main() {
  const path = usePathname();
  const lengthOfDayAddress = dayAddress.length + 1;
  // current address is something like: '/day/NUMBER' and we need only that NUMBER
  const round = parseInt(path.slice(lengthOfDayAddress));
  const router = useRouter();
  const [playerOut, setPlayerOut] = React.useState(NO_ONE);
  const playersInfo = useSelector((state: RootState) => state.players.value);
  const [openDialog, setOpenDialog] = React.useState(false);

  function handleClickCloseDialog() {
    setOpenDialog(false);
  }

  React.useEffect(() => {
    localStorage.setItem(
      localStorageNames.playersInfo,
      JSON.stringify(playersInfo)
    );
  }, [playersInfo]);

  React.useEffect(() => {
    // check if a team has won
    const mafiaTeam = playersInfo.filter((player) => {
      return player.side === side.MAFIA;
    });
    const citizensTeam = playersInfo.filter((player) => {
      return player.side === side.CITIZEN;
    });

    if (mafiaTeam.length == 0) {
      localStorage.setItem(localStorageNames.gameMode, gameModes.CITIZENS_WIN);
      router.replace(victoryAddress);
    } else if (mafiaTeam.length == citizensTeam.length) {
      localStorage.setItem(localStorageNames.gameMode, gameModes.MAFIA_WIN);
      router.replace(victoryAddress);
    }
  }, [playersInfo, router]);

  return (
    <>
      <div
        aria-label="whole-container"
        className="w-11/12 mx-auto
         lg:mt-10
         mt-14"
      >
        <main>
          <h1
            className="table mx-auto mb-10 rounded font-extrabold bg-whiteAndYellowLinearGradient
            lg:px-10 lg:py-3 lg:text-xl
            sm:px-8 sm:py-2 sm:text-lg
            px-5 py-2 text-base
            "
          >
            {`روز ${daysToPersian({ round: round })}`}
          </h1>
          <div aria-label="inner-container" className="flex justify-between">
            <div
              aria-label="players-boxes-container"
              className="flex justify-evenly flex-wrap
              sm:basis-2/3 
              basis-3/6"
            >
              {playersInfo.map((item, index) => (
                <PlayerLabel key={index} item={item} />
              ))}
            </div>
            <div
              aria-label="player-out-constainer"
              className="text-center
              sm:basis-1/3
              basis-2/6"
            >
              <FormForPlayerOut
                setOpenDialog={setOpenDialog}
                setPlayerOut={setPlayerOut}
              />
            </div>
          </div>
        </main>
      </div>
      <DialogPlayerOut
        openDialog={openDialog}
        handleClickCloseDialog={handleClickCloseDialog}
        playerOut={playerOut}
      />
    </>
  );
}

function App() {
  return (
    <>
      <WholeContainer
        Main={<Main />}
        title="روز بازی"
        backgroundColor="bg-yellow-200"
      />
      ;
    </>
  );
}

export default App;
