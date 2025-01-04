import { HelmetProvider, Helmet } from "react-helmet-async";

function App({ children }: { children: string }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title dir="rtl">{`${children} | مافیا`}</title>
      </Helmet>
    </HelmetProvider>
  );
}

export default App;
