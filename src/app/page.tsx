/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import * as React from "react";
import Link from "next/link";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import { WholeContainer } from "@/components";
import {
  playersNamesAndNumberPageAddress,
  distributionOfRolesAddress,
} from "@/routes";
import { localStorageNames, YES, NO } from "@/lib/constantsValues";

function Main() {
  const [isGameStarted, setIsGameStarted] = React.useState(false);
  React.useEffect(() => {
    if (!localStorage.getItem(localStorageNames.isGameStarted)) {
      // if localStorage is null,it should get the value of "no"
      localStorage.setItem(localStorageNames.isGameStarted, NO);
    } else if (localStorage.getItem(localStorageNames.isGameStarted) == YES) {
      setIsGameStarted(true);
    }
  });

  return (
    <>
      <div
        aria-label="whole-container"
        className="lg:bg-[url('/Images/mafia-images/large.jpg')] 
        sm:bg-[url('/Images/mafia-images/medium.jpg')]
        bg-[url('/Images/mafia-images/small.jpg')]
        bg-cover bg-center h-full
        "
      >
        <main>
          {isGameStarted ? (
            // a game is on.so you have a chice to continue that or start anew
            <>
              <div
                aria-label="container-of-links"
                className="
                sm:pt-6
                pt-9
                "
              >
                <Link
                  href={distributionOfRolesAddress}
                  className="table mx-auto"
                >
                  <div
                    className="text-white bg-blackAndRedLinearGradient
                    hover:scale-110 transition duration-300
                    lg:p-9 lg:rounded-xl lg:text-4xl lg:mb-5
                    sm:p-6 sm:text-3xl
                    p-5 rounded-lg text-2xl mb-3
                    "
                  >
                    ادامه بازی قبل
                  </div>
                </Link>

                <Link
                  href={playersNamesAndNumberPageAddress}
                  className="table mx-auto"
                >
                  <div
                    className="text-white bg-blackAndRedLinearGradient 
                    hover:scale-110 transition duration-300
                    lg:p-9 lg:rounded-xl lg:text-4xl
                    sm:p-6 sm:text-3xl
                    p-5 rounded-lg text-2xl
                    "
                  >
                    بازی جدید
                  </div>
                </Link>
              </div>
            </>
          ) : (
            // there is no game on so you just can start a new game
            <div aria-label="container-of-link" className="pt-24">
              <Link
                href={playersNamesAndNumberPageAddress}
                className="table mx-auto"
              >
                <div
                  className="text-white bg-blackAndRedLinearGradient 
                  hover:scale-110 transition duration-300
                  lg:p-10 lg:rounded-xl lg:text-4xl
                  sm:p-6 sm:text-3xl
                  p-5 rounded-lg text-2xl
                  "
                >
                  شروع یک بازی
                </div>
              </Link>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <Provider store={store}>
        <WholeContainer Main={<Main />} title="صفحه اصلی" />
      </Provider>
    </>
  );
}
