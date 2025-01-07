"use client";
import * as React from "react";

import { AlertForInvalidNumberOfPlayers } from "../../components";

type Props = {
  setIsNumberOfPlayersConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  setNumberOfPlayers: React.Dispatch<React.SetStateAction<number>>;
  setListOfPlayers: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Form({
  setIsNumberOfPlayersConfirmed,
  setNumberOfPlayers,
  setListOfPlayers,
}: Props) {
  const numberOfPlayersInputRef = React.useRef<HTMLInputElement>(null);
  const [isNumberOfPlayersValid, setIsNumberOfPlayersvalid] =
    React.useState(true);

  function handleInputChangeNumberOfPlayers() {
    const validInputs = /^[1-9][0-9]*$/;

    if (numberOfPlayersInputRef.current) {
      setIsNumberOfPlayersvalid(true);

      if (!validInputs.test(numberOfPlayersInputRef.current.value)) {
        // the input is anything exept number
        numberOfPlayersInputRef.current.value = "";
      }
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
      // number of players is invalid
      setIsNumberOfPlayersvalid(false);
      setIsNumberOfPlayersConfirmed(false);
    } else {
      // number of players is valid
      setIsNumberOfPlayersvalid(true);
      setNumberOfPlayers(numberOfPlayers);
      setListOfPlayers(new Array(numberOfPlayers).fill(""));
      // create list of players considering the number of players
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
              id="numberOfPlayers"
              ref={numberOfPlayersInputRef}
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
              isNumberOfPlayersValid={isNumberOfPlayersValid}
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
