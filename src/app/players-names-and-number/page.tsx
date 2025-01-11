/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import {
  WholeContainer,
  FormForNameOfPlayers,
  FormForNumberOfPlayers,
} from "../../components";

function Main() {
  const [numberOfPlayers, setNumberOfPlayers] = React.useState(0);
  const [isNumberOfPlayersConfirmed, setIsNumberOfPlayersConfirmed] =
    React.useState(false);
  const [listOfPlayers, setListOfPlayers] = React.useState([""]);

  return (
    <>
      <div
        aria-label="whole-container"
        className="
        lg:my-10
        my-40"
      >
        <main>
          <FormForNumberOfPlayers
            setIsNumberOfPlayersConfirmed={setIsNumberOfPlayersConfirmed}
            setNumberOfPlayers={setNumberOfPlayers}
            setListOfPlayers={setListOfPlayers}
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
      <WholeContainer
        Main={<Main />}
        title="تعیین تعداد و نام بازیکنان"
      />
    </>
  );
}
