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
      currentWeekTimeBlocks,
      weekHours
    } = this.props;

    switch (view) {
      case "day":
        return (
          <>
            <DayViewTableData
              selectedDate={selectedDate}
              timeBlocks={timeBlocks}
              tasks={tasks}
              weekHours={weekHours}
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
              weekHours={weekHours}
            />
          </>
        );
      // no default
    }
  }
}

export default TableData;
