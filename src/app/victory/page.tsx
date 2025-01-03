"use client";
import { localStorageNames, gameModes } from "../../lib/constantsValues";
import { ContainerOfHeaderAndMain } from "../../components";

function Main() {
  const gameResult = localStorage.getItem(localStorageNames.gameMode);

  return (
    <>
      <h1 className="text-center text-white text-8xl pt-40">
        {gameResult == gameModes.CITIZENS_WIN
          ? "شهروندان پیروز شدند !!!"
          : "مافیا پیروز شدند !!!"}
      </h1>
    </>
  );
}

function App() {
  return (
    <>
      <ContainerOfHeaderAndMain Main={<Main />} backgroundColor="bg-red-500" />
    </>
  );
}
export default App;
