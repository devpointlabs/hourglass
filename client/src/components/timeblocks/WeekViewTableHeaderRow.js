import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import TableHeaderLabels from "./TableHeaderLabels";

const WeekViewTableHeaderRow = ({ selectedDate }) => (
  <Table.Row style={{ background: "lightgray" }}>
    <Table.HeaderCell style={{ paddingTop: "10px", paddingLeft: "1%" }} />
    <Table.HeaderCell style={{ width: "20%" }} />
    <TableHeaderLabels selectedDate={selectedDate} />
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
