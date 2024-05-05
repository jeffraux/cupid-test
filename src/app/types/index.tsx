export interface ButtonProps extends React.ComponentProps<'button'> {
  /** If button is in disabled state */
  disabled?: boolean;
  /** loading state */
  loading?: boolean;
  /** icon component */
  icon?: React.ReactNode;
};

export interface DropdownProps {
  /** displayed string if no item is selected */
  placeholder?: string;
  /** displayed string if no item is selected */
  selected?: string;
}
