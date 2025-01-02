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
        <div className="mb-3">
          <label htmlFor="outPlayerSelect">بازیکن خروجی را مشخص</label>
        </div>
        <select
          id="outPlayerSelect"
          onChange={handleSelectChange}
          className="px-10 py-3 rounded bg-white border-2 border-gray-200 mb-8"
        >
          <option>هیچکس</option>
          {[...playersInfo].map((item, index) => (
            <option key={index}>{item.name}</option>
          ))}
        </select>
        <div aria-label="container-of-button">
          <button
            className="bg-sky-500 text-gray-100 px-10 py-3 rounded"
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
