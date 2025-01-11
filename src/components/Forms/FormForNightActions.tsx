/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";
import { removePlayer } from "@/redux/reducers/playersReducer";
import { role, side, YES } from "@/lib/constantsValues";
import { DialogNightKeels } from "@/components";
import {
  FormForDoctorSave,
  FormForSniperShot,
  FormForLecterSave,
  FormForMafiaShot,
  FormForDetectiveInquiry,
} from "./";
import {
  localStorageNames,
  dieHardAllStatuses,
  NO_ONE,
  UNDEFINED,
} from "@/lib/constantsValues";

export default function Form() {
  const playersInfo = useSelector((state: RootState) => state.players.value);
  const dispatch = useDispatch<AppDispatch>();

  const doctorSaveSelectRef = React.useRef<HTMLSelectElement>(null);
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
  const doctor = playersInfo.find((item) => {
    return item.role === role.DOCTOR;
  });
  const lecter = playersInfo.find((item) => {
    return item.role === role.LECTER;
  });
  const citizensTeam = playersInfo.filter((item) => {
    return item.side == side.CITIZEN;
  });
  const mafiaTeam = playersInfo.filter((item) => {
    return item.side == side.MAFIA;
  });

  const citizenNames = new Array(citizensTeam.length);
  citizensTeam.forEach((item, index) => {
    citizenNames[index] = item.name;
  });
  const mafiaNames = new Array(mafiaTeam.length);
  mafiaTeam.forEach((item, index) => {
    mafiaNames[index] = item.name;
  });

  const unParsedSniperShotsNumber =
    typeof window !== UNDEFINED
      ? localStorage.getItem(localStorageNames.sniperShots) || ""
      : "";
  let sniperShotsNumber = parseInt(unParsedSniperShotsNumber);

  const dieHardStatus =
    typeof window !== UNDEFINED
      ? localStorage.getItem(localStorageNames.dieHardStatus)
      : "";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const docrotSave = doctorSaveSelectRef.current?.value;
    const sniperShot = sniperShotSelectRef.current?.value;
    const lecterSave = lecterSaveSelectRef.current?.value;
    const mafiaShot = mafiaShotSelectRef.current?.value;
    const nightKills: (string | undefined)[] = [];

    // mafia shot part
    if (mafiaShot == docrotSave) {
      console.log("دکتر یکی رو سیو کرد");
    } else if (mafiaShot == dieHard?.name) {
      // mafia target is die hard
      if (dieHardStatus == dieHardAllStatuses.withShield) {
        // it is the first time that die is shot
        if (typeof window !== UNDEFINED) {
          localStorage.setItem(
            localStorageNames.dieHardStatus,
            dieHardAllStatuses.shieldLess
            // die hard has no more a shield
          );
        }
      } else {
        // it is the second time that die hard is shot
        dispatch(removePlayer({ name: mafiaShot || "" }));
        nightKills.push(mafiaShot);
      }
    } else {
      // mafia target is not die hard
      dispatch(removePlayer({ name: mafiaShot || "" }));
      nightKills.push(mafiaShot);
    }

    // sniper shot part
    if (sniperShot !== NO_ONE) {
      // sniper has a shot
      sniperShotsNumber++;
      if (typeof window !== UNDEFINED) {
        localStorage.setItem(
          localStorageNames.sniperShots,
          sniperShotsNumber.toString()
        );
      }
      if (mafiaNames.includes(sniperShot)) {
        // sniper target is mafia
        if (sniperShot == lecterSave || sniperShot == docrotSave) {
          console.log("مافیا نجات داده شد");
        } else {
          // sniper killed a mafia
          dispatch(removePlayer({ name: sniperShot || "" }));
          nightKills.push(sniperShot);
        }
      } else {
        // sniper target is citizen and sniper should get out
        dispatch(removePlayer({ name: sniper?.name || "" }));
        nightKills.push(sniper?.name);
      }
    }

    nightKills.forEach((element, index) => {
      if (element == nightKills[index + 1]) {
        // if someone is killed by two shots,just one time should be considered
        nightKills.pop();
      }
    });

    if (typeof window !== UNDEFINED) {
      localStorage.setItem(
        localStorageNames.nightKills,
        JSON.stringify(nightKills)
      );
    }

    if (docrotSave == doctor?.name) {
      // doctor has saved himself and he wouldn't do this again in future
      if (typeof window !== UNDEFINED) {
        localStorage.setItem(localStorageNames.isDoctorSavedOnce, YES);
      }
    }

    if (lecterSave == lecter?.name) {
      // Dr lecter has saved himself and he wouldn't do this again in future
      if (typeof window !== UNDEFINED) {
        localStorage.setItem(localStorageNames.isLecterSavedOnce, YES);
      }
    }

    handleClickOpenDialog();
  }

  return (
    <>
      <FormForDetectiveInquiry />
      
      <form aria-label="night-actions" onSubmit={handleSubmit}>
        <FormForDoctorSave doctorSaveSelectRef={doctorSaveSelectRef} />
        <FormForSniperShot sniperShotSelectRef={sniperShotSelectRef} />
        <FormForLecterSave lecterSaveSelectRef={lecterSaveSelectRef} />
        <FormForMafiaShot mafiaShotSelectRef={mafiaShotSelectRef} />

        <div aria-label="container-for-button" className="mb-5">
          <button
            type="submit"
            className="bg-green-400 rounded text-gray-800 mb-10
            lg:px-8 lg:py-4 
            sm:px-6 sm:py-3 text-base
            px-5 py-2 text-sm"
          >
            تایید
          </button>
        </div>
      </form>
      <DialogNightKeels openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
}
