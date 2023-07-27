/* eslint-disable @next/next/no-img-element */
import { useDataContext } from "@/context/dataContext";
import styles from "@/styles/Layout.module.css";
import { ChainId, useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import MintModal from "./MintModal";

const Layout = ({ title, description, children }) => {
  const {
    showMintModal,
    setShowMintModal,
    collectionContract,
    setCollectionContract,
  } = useDataContext();
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const switchNet = () => {
    switchNetwork(ChainId.Goerli);
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/searchfi-logo.png"
        />
      </Head>

      {isMismatched && (
        <p onClick={switchNet} className={styles.stripe}>
          You need to <span>Switch to Goerli testnet</span> to interact with
          this marketplace.
        </p>
      )}
      <div className={styles.container}>
        <Header setShowMintModal={setShowMintModal} />
        <div className={styles.children}>
          {children}
          <ToastContainer
            position="bottom-center"
            hideProgressBar={false}
            newestOnTop
          />
        </div>
        <Footer />
      </div>
      <MintModal
        show={showMintModal}
        onClose={() => {
          setShowMintModal(false);
        }}
        collectionContract={collectionContract}
        setCollectionContract={setCollectionContract}
      />
    </div>
  );
};

Layout.defaultProps = {
  title: "OpenSearchFi | Thirdweb Marketplace",
  description: "Create your collection, Mint NFT and list for sale.",
};

export default Layout;
