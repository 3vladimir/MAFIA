/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import {Header} from '../components'

function Main() {
  return (
    <>
      <main>
        <div
          aria-label="whole-container"
          className="
          bg-[snow] lg:mt-20"
        >
          <form>
            <div aria-label="form-holder" className="text-center">
              <div className="mb-8 ">
                <label htmlFor="">تعداد نفرات بازی را مشخص کنید</label>
              </div>
              <div className="mb-8 ">
                <input
                  type="text"
                  placeholder="بین 7 تا 12 نفر"
                  className="focus:outline-none focus:border-red-900 rounded shadow-md p-3 border-2 "
                />
              </div>
              <button className="mb-8 bg-red-900 p-4 rounded text-[white]
              ">تایید</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default function App() {
  return(
    <>
    <Header/>
    <Main/>
    </>
  )
}
