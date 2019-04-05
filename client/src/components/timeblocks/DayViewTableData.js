import React from "react";
import DayViewTableHeaderRow from "./DayViewTableHeaderRow";
import DayViewTableRow from "./DayViewTableRow";
import { Table, Button, Icon } from "semantic-ui-react";

const DayViewTableData = ({ selectedDate }) => (
  <>
    <Table.Header>
      <DayViewTableHeaderRow selectedDate={selectedDate} />
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell colSpan="10" />
      </Table.Row>
      <DayViewTableRow />
      Daily total
      <Table.Row />
    </Table.Body>
  </>
);

export default DayViewTableData;
