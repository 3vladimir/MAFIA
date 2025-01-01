import { useRouter } from "next/navigation";
import { distributionOfRolesAddress } from "../../routes";
import { randomNames } from "../../lib/randomNames";

type Props = {
  listOfPlayers: string[];
  numberOfPlayers: number;
  setListOfPlayers: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Form({
  listOfPlayers,
  numberOfPlayers,
  setListOfPlayers,
}: Props) {
  const router = useRouter();

  function handleClickRandomNames(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const newListOfPlayers = [...listOfPlayers];
    const newRandomNames = [...randomNames];
    for (let i = 0; i < numberOfPlayers; i++) {
      const randomNumber =
        Math.floor(Math.random() * newRandomNames.length - 1) + 1;
      newListOfPlayers[i] = newRandomNames[randomNumber];
      newRandomNames.splice(randomNumber, 1);
    }
    setListOfPlayers(newListOfPlayers);
  }

  function handleSubmitNamesOfPlayers(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(distributionOfRolesAddress);
  }
  return (
    <>
      <form onSubmit={handleSubmitNamesOfPlayers}>
        <div aria-label="form-holder" className="text-center mb-10">
          <div className="mb-2">
            نام بازیکنان را وارد کنید
            <button
              onClick={handleClickRandomNames}
              className="absolute top-[355px] left-[450px] text-blue-700"
            >
              ایجاد اسم های رندوم
            </button>
          </div>
          {[
            ...listOfPlayers.map((item, index) => (
              <li key={index} className="mb-1">
                <input
                  required
                  defaultValue={item}
                  type="text"
                  className="focus:outline-none border-2 p-3 text-center shadow"
                />
              </li>
            )),
          ]}
          <button
            type="submit"
            className="mt-2 bg-red-900 py-4 px-20 rounded text-[white]"
          >
            شروع
          </button>
        </div>
      </form>
    </>
  );
}
