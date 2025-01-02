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
}: Props) {
  const classess = `grow ${backgroundColor}`;
  return (
    <>
      <Provider store={store}>
        <div className="absolute inset-0 flex flex-col">
          <Header />
          <div className={classess}>{Main}</div>
        </div>
      </Provider>
    </>
  );
}
