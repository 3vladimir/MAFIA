"use client";
import { ContainerOfHeaderAndMain } from "../../../components";
import { usePathname } from "next/navigation";
import { daysToPersian } from "../../../lib/daysToPersian";

function Main() {
  const path = usePathname();
  const round = parseInt(path.slice(7));

  return (
    <>
      <div aria-label="whole-container" className="mt-10 w-11/12 mx-auto">
        <h1 className="text-center mb-10 font-extrabold text-xl text-white">
          {`شب ${daysToPersian({ round: round })}`}
        </h1>
      </div>
    </>
  );
}
function App() {
  return (
    <>
      <ContainerOfHeaderAndMain Main={<Main />} backgroundColor="bg-sky-950" />
    </>
  );
}
export default App;
