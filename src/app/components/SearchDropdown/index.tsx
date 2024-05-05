"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";

import { DropdownProps, ListItem } from "@/app/types";

import Button from "../Button";
import Input from "../Input";

import search from "../../../../public/icons/search.svg";

const SearchDropdown = ({ placeholder, selected, list, onChange, loading, showButton, inputClassName }: DropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (listItem: ListItem) => {
    onChange(listItem);
    setShowDropdown(false);
  }

  return (
    <Fragment>
      <div className="relative w-full">
        <Input
          className={inputClassName}
          placeholder={placeholder}
          value={selected}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setShowDropdown(false)}
        />
        {showButton && (
          <Button
            type="submit"
            className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <Image src={search} alt="ic-search" />
          </Button>
        )}
      </div>
      {!!list.length && showDropdown && (
        <div className="w-max max-h-60 overflow-scroll overflow-x-hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 absolute mt-[42px]">
          <ul className="py-2 text-md text-gray-700 dark:text-gray-200">
            {list.map((listItem) => (
              <li key={listItem.id}>
                <Button
                  type="button"
                  className="inline-flex w-full px-4 py-2 text-md text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  onClick={() => handleChange(listItem)}
                >
                  <div className="inline-flex items-center">
                    {listItem.value}
                  </div>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
}

export default SearchDropdown;
