/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { Provider } from "react-redux";
import { store } from "../../redux/store/store";
import { ContainerOfHeaderAndMain } from "../../components";

function Main() {
  return <></>;
}

export default function App() {
  return (
    <>
      <Provider store={store}>
        <ContainerOfHeaderAndMain Main={<Main />} />
      </Provider>
    </>
  );
}
