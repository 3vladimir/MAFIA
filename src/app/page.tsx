/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { ContainerOfHeaderAndMain } from "../components";
import { playersNamesAndNumberPageAddress } from "../routes";

function Main() {
  return (
    <>
      <div
        aria-label="banner"
        className="bg-[url('../../public/Images/mafia-background.jpg')] h-full"
      >
        <div aria-label="container-of-link" className="pt-32">
          <Link href={playersNamesAndNumberPageAddress}>
            <div
              className="text-white bg-blackAndRedGradient table mx-auto p-10 
            rounded-xl text-4xl hover:scale-110 transition duration-300"
            >
              شروع یک بازی
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <Provider store={store}>
        <ContainerOfHeaderAndMain Main={<Main />} />
      </Provider>
    </>
  );
}
