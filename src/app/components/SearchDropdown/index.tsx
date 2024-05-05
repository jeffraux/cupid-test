"use client";
import React, { useState } from "react";
import Image from "next/image";

import { SearchDropdownProps, ListItem } from "@/app/types";

import Button from "../Button";
import Input from "../Input";
import LoadingIcon from "../LoadingIcon";

import search from "../../../../public/icons/search.svg";

const SearchDropdown = ({
  placeholder,
  list,
  onChangeSelect,
  onChangeInput,
  searchKey,
  loading,
  showButton,
  inputClassName,
  searchDisabled,
}: SearchDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleFilterItems = (listItem: ListItem) => {
    return listItem.value.match(new RegExp(searchKey, "i"));
  }

  const handleDropdownClose = (event: React.FocusEvent<HTMLDivElement, Element>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowDropdown(false);
    }
  }

  return (
    <div onBlur={handleDropdownClose}>
      <div className="relative w-full">
        <Input
          className={inputClassName}
          placeholder={placeholder}
          value={searchKey}
          onFocus={() => setShowDropdown(true)}
          type="search"
          onChange={onChangeInput}
        />
        {showButton && (
          <Button
            type="submit"
            disabled={loading || searchDisabled}
            className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white disabled:bg-gray-600 disabled:border-gray-600 disabled:hover:bg-gray-600 bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {!loading ? <Image priority src={search} alt="ic-search" /> : <LoadingIcon />}
          </Button>
        )}
      </div>
      {showDropdown && (loading ? (
        <div className="min-w-[240px] max-h-60 overflow-auto overflow-x-hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 absolute">
          <ul className="py-2 text-md text-gray-700 dark:text-gray-200">
            <li>
              <span
                className="inline-flex w-full px-4 py-2 text-md text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                <div className="inline-flex items-center">
                  Loading...
                </div>
              </span>
            </li>
          </ul>
        </div>
      ) : !!list.length && (
        <div className="min-w-[240px] max-h-60 overflow-auto overflow-x-hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 absolute">
          <ul className="py-2 text-md text-gray-700 dark:text-gray-200">
            {list
              .filter((listItem) => handleFilterItems(listItem))
              .map((listItem) => (
                <li key={listItem.id}>
                  <Button
                    type="button"
                    className="inline-flex w-full px-4 py-2 text-md text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    onClick={() => {
                      onChangeSelect(listItem);
                      setShowDropdown(false);
                    }}
                  >
                    <div className="inline-flex items-center">
                      {listItem.value}
                    </div>
                  </Button>
                </li>
              ))
            }
          </ul>
        </div>
      ))}
    </div>
  );
}

export default SearchDropdown;
