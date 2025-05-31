import { isAddress } from "ethers";
import { notFound } from "next/navigation";
import AddressClient from "./AddressClient";

export default function AddressPage({ params }) {
  const address = params.address;

  if (!isAddress(address)) {
    notFound();
  }

  return <AddressClient address={address} />;
}