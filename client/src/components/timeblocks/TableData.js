import React from "react";
import DayViewTableData from "./DayViewTableData";
import WeekViewTableData from "./WeekViewTableData";

class TableData extends React.Component {
  render() {
    const { view, selectedDate, timeBlocks } = this.props;

    switch (view) {
      case "day":
        return (
          <DayViewTableData
            selectedDate={selectedDate}
            timeBlocks={timeBlocks}
          />
        );
      case "week":
        return <WeekViewTableData selectedDate={selectedDate} />;
    }
  }
}

export default TableData;
