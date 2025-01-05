"use client";
import { localStorageNames, gameModes } from "../../lib/constantsValues";
import { ContainerOfHeaderAndMain, Title } from "../../components";

function Main() {
  const gameResult =
    typeof window !== "undefined"
      ? localStorage.getItem(localStorageNames.gameMode)
      : "defaultValue";

  return (
    <>
      <h1
        dir="ltr"
        className="text-center text-white wildBreathOfZeldaFont tracking-widest
      lg:text-9xl lg:pt-40
      sm:text-7xl
      text-4xl pt-36"
      >
        {gameResult == gameModes.CITIZENS_WIN
          ? "CITIZENS WIN !!!"
          : "MAFIA WIN !!!"}
      </h1>
    </>
  );
}

function App() {
  return (
    <>
      <Title>پایان بازی</Title>
      <ContainerOfHeaderAndMain Main={<Main />} backgroundColor="bg-red-500" />
    </>
  );
}
export default App;
