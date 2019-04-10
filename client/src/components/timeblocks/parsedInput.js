const parsedInput = (year, monthDay, hourMinute) => {
  let parsedString =
    year +
    "-" +
    monthDay.substring(0, 2) +
    "-" +
    monthDay.substring(3, 5) +
    " " +
    hourMinute;

  return parsedString;
};

export default parsedInput;
