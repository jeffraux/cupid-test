"use client";
import React, { useState } from "react";

import { SearchDropdownProps, ListItem } from "@/app/types";

import Button from "../Button";
import Input from "../Input";

const SearchDropdown = ({
  placeholder,
  list,
  onChangeSelect,
  onChangeInput,
  searchKey,
  loading,
  name,
  inputClassName,
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
          aria-label={name}
          className={inputClassName || ''}
          placeholder={placeholder}
          value={searchKey}
          onFocus={() => setShowDropdown(true)}
          type="search"
          onChange={onChangeInput}
        />
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
        <div className="min-w-[240px] z-50 max-h-60 overflow-auto overflow-x-hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 absolute">
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
