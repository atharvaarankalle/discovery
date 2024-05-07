import { Schema } from "mongoose";

type compareDatesProps = {
  date1: Date | Schema.Types.Date;
  date2: Date | Schema.Types.Date;
};

/**
 * Compares if two dates are equal.
 *
 * @param date1 - first date you want to compare
 * @param date2 - second date you want to compare
 * @returns true if the two dates are equal, false if not.
 */
export const compareDates = ({ date1, date2 }: compareDatesProps) => {
  // Converting dates to JS dates
  const JsDate1 = date1 as Date;
  const JsDate2 = date2 as Date;

  return (
    JsDate1.getFullYear() === JsDate2.getFullYear() &&
    JsDate1.getMonth() === JsDate2.getMonth() &&
    JsDate1.getDate() === JsDate2.getDate()
  );
};

/**
 * Get today's date
 * @returns Today's Date with time set to 0000.
 */
export const getTodaysDate = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today;
};
