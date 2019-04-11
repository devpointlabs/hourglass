import React from "react";
import DayViewTableHeaderLabels from "./DayViewTableHeaderLabels";
import { Table } from "semantic-ui-react";
import moment from "moment";

class DayViewTableHeaderRow extends React.Component {
  render() {
    const { currentWeekTimeBlocks, selectedDate, monday } = this.props;
    return (
      <Table.Row style={{ background: "#e2e2e2" }}>
        <DayViewTableHeaderLabels
          selectedDate={selectedDate}
          monday={monday}
          currentWeekTimeBlocks={currentWeekTimeBlocks}
        />
      </Table.Row>
    );
  }
}

export default DayViewTableHeaderRow;
