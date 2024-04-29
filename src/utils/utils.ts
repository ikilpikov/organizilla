export const isNotEmpty = (inputRef: React.RefObject<HTMLInputElement>) => {
  return inputRef.current?.value.trim() !== "";
};
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
