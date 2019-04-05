import convertMomentToSelectedDateString from "./convertMomentToSelectedDateString";
import moment from "moment";

const TimeSheetNavbarClickHandler = (date, event, task) => {
  let newDate;
  switch (event) {
    case "dayLeft":
      newDate = moment(date).add(-1, "days");
      task(convertMomentToSelectedDateString(newDate));
      break;
    case "dayRight":
      newDate = moment(date).add(1, "days");
      task(convertMomentToSelectedDateString(newDate));
      break;
    case "day":
      task("day");
      break;
    case "week":
      task("week");
      break;
  }
};

export default TimeSheetNavbarClickHandler;
