import React from "react";
import DayViewTableData from "./DayViewTableData";
import WeekViewTableData from "./WeekViewTableData";
import moment from "moment";

class TableData extends React.Component {
  render() {
    const {
      view,
      selectedDate,
      timeBlocks,
      tasks,
      currentWeekTimeBlocks
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
            />
          </>
        );
      // no default
    }
  }
}

export default TableData;
