/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import {
  ContainerOfHeaderAndMain,
  PlayerLabel,
  DialogPlayerOut,
  FormForPlayerOut,
  Title,
} from "../../../components";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store/store";
import { daysToPersian } from "../../../lib/daysToPersian";
import {
  side,
  gameModes,
  localStorageNames,
} from "../../../lib/constantsValues";
import { victoryAddress } from "../../../routes";

function Main() {
  const path = usePathname();
  const round = parseInt(path.slice(5));
  const router = useRouter();
  const [playerOut, setPlayerOut] = React.useState("هیچکس");
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
      <div aria-label="whole-container" className="mt-10 w-11/12 mx-auto">
        <h1
          className="table mx-auto rounded mb-10 font-extrabold text-xl text-black
        bg-whiteAndYellowLinearGradient px-10 py-3"
        >
          {`روز ${daysToPersian({ round: round })}`}
        </h1>
        <div aria-label="inner-container" className="flex">
          <div
            aria-label="players-boxes-container"
            className="basis-2/3 flex justify-evenly flex-wrap"
          >
            {[...playersInfo].map((item, index) => (
              <PlayerLabel key={index} item={item} />
            ))}
          </div>
          <div
            aria-label="player-out-constainer"
            className="basis-1/3 text-center"
          >
            <FormForPlayerOut
              setOpenDialog={setOpenDialog}
              setPlayerOut={setPlayerOut}
              playersInfo={playersInfo}
            />
          </div>
        </div>
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
      <Title>روز بازی</Title>
      <ContainerOfHeaderAndMain
        Main={<Main />}
        backgroundColor="bg-yellow-50"
      />
      ;
    </>
  );
}

export default App;
