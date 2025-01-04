/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { Player } from "../../types";

type Props = {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayerOut: React.Dispatch<React.SetStateAction<string>>;
  playersInfo: Player[];
};

function Form({ setOpenDialog, setPlayerOut, playersInfo }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOpenDialog(true);
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPlayerOut(event.target.value.toString());
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div aria-label="containe-for-label" className="mb-3">
          <label
            htmlFor="outPlayerSelect"
            className="
            lg:text-base
            text-sm"
          >
            بازیکن خروجی را مشخص کنید
          </label>
        </div>
        <select
          id="outPlayerSelect"
          onChange={handleSelectChange}
          className="rounded bg-white border-gray-200 
          lg:px-10 lg:py-3 lg:border-2 lg:mb-8
          sm:px-7 sm:py-2 sm:border-2 sm:mb-4 sm:text-base
          px-5 py-1 border-1 mb-2 text-sm
          "
        >
          <option>هیچکس</option>
          {[...playersInfo].map((item, index) => (
            <option key={index}>{item.name}</option>
          ))}
        </select>
        <div aria-label="container-of-button">
          <button
            className="bg-sky-500 text-gray-100 rounded
            lg:px-10 lg:py-3
            sm:px-8 sm:text-base
            px-6 py-2 text-sm"
            type="submit"
          >
            تایید
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
