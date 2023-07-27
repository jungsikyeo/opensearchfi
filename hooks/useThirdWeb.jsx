/* eslint-disable @next/next/no-img-element */
import { useAddress, useContract, useSDK } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

export default function useThirdWeb() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const address = useAddress();
  const sdk = useSDK();
  const { contract } = useContract(
    "0x48e26cD4E7534504c77d9642c6AE8B185c5F4AeA",
  );

  const { contract: collectionContract } = useContract(
    "0x8f7a1e287A538b1AB21871306D1e4c8e93259fA1",
  );

  useEffect(() => {
    console.log(contract);
    if (!contract) return;
    getListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  //! Fetching all the listings
  const getListings = async () => {
    try {
      if (!!listings.length) throw "Restricting re-fetch";
      const list = await contract.getAllListings();
      setListings(list);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //! Create a new collection on the behalf of user
  const createCollection = async () => {
    try {
      const contractAddress = await sdk.deployer.deployNFTCollection({
        name: process.env.NEXT_PUBLIC_CONTRACT_NAME,
        symbol: process.env.NEXT_PUBLIC_CONTRACT_SYMBOL,
        // this address comes from connected wallet address
        primary_sale_recipient: address,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //! List any NFT from any collection to the marketplace
  const createDirectListing = async () => {
    const listing = {
      //TODO address of the contract the asset you want to list is on
      assetContractAddress: "0x...",
      // token ID of the asset you want to list
      tokenId: "0",
      // when should the listing open up for offers
      startTimestamp: new Date(),
      // how long the listing will be open for
      listingDurationInSeconds: 86400,
      // how many of the asset you want to list
      quantity: 1,
      // address of the currency contract that will be used to pay for the listing
      currencyContractAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      // how much the asset will be sold for
      buyoutPricePerToken: "1.5",
    };

    const tx = await contract.direct.createListing(listing);
    const id = tx.id; // the id of the newly created listing
  };

  //! Mint new NFT to collection
  const mintNft = async ({ name, description, image }) => {
    // Custom metadata of the NFT, note that you can fully customize this metadata with other properties.
    const metadata = {
      name,
      description,
      image, // This can be an image url or file
    };
    try {
      const tx = await collectionContract.mintTo(address, metadata);
      const tokenId = tx.id; // the id of the NFT minted
      let nft = await tx.data(); // (optional) fetch details of minted NFT

      console.log(tx);
      console.log(nft);
      return nft;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getCollectionContract = async () => {
    const url = `https://deep-index.moralis.io/api/v2/${address}/nft/collections?chain=mumbai`;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-Key":
            "8SdNPyuDmzLJLVhYIWuchPbkjSQ9CWuBNxrA4ZWjyj6dozJKqWpEqM2uyCJJSTdt",
        },
      });
      const data = await res.json();
      console.log(data.result[0].token_address);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoading,
    listings,
    createCollection,
    getListings,
    createDirectListing,
    mintNft,
  };
}
