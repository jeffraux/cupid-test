import React, { forwardRef } from "react";
import { ButtonProps } from "@/app/types";

import "./Button.css";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled, loading, icon, children, ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        disabled={disabled || loading}
      >
        {children}
        {icon && <i className="icon">{icon}</i>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
