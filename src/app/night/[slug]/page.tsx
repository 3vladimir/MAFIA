/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import {
  ContainerOfHeaderAndMain,
  FormForDetectiveInquiry,
  FormForNightActions,
  Title,
} from "../../../components";
import { usePathname } from "next/navigation";
import { daysToPersian } from "../../../lib/daysToPersian";

function Main() {
  const path = usePathname();
  const round = parseInt(path.slice(7));

  return (
    <>
      <div aria-label="whole-container" className="mt-10">
        <h1
          className="table mx-auto rounded mb-10 font-extrabold text-xl text-white
        bg-blackAndYellowLinearGradient px-8 py-3"
        >
          {`شب ${daysToPersian({ round: round })}`}
        </h1>

        <div aria-label="forms-container" className="text-center">
          <FormForDetectiveInquiry />
          <FormForNightActions />
        </div>
      </div>
    </>
  );
}
function App() {
  return (
    <>
      <Title>شب بازی</Title>
      <ContainerOfHeaderAndMain Main={<Main />} backgroundColor="bg-sky-950" />
    </>
  );
}
export default App;
