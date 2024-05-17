export const isNotEmpty = (inputRef: React.RefObject<HTMLInputElement>) => {
    return inputRef.current?.value.trim() !== '';
};
export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
export const resizeImage = (url: string, newSize: number) => {
    const lastThreeDigitsIndex = url.search(/\d{3}(?!.*\d{3})/);

    let modifiedUrl = url;
    if (lastThreeDigitsIndex !== -1) {
        modifiedUrl = url.slice(0, lastThreeDigitsIndex) + newSize.toString();
    }
    return modifiedUrl;
};
