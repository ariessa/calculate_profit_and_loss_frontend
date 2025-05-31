import { isAddress } from "ethers";
import { notFound } from "next/navigation";
import AddressClient from "./AddressClient";

export default function AddressPage({ params }) {
  const address = params.address;

  if (!isAddress(address)) {
    notFound(); // Render 404 page
  }

  return <AddressClient address={address} />;
}