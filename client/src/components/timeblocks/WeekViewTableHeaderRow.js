import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import WeekViewTableHeaderLabels from "./WeekViewTableHeaderLabels";

const WeekViewTableHeaderRow = ({ selectedDate }) => (
  <Table.Row style={{ background: "lightgray" }}>
    <Table.HeaderCell style={{ paddingTop: "10px", paddingLeft: "1%" }} />
    <Table.HeaderCell style={{ width: "20%" }} />
    <WeekViewTableHeaderLabels selectedDate={selectedDate} />
    <Table.HeaderCell />
    <Table.HeaderCell />
  </Table.Row>
);
export default WeekViewTableHeaderRow;

////////////////////////////////
///////previous version
///////////////////////

{
  /* <DateRange
  startDate={this.state.startDate}
  endDate={this.state.endDate}
  updateDateRange={this.updateDateRange}
/> */
}
