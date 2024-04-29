import React from "react";
import { useCallback } from "react";
import { getCurrentDate, getGreeting } from "../../utils/date";
const CurrentDate = () => {
  const { day, dayOfWeek, month } = getCurrentDate();
  const greeting = getGreeting();
  return (
    <>
      <h3>
        {dayOfWeek},{day} {month}
      </h3>
      <p>{greeting}, Михаил</p>
    </>
  );
};

export default CurrentDate;
