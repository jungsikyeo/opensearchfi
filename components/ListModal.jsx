/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { MARKETPLACE_ADDRESS } from "@/helpers/utils";
import styles from "@/styles/MintModal.module.css";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useCreateDirectListing,
} from "@thirdweb-dev/react";
import {
  ChainId,
  ListingType,
  Marketplace,
  NATIVE_TOKENS,
} from "@thirdweb-dev/sdk";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { RadioButton } from "./RadioButton";

export default function ListModal({
  show,
  onClose,
  getListings,
  nfts,
  setShowMintModal,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    price: "",
    NFT: 0,
  });

  const address = useAddress();

  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const {
    mutate: createDirectListing,
    isLoading,
    error,
  } = useCreateDirectListing(contract);

  const handleClose = () => {
    setFormData({
      price: "",
      NFT: 0,
    });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newListing = {
      assetContractAddress: nfts[formData.NFT].value.tokenAddress,
      tokenId: nfts[formData.NFT].value.tokenId,
      pricePerToken: formData.price,
      // currencyContractAddress: NATIVE_TOKENS,
      isReservedListing: false,
      quantity: 1,
      startTimestamp: new Date(),
      endTimestamp: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    };

    try {
      await contract.directListings.createListing(newListing);
      getListings();
    } catch (error) {
      console.log(error);
    }
    handleClose();
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMint = () => {
    handleClose();
    setShowMintModal(true);
  };

  return (
    <>
      <div
        className={`overlay ${show ? "showOverlay" : ""}`}
        onClick={handleClose}
      />
      <div className={`${styles.modal}  ${show ? styles.showModal : ""}`}>
        {address ? (
          !nfts.length ? (
            <div className={styles.header}>
              <span className={styles.title}>
                <p>List For Sale</p>
                <p>
                  <span id={styles.headerLink} onClick={handleMint}>
                    Create collection and mint NFT first to
                  </span>
                  <br /> Create a listing
                </p>
              </span>

              <span onClick={handleClose} id={styles.close}>
                <AiOutlineClose />
              </span>
            </div>
          ) : (
            <>
              <div className={styles.header}>
                <span className={styles.title}>
                  <p>List For Sale</p>
                </span>

                <span onClick={handleClose} id={styles.close}>
                  <AiOutlineClose />
                </span>
              </div>
              <h3 id={styles.meta}>Settings</h3>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.checks}>
                  {nfts.map((each, i) => (
                    <RadioButton
                      key={i + 1}
                      changed={handleChange}
                      id={i + 1}
                      isSelected={formData.NFT == i}
                      label={each.label}
                    />
                  ))}
                </div>
                <div className="input-group">
                  <label className="required" htmlFor="price">
                    Listing Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                  <p>The price of each token you are listing for sale.</p>
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 4,
                  }}
                >
                  <BiHelpCircle
                    style={{
                      minWidth: 20,
                      minHeight: 20,
                    }}
                  />
                  <p>
                    2 Transaction will take place to List the NFT. Keep an eye
                    on the metamask extension icon if its not prompted
                    automatically.
                  </p>
                </div>
                <div className={styles.cta}>
                  <button
                    onClick={handleClose}
                    disabled={loading}
                    type="button"
                  >
                    Close
                  </button>

                  <button disabled={loading} type="submit">
                    {loading ? <Loader /> : <p>List For Sale</p>}
                  </button>
                </div>
              </form>
            </>
          )
        ) : (
          <div className={styles.header}>
            <ConnectWallet />

            <span onClick={handleClose} id={styles.close}>
              <AiOutlineClose />
            </span>
          </div>
        )}
      </div>
    </>
  );
}

function Loader() {
  return <div className="loader"></div>;
}
