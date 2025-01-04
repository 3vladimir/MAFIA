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
          <div
            aria-label="container-for-label"
            className="
          lg:mb-5
          mb-3"
          >
            <label
              htmlFor="numberOfPlayers"
              className="
            lg:text-base
            text-sm"
            >
              تعداد نفرات بازی را مشخص کنید
            </label>
          </div>
          <div
            className="
          lg:mb-5
          mb-3"
          >
            <input
              aria-label="number-of-players"
              ref={numberOfPlayersInputRef}
              id="numberOfPlayers"
              dir="ltr"
              type="text"
              placeholder="0"
              onChange={handleInputChangeNumberOfPlayers}
              className="focus:outline-none focus:border-red-900 rounded shadow-md 
              lg:p-3 lg:border-2 lg:text-base
              p-2 border-1 text-sm
              placeholder:text-sm
              placeholder:lg:text-base
              "
            />
            <AlertForInvalidNumberOfPlayers
              isNumberOfPlayersInvalid={isNumberOfPlayersInvalid}
            />
          </div>
          <button
            type="submit"
            className="bg-red-900 rounded text-[white]
            lg:py-4 lg:px-8
            sm:text-base
            py-3 px-6 text-sm mb-8"
          >
            تایید
          </button>
        </div>
      </form>
    </>
  );
}
