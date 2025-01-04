/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import Link from "next/link";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { ContainerOfHeaderAndMain, Title } from "../components";
import {
  playersNamesAndNumberPageAddress,
  distributionOfRolesAddress,
} from "../routes";
import { localStorageNames } from "../lib/constantsValues";

function Main() {
  const [isGameStarted, setIsGameStarted] = React.useState(false);
  React.useEffect(() => {
    if (!localStorage.getItem(localStorageNames.isGameStarted)) {
      localStorage.setItem(localStorageNames.isGameStarted, "no");
      setIsGameStarted(false);
    } else if (localStorage.getItem(localStorageNames.isGameStarted) == "yes") {
      setIsGameStarted(true);
    } else {
      setIsGameStarted(false);
    }
  }, []);

  return (
    <>
      <div
        aria-label="banner"
        className="lg:bg-[url('/Images/mafia-images/large.jpg')] 
        sm:bg-[url('/Images/mafia-images/medium.jpg')]
        bg-[url('/Images/mafia-images/small.jpg')]
        bg-cover bg-center h-full
        "
      >
        {isGameStarted ? (
          <>
            <div
              aria-label="container-of-link"
              className="
              sm:sp-6
              pt-9
              "
            >
              <Link href={distributionOfRolesAddress}>
                <div
                  className="text-white bg-blackAndRedLinearGradient table mx-auto
                  hover:scale-110 transition duration-300
                  lg:p-9 lg:rounded-xl lg:text-4xl lg:mb-5
                  sm:p-6 sm:text-3xl
                  p-5 rounded-lg text-2xl mb-3
                  "
                >
                  ادامه بازی قبل
                </div>
              </Link>

              <Link href={playersNamesAndNumberPageAddress}>
                <div
                  className="text-white bg-blackAndRedLinearGradient table mx-auto 
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
          <div aria-label="container-of-link" className="pt-24">
            <Link href={playersNamesAndNumberPageAddress}>
              <div
                className="text-white bg-blackAndRedLinearGradient table mx-auto 
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
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <Title>صفحه اصلی</Title>
      <Provider store={store}>
        <ContainerOfHeaderAndMain Main={<Main />} />
      </Provider>
    </>
  );
}
