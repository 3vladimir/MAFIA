/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { role } from "../../lib/constantsValues";

export default function Form() {
  const playersInfo = useSelector((state: RootState) => state.players.value);
  const [requestForDetective, setRequestForDetective] = React.useState(false);
  const [isMarkedPlayerMafia, setIsMarkedPlayerMafia] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestForDetective(true);
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const playerName = event.target.value;
    const player = playersInfo.find((item) => {
      return item.name === playerName;
    });
    if (player?.role == role.LECTER || player?.role == role.MAFIA) {
      setIsMarkedPlayerMafia(true);
    } else {
      setIsMarkedPlayerMafia(false);
    }
  }

  return (
    <>
      <form aria-label="detective-inquiry" onSubmit={handleSubmit}>
        <p className="mb-2 text-gray-100">ابتدا کارآگاه را بیدار کنید</p>
        <div className="mb-3" aria-label="container-for-label">
          <label htmlFor="detectiveInquiry" className="text-gray-100">
            فردی که کارآگاه استعلام او را میخواهد مشخص کنید
          </label>
        </div>
        <select
          id="detectiveInquiry"
          onChange={handleSelectChange}
          className="px-10 py-3 rounded bg-gray-50 border-2 border-gray-200 mb-5"
        >
          {[...playersInfo].map((item, index) => (
            <option key={index}>{item.name}</option>
          ))}
        </select>
        <div className="mb-5" aria-label="container-for-button">
          <button
            type="submit"
            className="mb-8 bg-green-400 py-4 px-8 rounded text-gray-800"
          >
            تایید
          </button>
          {requestForDetective && (
            <div
              aria-label="request-for-detective"
              className="absolute left-64 top-64 text-gray-100"
            >
              <p>این علامت را به کارآگاه نشان دهید</p>
              {isMarkedPlayerMafia ? (
                <BiSolidLike className="text-9xl" />
              ) : (
                <BiSolidDislike className="text-9xl" />
              )}
            </div>
          )}
        </div>
      </form>
    </>
  );
}
