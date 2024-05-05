import React, { useEffect } from "react";
import Image from "next/image";

import { Country, State } from "./types";

import ButtonDropdown from "./components/ButtonDropdown";
import Button from "./components/Button";
import search from "../../public/icons/search.svg";

const countries: Country[] = [
  { id: 1, value: 'United States' },
  { id: 2, value: 'Italy' },
  { id: 3, value: 'Philippines' },
]
const states: State[] = [];

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form className="max-w-md mx-auto">
        <div className="flex">
          <ButtonDropdown
            placeholder="Select a country"
            list={countries}
          />
          <div className="relative w-full">
            <input
              type="search"
              id="location-search"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search for city or address"
              required
            />
            <Button
              type="submit"
              className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <Image src={search} alt="ic-search" />
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Home;
