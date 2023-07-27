export const MARKETPLACE_ADDRESS = "0x48e26cD4E7534504c77d9642c6AE8B185c5F4AeA";

export const formatAddress = (address) => {
    return address.slice(0, 6) + "...." + address.slice(-4);
};