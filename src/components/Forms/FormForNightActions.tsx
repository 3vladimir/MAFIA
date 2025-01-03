/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store";
import { removePlayer } from "../../redux/reducers/playersReducer";
import { role, side } from "../../lib/constantsValues";
import { DialogNightKeels } from "../../components";
import {
  localStorageNames,
  dieHardAllStatuses,
} from "../../lib/constantsValues";

export default function Form() {
  const playersInfo = useSelector((state: RootState) => state.players.value);
  const dispatch = useDispatch<AppDispatch>();

  const docrotSaveSelectRed = React.useRef<HTMLSelectElement>(null);
  const sniperShotSelectRef = React.useRef<HTMLSelectElement>(null);
  const lecterSaveSelectRef = React.useRef<HTMLSelectElement>(null);
  const mafiaShotSelectRef = React.useRef<HTMLSelectElement>(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  function handleClickOpenDialog() {
    setOpenDialog(true);
  }

  const dieHard = playersInfo.find((item) => {
    return item.role === role.DIE_HARD;
  });
  const sniper = playersInfo.find((item) => {
    return item.role === role.SNIPER;
  });
  const citizens = playersInfo.filter((item) => {
    return item.side == side.CITIZEN;
  });
  const citizenNames = new Array(citizens.length);
  citizens.forEach((item, index) => {
    citizenNames[index] = item.name;
  });
  const unParsedSniperShotsNumber =
    localStorage.getItem(localStorageNames.sniperShots) || "";
  let sniperShotsNumber = parseInt(unParsedSniperShotsNumber);
  const dieHardStatus = localStorage.getItem(localStorageNames.dieHardStatus);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const docrotSave = docrotSaveSelectRed.current?.value;
    const sniperShot = sniperShotSelectRef.current?.value;
    const lecterSave = lecterSaveSelectRef.current?.value;
    const mafiaShot = mafiaShotSelectRef.current?.value;
    const nightKills = [];

    if (sniperShot !== "هیچکس") {
      sniperShotsNumber++;
      localStorage.setItem(
        localStorageNames.sniperShots,
        sniperShotsNumber.toString()
      );
    }

    if (mafiaShot == docrotSave) {
      console.log("دکتر یکی رو سیو کرد");
    } else if (mafiaShot == dieHard?.name) {
      if (dieHardStatus == dieHardAllStatuses.withShield) {
        localStorage.setItem(
          localStorageNames.dieHardStatus,
          dieHardAllStatuses.shieldLess
        );
      } else {
        dispatch(removePlayer({ name: mafiaShot || "" }));
        nightKills.push(mafiaShot);
      }
    } else {
      dispatch(removePlayer({ name: mafiaShot || "" }));
      nightKills.push(mafiaShot);
    }

    if (citizenNames.includes(sniperShot)) {
      dispatch(removePlayer({ name: sniper?.name || "" }));
      nightKills.push(sniper?.name);
    } else if (sniperShot == lecterSave) {
      console.log("دکتر لکتر سیو کرده");
    } else {
      dispatch(removePlayer({ name: sniperShot || "" }));
      nightKills.push(sniperShot);
    }

    localStorage.setItem(
      localStorageNames.nightKills,
      JSON.stringify(nightKills)
    );
    handleClickOpenDialog();
  }
  return (
    <>
      <form aria-label="night-actions" onSubmit={handleSubmit}>
        <div aria-label="doctor-save" className="mb-10">
          <p className="mb-2 text-gray-100">سپس دکتر را بیدار کنید</p>
          <div className="mb-3" aria-label="container-for-label">
            <label htmlFor="docrotSave" className="text-gray-100">
              فردی که دکتر نجات میدهد را مشخص کنید
            </label>
            <p className="text-gray-300">
              (دکتر خودش را فقط یکبار میتواند نجات دهد)
            </p>
          </div>
          <select
            id="docrotSave"
            ref={docrotSaveSelectRed}
            className="px-10 py-3 rounded bg-gray-50 border-2 border-gray-200"
          >
            <option>هیچکس</option>
            {[...playersInfo].map((item, index) => (
              <option key={index}>{item.name}</option>
            ))}
          </select>
        </div>

        <div aria-label="sniper-shot" className="mb-10">
          <p className="mb-2 text-gray-100">حرفه ای را بیدار کنید</p>
          {sniperShotsNumber < 2 ? (
            <>
              <div className="mb-3" aria-label="container-for-label">
                <label htmlFor="sniperShot" className="text-gray-100">
                  اگر حرفه ای قصد شلیک دارد،هدف شلیک او را مشخص کنید
                </label>
                <p className="text-gray-300">
                  (حرفه ای فقط دو گلوله برای شلیک دارد)
                </p>
              </div>
              <select
                id="sniperShot"
                ref={sniperShotSelectRef}
                className="px-10 py-3 rounded bg-gray-50 border-2 border-gray-200"
              >
                <option>هیچکس</option>
                {[...playersInfo].map((item, index) => (
                  <option key={index}>{item.name}</option>
                ))}
              </select>
            </>
          ) : (
            <p className="text-gray-100">حرفه ای امکان شلیک ندارد !</p>
          )}
        </div>

        <div aria-label="lecter-save" className="mb-10">
          <p className="mb-2 text-gray-100">اکنون تیم مافیا را بیدار کنید</p>
          <div className="mb-3" aria-label="container-for-label">
            <label htmlFor="lecterSave" className="text-gray-100">
              فردی که دکتر لکتر نجات میدهد را مشخص کنید
            </label>
            <p className="text-gray-300">
              (دکتر لکتر خودش را فقط یکبار میتواند نجات دهد)
            </p>
          </div>
          <select
            id="lecterSave"
            ref={lecterSaveSelectRef}
            className="px-10 py-3 rounded bg-gray-50 border-2 border-gray-200"
          >
            <option>هیچکس</option>
            {[...playersInfo]
              .filter((item) => item.side == side.MAFIA)
              .map((mafia, index) => (
                <option key={index}>{mafia.name}</option>
              ))}
          </select>
        </div>

        <div aria-label="mafia-shot" className="mb-10">
          <div className="mb-3" aria-label="container-for-label">
            <label htmlFor="mafiaShot" className="text-gray-100">
              هدف شلیک پدرخوانده را مشخص کنید
            </label>
          </div>
          <select
            id="mafiaShot"
            ref={mafiaShotSelectRef}
            className="px-10 py-3 rounded bg-gray-50 border-2 border-gray-200"
          >
            {[...playersInfo].map((item, index) => (
              <option key={index}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-5" aria-label="container-for-button">
          <button
            type="submit"
            className="mb-8 bg-green-400 py-4 px-8 rounded text-gray-800"
          >
            تایید
          </button>
        </div>
      </form>
      <DialogNightKeels openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
}
