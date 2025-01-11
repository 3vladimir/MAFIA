/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { role } from "@/lib/constantsValues";

export default function Form() {
  const playersInfo = useSelector((state: RootState) => state.players.value);
  const [
    isRequestForDetectiveInquiryTrue,
    setIsRequestForDetectiveInquiryTrue,
  ] = React.useState(false);
  const [isMarkedPlayerMafia, setIsMarkedPlayerMafia] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsRequestForDetectiveInquiryTrue(true);
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const playerName = event.target.value;
    const player = playersInfo.find((item) => {
      return item.name === playerName;
    });
    const rolesForTrueInquiryOfDetective = [role.LECTER, role.MAFIA];
    if (player) {
      if (rolesForTrueInquiryOfDetective.includes(player?.role)) {
        setIsMarkedPlayerMafia(true);
      } else {
        setIsMarkedPlayerMafia(false);
      }
    }
  }

  return (
    <>
      <div
        aria-label="form-holder"
        className="
        sm:mb-8
        mb-6"
      >
        <form aria-label="detective-inquiry" onSubmit={handleSubmit}>
          <div
            aria-label="flex-box-parent"
            className="w-11/12 mx-auto flex justify-center items-center"
          >
            <div aria-label="helper-element" className="basis-1/6"></div>
            <div aria-label="container-for-form-element" className="basis-2/3">
              <p
                className="text-gray-100
                lg:mb-2 lg:text-base
                mb-1 text-sm"
              >
                ابتدا کارآگاه را بیدار کنید
              </p>
              <div
                className="
                lg:mb-3
                mb-2"
                aria-label="container-for-label"
              >
                <label
                  htmlFor="detectiveInquiry"
                  className="text-gray-100
                  lg:text-base
                  text-sm"
                >
                  فردی که کارآگاه استعلام او را میخواهد مشخص کنید
                </label>
              </div>
              <select
                id="detectiveInquiry"
                onChange={handleSelectChange}
                className="rounded bg-gray-50 border-gray-200 
                lg:px-10 lg:py-3 lg:mb-5
                sm:text-base sm:px-8 sm:border-2
                text-sm px-6 py-2 mb-3 border-1 
                "
              >
                {playersInfo.map((item, index) => (
                  <option key={index}>{item.name}</option>
                ))}
              </select>
              <div className="mb-5" aria-label="container-for-button">
                <button
                  type="submit"
                  className="bg-green-400 rounded text-gray-800
                  lg:px-8 lg:py-4 
                  sm:px-6 sm:py-3 text-base
                  px-5 py-2 text-sm"
                >
                  تایید
                </button>
              </div>
            </div>

            {isRequestForDetectiveInquiryTrue ? (
              <div
                aria-label="request-for-detective"
                className="basis-1/6 text-gray-100"
              >
                <div
                  aria-label="flex parent"
                  className="flex flex-col items-center"
                >
                  <p
                    className="
                    lg:text-base
                    sm:text-sm
                    text-xs"
                  >
                    این علامت را به کارآگاه نشان دهید
                  </p>
                  {isMarkedPlayerMafia ? (
                    <BiSolidLike
                      className="
                      lg:text-9xl
                      sm:text-7xl
                      text-4xl"
                    />
                  ) : (
                    <BiSolidDislike
                      className="
                      lg:text-9xl
                      sm:text-7xl
                      text-4xl"
                    />
                  )}
                </div>
              </div>
            ) : (
              <div aria-label="helper-element" className="basis-1/6"></div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
