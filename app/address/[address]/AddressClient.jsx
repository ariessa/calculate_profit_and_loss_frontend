"use client";

import Image from "next/image";
import { blo } from "blo";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function AddressClient({ address }) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [mobileInput, setMobileInput] = useState("");
  const { address: addressParam } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!addressParam) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/address/${addressParam}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch address data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [addressParam]);

  const handleSearch = (value) => {
    if (value.trim()) {
      router.push(`/address/${value.trim()}`);
    }
  };

  const format_pnl = (value, colour = false) => {
    const num = Number(value);

    if (isNaN(num)) {
      return <span className="text-gray-900">$0.00</span>;
    }

    const absVal = Math.abs(num);
    const formatted = absVal.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });

    const sign = num < 0 ? "-" : "";
    const color =
      num > 0 ? "text-green-600" : num < 0 ? "text-red-600" : "text-gray-900";

    return (
      <span className={colour ? "text-gray-900" : color}>
        {sign}${formatted}
      </span>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data found</p>;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="bg-white border-b-2 border-gray-800">
        <nav
          aria-label="Global"
          className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 sm:gap-y-4 lg:px-8"
        >
          {/* Left section: Logo and Title */}
          <div className="flex items-center gap-x-4">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Calculate Profit and Loss</span>
              <Image
                src="/logo.svg"
                width={30}
                height={30}
                alt="Project Logo"
                className="border-2 border-gray-800 rounded-full"
              />
            </a>
            <p className="text-md sm:text-lg font-semibold text-gray-800">
              Calculate Profit and Loss
            </p>
          </div>

          <div className="hidden md:block">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchInput);
              }}
            >
              <div className="relative border-2 border-gray-600 p-2 min-w-sm w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none stroke-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="focus:outline-none focus:ring-0 block w-full pl-10 sm:text-sm font-medium text-gray-800 placeholder:font-medium border-gray-300 rounded-md"
                  placeholder="Search for an address..."
                />
              </div>
            </form>
          </div>
        </nav>
      </header>

      {/* Search bar for mobile (shown only on small screens) */}
      <div className="block md:hidden px-6 pt-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchInput);
          }}
        >
          <div className="relative border-2 border-gray-600 py-2 max-w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none stroke-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={mobileInput}
              onChange={(e) => setMobileInput(e.target.value)}
              className="focus:outline-none focus:ring-0 block w-full ml-12 text-sm font-medium text-gray-800 placeholder:font-medium border-gray-300 rounded-md"
              placeholder="Search for an address..."
            />
          </div>
        </form>
      </div>

      <main className="flex-1 overflow-auto bg-white">
        <div className="mx-6 my-8 sm:mx-8 sm:my-16 lg:mx-8 flex gap-x-4 items-center justify-center">
          <img
            src={blo(address)}
            alt="Identicon"
            className="rounded-full h-8 w-8 sm:h-10 sm:w-10 border-2 border-gray-800"
          />

          {/* Truncated address on small screens */}
          <h1
            className="text-lg font-semibold text-gray-700 block sm:hidden"
            title={address}
          >
            {address.slice(0, 8)}...{address.slice(-8)}
          </h1>

          {/* Full address on medium and larger screens */}
          <h1
            className="text-xl font-semibold text-gray-700 hidden sm:block"
            title={address}
          >
            {address}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center mx-6 sm:mx-12">
          <dl className="w-full max-w-4xl border-2 border-gray-800 bg-white gap-y-2 px-4 py-4 sm:py-10 sm:px-6 xl:px-8 sm:text-center">
            <dt className="text-sm font-medium text-gray-800">Total PnL</dt>
            <dd className="text-2xl sm:text-6xl font-medium tracking-tight text-gray-900">
              {format_pnl(data?.pnl?.total_pnl)}
            </dd>
          </dl>

          <dl className="w-full max-w-4xl mb-10 border-b-2 border-x-2 border-gray-800 grid grid-cols-1 gap-0.5 bg-gray-800 sm:grid-cols-2">
            <div className="flex flex-wrap sm:items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-4 sm:py-10 sm:px-6 xl:px-8">
              <div className="flex gap-x-2 items-center">
                <dt className="text-sm font-medium text-gray-800">
                  Realised PnL
                </dt>
              </div>
              <dd className="w-full text-2xl sm:text-4xl font-medium tracking-tight text-gray-900 text-left">
                {format_pnl(data?.pnl?.realised_pnl)}
              </dd>
            </div>
            <div className="flex flex-wrap sm:items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-4 sm:py-10 sm:px-6 xl:px-8">
              <div className="flex gap-x-2 items-center">
                <dt className="text-sm font-medium text-gray-800">
                  Unrealised PnL
                </dt>
              </div>
              <dd className="w-full text-2xl sm:text-4xl font-medium tracking-tight text-gray-900 text-left">
                {format_pnl(data?.pnl?.unrealised_pnl)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col items-center justify-center mx-6 sm:mx-12 mb-4">
          <dl className="w-full max-w-4xl bg-white gap-y-2 py-4 sm:py-10 xl:px-8 text-gray-800 font-semibold">
            <div className="sm:flex sm:items-center">
              <h1 className="text-base font-semibold text-gray-800">
                Historical Trades
              </h1>
            </div>
            <div className="mt-4 border-2 border-gray-800">
              <table className="min-w-full divide-y-2 divide-gray-800">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900"
                    >
                      Trade Type
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="sm:px-3 py-3.5 pr-4 pl-3 text-left text-sm font-semibold text-gray-900 sm:table-cell whitespace-nowrap"
                    >
                      USD Value
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3.5 pr-4 pl-3 text-left sm:table-cell"
                    >
                      Age
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 bg-white">
                  {data?.transactions.map((trade, i) => (
                    <tr key={i}>
                      <td className="w-full max-w-0 py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none">
                        <div className="flex gap-x-1">
                          <p>{trade.trade_type.charAt(0).toUpperCase() + trade.trade_type.slice(1)}</p>
                          <dd className="font-normal md:hidden truncate text-gray-900">
                            @ {format_pnl(trade.price_in_usd, true)}
                          </dd>
                        </div>
                        <dl className="font-normal md:hidden">
                          <dt className="sr-only sm:hidden">Amount</dt>
                          <dd className="mt-1 truncate text-gray-900 md:hidden">
                            {trade.balance} tokens
                          </dd>
                          <dt className="sr-only sm:hidden">Age</dt>
                          <dd className="mt-1 truncate text-gray-900 sm:hidden">
                            About {trade.age}
                          </dd>
                        </dl>
                      </td>
                      <td className="hidden px-3 py-4 text-sm font-medium text-gray-900 md:table-cell">
                        {format_pnl(trade.price_in_usd, true)}
                      </td>
                      <td className="hidden px-3 py-4 text-sm font-medium text-gray-900 md:table-cell">
                        {trade.balance}
                      </td>
                      <td className="sm:px-3 py-3.5 pr-4 pl-3 text-right sm:text-left text-sm font-medium text-gray-900">
                      {format_pnl(trade.price_in_usd * trade.balance, true)}
                      </td>
                      <td className="hidden py-4 pr-4 pl-3 sm:text-left text-sm font-medium sm:table-cell">
                        {trade.age}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </dl>
        </div>
      </main>
      <footer className="border-t-2 border-gray-800">
        <p className="p-6 lg:px-8 font-semibold text-center text-sm text-gray-800">
          &copy; {new Date().getFullYear()} Ariessa Norramli. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
