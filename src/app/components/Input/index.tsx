import React, { forwardRef } from "react";
import { InputProps } from "@/app/types";

import "./Input.css";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        {...rest}
        className={`${className} block p-2.5 w-full z-20 text-md text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500`}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
