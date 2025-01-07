/* eslint-disable @typescript-eslint/no-unused-vars */
import { Provider } from "react-redux";
import { store } from "../../redux/store/store";
import { JSX } from "react/jsx-runtime";
import { Header } from "../../components";

type Props = {
  Main: JSX.Element;
  backgroundColor?: string;
};

export default function Container({
  Main,
  backgroundColor = "bg-[snow]",
}: // default color for pages
Props) {
  const classessOfMain = `grow ${backgroundColor}`;
  return (
    <>
      <Provider store={store}>
        <div className="absolute inset-0 flex flex-col ">
          <Header />
          <div className={classessOfMain}>{Main}</div>
        </div>
      </Provider>
    </>
  );
}
