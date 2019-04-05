import React from "react";
import DayViewTableHeaderLabels from "./DayViewTableHeaderLabels";
import { Table } from "semantic-ui-react";

const DayViewTableHeaderRow = ({ selectedDate }) => (
  <Table.Row style={{ background: "lightgray" }}>
    <DayViewTableHeaderLabels selectedDate={selectedDate} />
    <Table.HeaderCell>Weekly Total</Table.HeaderCell>
    <Table.HeaderCell />
  </Table.Row>
);

export default DayViewTableHeaderRow;
