import { Provider } from "react-redux";
import { store } from "../../redux/store/store";
import { JSX } from "react/jsx-runtime";
import { Header } from "../../components";

type Props = {
  Main: JSX.Element;
};

export default function Container({ Main }: Props) {
  return (
    <>
      <Provider store={store}>
        <div className="absolute inset-0 flex flex-col">
          <Header />
          <div className="grow bg-[snow]">{Main}</div>
        </div>
      </Provider>
    </>
  );
}
