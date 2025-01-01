/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { ContainerOfHeaderAndMain } from "../../../components";
import { usePathname } from "next/navigation";

function Main() {
    const path = usePathname()
    const round = path.slice(5)
  return (
    <>
    
    </>
  );
}

function App() {
  return (
    <>
      <ContainerOfHeaderAndMain Main={<Main />} />;
    </>
  );
}

export default App;
