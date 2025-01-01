/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { ContainerOfHeaderAndMain } from "../components";
import { playersNamesAndNumbersPageAddress } from "../routes";

function Main() {
  return (
    <>
      <div
        aria-label="banner"
        className="bg-[url('../../public/Images/mafia-background.jpg')] h-full"
      >
        <div aria-label="container-of-link" className="pt-32">
          <Link href={playersNamesAndNumbersPageAddress}>
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
      <ContainerOfHeaderAndMain Main={<Main />} />
    </>
  );
}
