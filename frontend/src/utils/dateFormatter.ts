export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Get the day suffix (e.g., "st", "nd", "rd", "th")
  const day = date.getDate();
  let daySuffix = "th";
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
  } else if (day === 2 || day === 22) {
    daySuffix = "nd";
  } else if (day === 3 || day === 23) {
    daySuffix = "rd";
  }

  // Add the day suffix to the formatted date
  const formattedWithSuffix = formattedDate.replace(
    /\b(\d{1,2})\b/,
    `$1${daySuffix}`
  );

  console.log(formattedWithSuffix);

  return formattedWithSuffix;
};
