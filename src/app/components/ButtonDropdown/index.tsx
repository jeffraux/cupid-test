"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";

import { DropdownProps, ListItem } from "@/app/types";

import Button from "../Button";
import chevronDown from "../../../../public/icons/chevron-down.svg";

const Dropdown = ({ placeholder, selected, list, onChange, loading }: DropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (listItem: ListItem) => {
    onChange(listItem);
    setShowDropdown(false);
  }

  return (
    <Fragment>
      <Button
        icon={<Image src={chevronDown} alt="ic-dropdown" />}
        onClick={() => setShowDropdown(!showDropdown)}
        loading={loading}
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
      >
        {selected ? selected : placeholder || "Select..."}
      </Button>
      {showDropdown && (
        <div className="w-max max-h-60 overflow-scroll overflow-x-hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 absolute mt-[42px]">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {list.map((listItem) => (
              <li key={listItem.id}>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  onClick={() => handleChange(listItem)}
                >
                  <div className="inline-flex items-center">
                    {listItem.value}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
}

export default Dropdown;
