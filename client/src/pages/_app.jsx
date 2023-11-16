import Head from "next/head";
import "@/styles/globals.css";
import { StateProvider } from "@/context/StateContext";
import reducer, { initialState } from "@/context/StateReducers";

const App = ({ Component, pageProps }) => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Head>
        <title>Whatsapp</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <Component {...pageProps} />
    </StateProvider>
  );

  // return <Component {...pageProps} />;
};

export default App;
