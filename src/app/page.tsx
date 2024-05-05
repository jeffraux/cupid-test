"use client";
import React, { useEffect, useState } from "react";

import { Country, State, ListItem } from "./types";
import { getData } from "./api";

import SearchDropdown from "./components/SearchDropdown";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [selectedState, setSelectedState] = useState<State>();
  const [searchKey, setSearchKey] = useState({ country: '', state: '' });

  useEffect(() => {
    setLoading(true);
    getData("/countries").then((data: Country[]) => {
      setCountries(data);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setLoading(true);
      getData(`/countries/${selectedCountry.id}/states`).then((data: State[]) => {
        setStates(data);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  const handleChangeSelected = (field: string, listItem: ListItem) => {
    if (field === 'country') {
      setSelectedCountry(listItem);
    } else {
      setSelectedState(listItem);
    }

    setSearchKey({ ...searchKey, [field]: listItem.value });
  }

  const handleChangeInput = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (field === 'country') {
      setSearchKey({ country: event.target.value, state: '' });
    } else {
      setSearchKey({ ...searchKey, state: event.target.value });
    }

    setSelectedCountry(undefined);
    setSelectedState(undefined);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form className="mx-auto">
        <div className="flex">
          <SearchDropdown
            placeholder="Search country"
            list={countries}
            loading={loading}
            inputClassName="rounded-s-lg min-w-60"
            onChangeSelect={(listItem) => handleChangeSelected('country', listItem)}
            searchKey={searchKey.country}
            onChangeInput={(event) => handleChangeInput('country', event)}
          />
          <SearchDropdown
            placeholder="Search state"
            list={states}
            loading={loading}
            showButton
            inputClassName="rounded-e-lg min-w-80"
            onChangeSelect={(listItem) => handleChangeSelected('state', listItem)}
            searchKey={searchKey.state}
            onChangeInput={(event) => handleChangeInput('state', event)}
            searchDisabled={!selectedState}
          />
        </div>
      </form>
    </main>
  );
}

export default Home;
