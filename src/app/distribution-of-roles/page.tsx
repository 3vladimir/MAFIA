/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { ContainerOfHeaderAndMain } from "../../components";

function Main() {
  return <></>;
}

export default function App() {
  return (
    <>
      <ContainerOfHeaderAndMain Main={<Main />} />
    </>
  );
}
