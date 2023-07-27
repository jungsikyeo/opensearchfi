/* eslint-disable @next/next/no-img-element */
import { formatAddress, MARKETPLACE_ADDRESS } from "@/helpers/utils";
import styles from "@/styles/ListingCard.module.css";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ListingCard({ listing, dList }) {
  const { asset, pricePerToken, creatorAddress, id, endTimeInSeconds } =
    listing;
  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const [loading, setLoading] = useState();

  const address = useAddress();

  const handleDlist = async () => {
    setLoading(true);
    try {
      await contract.directListings.cancelListing(id);
      dList(id);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const buyListing = async () => {
    setLoading(true);
    try {
      await contract.directListings.buyFromListing(id, 1);
    } catch (error) {
      console.log(error);
      toast.error("Some error occured");
    }
    setLoading(false);
  };

  const byAddress = creatorAddress === address;

  const showBuy =
    // parseInt(endTimeInSeconds._hex.toString(), 16) >
    endTimeInSeconds > Math.floor(new Date().getTime() / 1000);

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img src={asset.image} alt={asset.name} />
      </div>
      <p id={styles.NFTName}>{asset.name}</p>

      <p id={styles.creator}>by {formatAddress(creatorAddress)}</p>
      <p>Current Price</p>
      <div className={styles.footer}>
        <div className={styles.price}>
          <FaEthereum />
          <p>{ethers.utils.formatEther(pricePerToken)}</p>
        </div>
        {loading ? (
          <div id={styles.buy}>
            <div className="loader2"></div>
          </div>
        ) : (
          <div id={styles.buy}>
            {address === creatorAddress && (
              <button
                disabled={loading}
                onClick={handleDlist}
                id={styles.dlist}
              >
                De-List
              </button>
            )}
            {address &&
              !byAddress &&
              (showBuy ? (
                <button onClick={buyListing} disabled={loading}>
                  Buy
                </button>
              ) : (
                <p className={styles.expire}>Expired</p>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
