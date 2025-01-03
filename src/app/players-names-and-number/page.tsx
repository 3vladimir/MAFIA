/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import {
  ContainerOfHeaderAndMain,
  FormForNameOfPlayers,
  FormForNumberOfPlayers,
  Title,
} from "../../components";

function Main() {
  const [numberOfPlayers, setNumberOfPlayers] = React.useState(0);
  const [isNumberOfPlayersConfirmed, setIsNumberOfPlayersConfirmed] =
    React.useState(false);
  const [isNumberOfPlayersInvalid, setIsNumberOfPlayersInvalid] =
    React.useState(false);
  const [listOfPlayers, setListOfPlayers] = React.useState([""]);

  return (
    <>
      <div aria-label="whole-container" className="mt-10">
        <main>
          <FormForNumberOfPlayers
            setIsNumberOfPlayersInvalid={setIsNumberOfPlayersInvalid}
            setIsNumberOfPlayersConfirmed={setIsNumberOfPlayersConfirmed}
            setNumberOfPlayers={setNumberOfPlayers}
            setListOfPlayers={setListOfPlayers}
            isNumberOfPlayersInvalid={isNumberOfPlayersInvalid}
          />

          {isNumberOfPlayersConfirmed && (
            <FormForNameOfPlayers
              listOfPlayers={listOfPlayers}
              numberOfPlayers={numberOfPlayers}
              setListOfPlayers={setListOfPlayers}
            />
          )}
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <Title>تعیین کردن تعداد و نام بازیکنان</Title>
      <ContainerOfHeaderAndMain Main={<Main />} />
    </>
  );
}
