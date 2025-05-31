'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      router.push(`/address/${input.trim()}`);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="bg-white border-b-2 border-gray-800">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 sm:p-6 sm:gap-y-4 lg:px-8"
        >
          <div className="flex lg:flex-1 gap-x-4 items-center">
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
        </nav>
      </header>
      <main className="flex-1 overflow-auto bg-white">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
              Calculate Profit and Loss
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg/8 text-pretty text-gray-600">
              For a wallet holding xAVAX.
            </p>
            <form onSubmit={handleSubmit} className="mt-14 relative border-2 border-gray-600 py-2">
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
                name="wallet-address"
                id="wallet-address"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="focus:outline-none focus:ring-0 block w-full ml-12 sm:text-sm font-medium text-gray-800 placeholder:font-medium border-gray-300"
                placeholder="Search for an address..."
              />
            </form>
          </div>
        </div>
      </main>
      <footer className="border-t-2 border-gray-800">
        <p className="p-6 lg:px-8 font-semibold text-center text-sm text-gray-800">
          &copy; {new Date().getFullYear()} Ariessa Norramli. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
