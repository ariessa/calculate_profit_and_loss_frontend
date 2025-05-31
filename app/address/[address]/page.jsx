import { isAddress } from 'ethers';
import { notFound } from 'next/navigation';

export default async function AddressPage({ params }) {
  const { address } = await params;

  if (!isAddress(address)) {
    notFound(); // Renders the 404 page
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold">Address: {address}</h1>
    </main>
  );
}
