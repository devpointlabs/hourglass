import convertMomentToSelectedDateString from "./convertMomentToSelectedDateString";
import moment from "moment";

const TimeSheetNavbarClickHandler = (date, event, task) => {
  let newDate;
  switch (event) {
    case "dayLeft":
      newDate = moment(date).add(-1, "days");
      task(convertMomentToSelectedDateString(newDate));

    case "dayRight":
      newDate = moment(date).add(1, "days");
      task(convertMomentToSelectedDateString(newDate));
  }
};

export default TimeSheetNavbarClickHandler;
