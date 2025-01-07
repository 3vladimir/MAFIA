"use client";
const randomNames = [
  "نیلوفر",
  "نگار",
  "بیتا",
  "پردیس",
  "ریحانه",
  "زهرا",
  "هانیه",
  "مائده",
  "علی",
  "کاوه",
  "کورش",
  "متین",
  "سجاد",
  "امین",
  "احسان",
];

type Props = {
  listOfPlayers: string[];
  numberOfPlayers: number;
  setListOfPlayers: React.Dispatch<React.SetStateAction<string[]>>;
};

function produceRandomNames({
  listOfPlayers,
  setListOfPlayers,
  numberOfPlayers,
}: Props) {
  const newListOfPlayers = [...listOfPlayers];
  // helping array
  const newRandomNames = [...randomNames];
  // helping array

  for (let i = 0; i < numberOfPlayers; i++) {
    const randomNumber =
      typeof window !== "undefined"
        ? Math.floor(Math.random() * (newRandomNames.length - 1)) + 1
        : 0;
    newListOfPlayers[i] = newRandomNames[randomNumber];
    newRandomNames.splice(randomNumber, 1);
    // get a random name to an index and delete that name from the list
  }
  setListOfPlayers(newListOfPlayers);
}

export default produceRandomNames;
