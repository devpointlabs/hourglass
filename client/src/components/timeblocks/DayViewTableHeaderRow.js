import React from "react";
import TableHeaderLabels from "./TableHeaderLabels";
import { Table } from "semantic-ui-react";

const DayViewTableHeaderRow = ({ selectedDate }) => (
  <Table.Row style={{ background: "lightgray" }}>
    <Table.HeaderCell style={{ paddingTop: "10px", paddingLeft: "1%" }} />
    <Table.HeaderCell style={{ width: "20%" }} />
    <TableHeaderLabels selectedDate={selectedDate} />
    <Table.HeaderCell />
    <Table.HeaderCell />
  </Table.Row>
);

export default DayViewTableHeaderRow;
