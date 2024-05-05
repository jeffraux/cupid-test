export interface ButtonProps extends React.ComponentProps<'button'> {
  /** If button is in disabled state */
  disabled?: boolean;
  /** loading state */
  loading?: boolean;
  /** icon component */
  icon?: React.ReactNode;
};

export type ListItem = {
  id: number;
  value: string;
}

export interface DropdownProps {
  /** displayed string if no item is selected */
  placeholder?: string;
  /** selected value string */
  selected?: string;
  /** selected value string */
  list: ListItem[];
  /** handle onChange event */
  onChange: (listItem: ListItem) => void
  /** loading state */
  loading?: boolean;
};

export type Country = ListItem;
export type State = ListItem;

export interface FormProps {
  /** list of Countries */
  countries: Country[];
  /** list of States */
  states: State[];
}
