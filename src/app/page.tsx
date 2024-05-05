"use client";
import React, { useEffect, useState } from "react";

import { Country, State } from "./types";
import { getData } from "./api";

import SearchDropdown from "./components/SearchDropdown";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [selectedState, setSelectedState] = useState<State>();

  useEffect(() => {
    setLoading(true);
    getData("/countries").then((data) => {
      setCountries(data);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setLoading(true);
      getData(`/countries/${selectedCountry?.id}/states`).then((data) => {
        setStates(data);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [selectedCountry]);

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
  }
  const handleSelectState = (state: State) => {
    setSelectedState(state);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form className="mx-auto">
        <div className="flex">
          <SearchDropdown
            placeholder="Search country"
            list={countries}
            onChange={handleSelectCountry}
            loading={loading}
            inputClassName="rounded-s-lg min-w-60"
          />
          <SearchDropdown
            placeholder="Search state"
            list={states}
            onChange={handleSelectState}
            loading={loading}
            showButton
            inputClassName="rounded-e-lg min-w-80"
          />
        </div>
      </form>
    </main>
  );
}

export default Home;
