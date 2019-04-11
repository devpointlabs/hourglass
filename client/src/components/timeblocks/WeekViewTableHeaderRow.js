import React from "react";
import { Table } from "semantic-ui-react";
import WeekViewTableHeaderLabels from "./WeekViewTableHeaderLabels";
import moment from "moment";

class WeekViewTableHeaderRow extends React.Component {
  render() {
    const {
      monday,
      selectedDate,
      setSelectedDate,
      setSelectedWeek
    } = this.props;
    return (
      <Table.Row style={{ background: "#e2e2e2" }}>
        <Table.HeaderCell style={{ paddingTop: "10px", paddingLeft: "1%" }} />
        <Table.HeaderCell style={{ width: "20%" }} />
        <WeekViewTableHeaderLabels
          selectedDate={selectedDate}
          monday={monday}
          setSelectedDate={setSelectedDate}
          setSelectedWeek={setSelectedWeek}
        />
        <Table.HeaderCell />
        <Table.HeaderCell />
      </Table.Row>
    );
  }
}

export default WeekViewTableHeaderRow;

////////////////////////////////
///////previous version
///////////////////////
