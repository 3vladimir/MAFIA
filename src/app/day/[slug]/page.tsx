/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import {
  ContainerOfHeaderAndMain,
  PlayerLabel,
  DialogPlayerOut,
  FormForPlayerOut,
} from "../../../components";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store/store";
import { daysToPersian } from "../../../lib/daysToPersian";

function Main() {
  const path = usePathname();
  const round = parseInt(path.slice(5));
  const [playerOut, setPlayerOut] = React.useState("هیچکس");
  const playersInfo = useSelector((state: RootState) => state.players.value);
  const [openDialog, setOpenDialog] = React.useState(false);

  function handleClickCloseDialog() {
    setOpenDialog(false);
  }

  React.useEffect(() => {
    localStorage.setItem("playersInfo", JSON.stringify(playersInfo));
  }, [playersInfo]);

  return (
    <>
      <div aria-label="whole-container" className="mt-10 w-11/12 mx-auto">
        <h1 className="text-center mb-10 font-extrabold text-xl">
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
      <ContainerOfHeaderAndMain Main={<Main />} backgroundColor="bg-yellow-100"/>;
    </>
  );
}

export default App;
