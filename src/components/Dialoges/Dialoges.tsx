import * as React from "react";
type Props = {
  isNumberOfPlayersInvalid : boolean;
}

export function DialogForInvalidNumberOfPlayers({ isNumberOfPlayersInvalid }:Props) {
  return (
    <>
      {isNumberOfPlayersInvalid && (
        <div className="w-fit mx-auto text-red-500 mt-2">
          خطا!
          <br />
          تعداد بازیکنان مافیا باید بین 7 تا 12 نفر باشد
        </div>
      )}
    </>
  );
}
