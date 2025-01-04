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
      <h1 className="text-center text-white 
      lg:text-8xl lg:pt-40
      sm:text-6xl
      text-4xl pt-36">
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
      <Title>پایان بازی</Title>
      <ContainerOfHeaderAndMain Main={<Main />} backgroundColor="bg-red-500" />
    </>
  );
}
export default App;
