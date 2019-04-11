import React from "react";
import DayViewTableData from "./DayViewTableData";
import WeekViewTableData from "./WeekViewTableData";
import moment from "moment";

class TableData extends React.Component {
  render() {
    let todayDay = moment(this.props.selectedDate).format("dd");
    let todayDate = moment(this.props.selectedDate);
    let monday;
    switch (todayDay) {
      case "Mo":
        monday = moment(todayDate);
        break;
      case "Tu":
        monday = moment(todayDate).subtract(1, "days");
        break;
      case "We":
        monday = moment(todayDate).subtract(2, "days");
        break;
      case "Th":
        monday = moment(todayDate).subtract(3, "days");
        break;
      case "Fr":
        monday = moment(todayDate).subtract(4, "days");
        break;
      case "Sa":
        monday = moment(todayDate).subtract(5, "days");
        break;
      case "Su":
        monday = moment(todayDate).subtract(6, "days");
        break;
      // no default
    }
    const {
      view,
      selectedDate,
      timeBlocks,
      tasks,
      currentWeekTimeBlocks,
      stopTimer,
      setSelectedDate,
      setSelectedWeek
    } = this.props;

    switch (view) {
      case "day":
        return (
          <>
            <DayViewTableData
              selectedDate={selectedDate}
              timeBlocks={timeBlocks}
              tasks={tasks}
              currentWeekTimeBlocks={currentWeekTimeBlocks}
              monday={monday}
              stopTimer={stopTimer}
              setSelectedDate={setSelectedDate}
              setSelectedWeek={setSelectedWeek}
            />
          </>
        );
      case "week":
        return (
          <>
            <WeekViewTableData
              selectedDate={selectedDate}
              timeBlocks={timeBlocks}
              tasks={tasks}
              currentWeekTimeBlocks={currentWeekTimeBlocks}
              monday={monday}
              setSelectedDay={setSelectedDate}
              setSelectedWeek={setSelectedWeek}
            />
          </>
        );
      // no default
    }
  }
}

export default TableData;
