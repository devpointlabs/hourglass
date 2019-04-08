import React from "react";
import DayViewTableData from "./DayViewTableData";
import WeekViewTableData from "./WeekViewTableData";

class TableData extends React.Component {
  render() {
    const { view, selectedDate, timeBlocks, tasks } = this.props;

    switch (view) {
      case "day":
        return (
          <DayViewTableData
            selectedDate={selectedDate}
            timeBlocks={timeBlocks}
            tasks={tasks}
          />
        );
      case "week":
        return (
          <WeekViewTableData
            selectedDate={selectedDate}
            timeBlocks={timeBlocks}
            tasks={tasks}
          />
        );
    }
  }
}

export default TableData;
