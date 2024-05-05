"use client";
import React, { Fragment, useState } from "react";
import Image from 'next/image';

import { DropdownProps } from "@/app/types";

import Button from "../Button";
import chevronDown from '../../../../public/icons/chevron-down.svg';

const countries = ['United States', 'Italy', 'Philippines']

const Dropdown = ({ placeholder, selected }: DropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Fragment>
      <Button
        icon={<Image src={chevronDown} alt="ic-dropdown" />}
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
      >
        {selected ? selected : placeholder || "Select..."}
      </Button>
      {showDropdown && (
        <div className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-[42px]">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {countries.map((country) => (
              <li key={country}>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  <div className="inline-flex items-center">
                    {country}
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
