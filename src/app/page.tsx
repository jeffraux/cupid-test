"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Country, State, ListItem } from "./types";
import { getData, getGeolocation } from "./api";

import Button from "./components/Button";
import LoadingIcon from "./components/LoadingIcon";
import SearchDropdown from "./components/SearchDropdown";
import GoogleMaps from "./components/GoogleMaps";

import search from "../../public/icons/search.svg";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [selectedState, setSelectedState] = useState<State>();
  const [searchKey, setSearchKey] = useState({ country: '', state: '' });
  const [geolocation, setGeolocation] = useState({
    latt: '',
    longt: '',
  });

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
      setSelectedCountry(undefined);
    } else {
      setSearchKey({ ...searchKey, state: event.target.value });
    }

    setSelectedState(undefined);
  }

  const handleSubmit = () => {
    setLoading(true);
    getGeolocation(`${selectedState?.value}, ${selectedCountry?.value}`).then((data) => {
      if (data.length) {
        const geo = data[0];
        setGeolocation({ latt: geo.lat, longt: geo.lon });
      }
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:p-24 p-6">
      <form className="mx-auto">
        <div className="flex">
          <SearchDropdown
            placeholder="Country"
            list={countries}
            loading={loading}
            inputClassName="rounded-s-lg"
            onChangeSelect={(listItem) => handleChangeSelected('country', listItem)}
            searchKey={searchKey.country}
            onChangeInput={(event) => handleChangeInput('country', event)}
          />
          <SearchDropdown
            placeholder="State"
            list={states}
            loading={loading}
            showButton
            onChangeSelect={(listItem) => handleChangeSelected('state', listItem)}
            searchKey={searchKey.state}
            onChangeInput={(event) => handleChangeInput('state', event)}
          />
          <Button
            type="submit"
            disabled={loading || !selectedState}
            onClick={handleSubmit}
            className="p-[12px] text-sm font-medium text-white disabled:bg-gray-600 disabled:border-gray-600 disabled:hover:bg-gray-600 bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {!loading ? <Image priority src={search} alt="ic-search" /> : <LoadingIcon />}
          </Button>
        </div>
      </form>
      {geolocation.latt && geolocation.longt && (
        <div className="flex md:w-10/12 w-full h-[500px] mt-[50px] rounded-lg overflow-hidden animate-fade">
          <GoogleMaps geolocation={geolocation} />
        </div>
      )}
    </main>
  );
}

export default Home;
