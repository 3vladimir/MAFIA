/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { WholeContainer, FormForNightActions } from "@/components";
import { usePathname } from "next/navigation";
import { nightAddress } from "@/routes";
import { daysToPersian } from "@/lib/daysToPersian";

function Main() {
  const path = usePathname();
  const lengthOfNightAddress = nightAddress.length + 1;
  // current address is something like: '/night/NUMBER' and we need only that NUMBER
  const round = parseInt(path.slice(lengthOfNightAddress));

  return (
    <>
      <div
        aria-label="whole-container"
        className="
        lg:mt-10
        mt-14"
      >
        <h1
          className="
          table mx-auto mb-10 rounded font-extrabold text-white bg-blackAndYellowLinearGradient
          lg:px-10 lg:py-3 lg:text-xl
          sm:px-8 sm:py-2 sm:text-lg
          px-5 py-2 text-base
          "
        >
          {`شب ${daysToPersian({ round: round })}`}
        </h1>

        <div aria-label="forms-container" className="text-center">
          <FormForNightActions />
        </div>
      </div>
    </>
  );
}
function App() {
  return (
    <>
      <WholeContainer
        Main={<Main />}
        title="شب بازی"
        backgroundColor="bg-sky-950"
      />
    </>
  );
}
export default App;
