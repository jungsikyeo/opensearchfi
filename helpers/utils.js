export const MARKETPLACE_ADDRESS = "0xd613C54FC8A745046d3a3010f1f15b1563E2EEA7";

export const formatAddress = (address) => {
  return address.slice(0, 6) + "...." + address.slice(-4);
};
