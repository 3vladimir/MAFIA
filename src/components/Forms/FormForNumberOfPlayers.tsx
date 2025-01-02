"use client";
import * as React from "react";

import { AlertForInvalidNumberOfPlayers } from "../../components";

type Props = {
  setIsNumberOfPlayersInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNumberOfPlayersConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  setNumberOfPlayers: React.Dispatch<React.SetStateAction<number>>;
  setListOfPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  isNumberOfPlayersInvalid: boolean;
};

export default function Form({
  setIsNumberOfPlayersInvalid,
  setIsNumberOfPlayersConfirmed,
  setNumberOfPlayers,
  setListOfPlayers,
  isNumberOfPlayersInvalid,
}: Props) {
  const numberOfPlayersInputRef = React.useRef<HTMLInputElement>(null);

  function handleInputChangeNumberOfPlayers() {
    const isInputInvalid = /^[1-9][0-9]*$/;

    if (numberOfPlayersInputRef.current) {
      if (!isInputInvalid.test(numberOfPlayersInputRef.current.value)) {
        numberOfPlayersInputRef.current.value = "";
      }
    }
    if (isNumberOfPlayersInvalid) {
      setIsNumberOfPlayersInvalid(false);
    }
  }

  function handleSubmitNumberOfPlayers(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    const numberOfPlayers = numberOfPlayersInputRef.current?.value
      ? parseInt(numberOfPlayersInputRef.current?.value)
      : 0;

    if (numberOfPlayers < 7 || numberOfPlayers > 12) {
      setIsNumberOfPlayersInvalid(true);
      setIsNumberOfPlayersConfirmed(false);
    } else {
      setIsNumberOfPlayersInvalid(false);
      setNumberOfPlayers(numberOfPlayers);
      setListOfPlayers(new Array(numberOfPlayers).fill(""));
      setIsNumberOfPlayersConfirmed(true);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmitNumberOfPlayers}>
        <div aria-label="form-holder" className="text-center">
          <div className="mb-5">
            <label htmlFor="">تعداد نفرات بازی را مشخص کنید</label>
          </div>
          <div className="mb-5">
            <input
              aria-label="number-of-players"
              ref={numberOfPlayersInputRef}
              dir="ltr"
              type="text"
              placeholder="0"
              onChange={handleInputChangeNumberOfPlayers}
              className="focus:outline-none focus:border-red-900 rounded shadow-md p-3 border-2"
            />
            <AlertForInvalidNumberOfPlayers
              isNumberOfPlayersInvalid={isNumberOfPlayersInvalid}
            />
          </div>
          <button
            type="submit"
            className="mb-8 bg-red-900 py-4 px-8 rounded text-[white]"
          >
            تایید
          </button>
        </div>
      </form>
    </>
  );
}
