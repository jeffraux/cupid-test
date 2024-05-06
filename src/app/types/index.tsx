export interface ButtonProps extends React.ComponentProps<'button'> {
  /** If button is in disabled state */
  disabled?: boolean;
  /** loading state */
  loading?: boolean;
  /** icon component */
  icon?: React.ReactNode;
};

export interface InputProps extends React.ComponentProps<'input'> {
  /** If button is in disabled state */
  disabled?: boolean;
};

export type ListItem = {
  id: number;
  value: string;
}

export interface SearchDropdownProps {
  /** input element name identifier */
  name: string;
  /** displayed string if no item is selected */
  placeholder?: string;
  /** selected value string */
  list: ListItem[];
  /** loading state */
  loading?: boolean;
  /** custom class names for input component */
  inputClassName?: string;
  /** search key string */
  searchKey: string;
  /** event fired when an option is selected */
  onChangeSelect: (listItem: ListItem) => void;
  /** event fired when changing search input value */
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type Country = ListItem;
export type State = ListItem;

export interface FormProps {
  /** list of Countries */
  countries: Country[];
  /** list of States */
  states: State[];
}

export interface GeolocationProps {
  geolocation: {
    latt: string;
    longt: string;
  };
}
