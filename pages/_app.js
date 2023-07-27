import "../styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import DataProvider from "@/context/dataContext";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain="goerli"
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    >
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
