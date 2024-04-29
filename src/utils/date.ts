import { capitalizeFirstLetter } from "./utils";
const date = new Date();
export const getCurrentDate = () => {
  const day = date.toLocaleString("ru", { day: "2-digit" });
  const dayOfWeek = capitalizeFirstLetter(
    date.toLocaleString("ru", { weekday: "long" })
  );
  const month = capitalizeFirstLetter(
    date.toLocaleString("ru", { month: "long" })
  );

  return { day, dayOfWeek, month };
};
export const getGreeting = () => {
  if (date.getHours() >= 6 && date.getHours() < 12) return "Доброе утро";
  else if (date.getHours() >= 12 && date.getHours() < 18) return "Добрый день";
  else return "Добрый вечер";
};
