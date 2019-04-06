import moment from "moment";

export const CalculateHours = blocks => {
  return blocks.map(b => {
    return {
      ...b,
      hours: moment(b.end_time)
        .diff(b.start_time, "hours", true)
        .toPrecision(4)
    };
  });
};
