import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import TableHeaderLabels from "./TableHeaderLabels";

const TableHeaderRow = ({ selectedDate }) => (
  <Table.Row>
    <Table.HeaderCell style={{ paddingTop: "10px" }}>
      <Button
        style={{
          background: "#723186",
          color: "white",
          width: "25%"
        }}
        onClick={() => this.addNewTimeBlock(true)}
      >
        <Icon style={{ color: "white" }} name="add" />
      </Button>
    </Table.HeaderCell>
    <Table.HeaderCell style={{ width: "20%" }}>
      {/* <DateRange
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        updateDateRange={this.updateDateRange}
      /> */}
    </Table.HeaderCell>
    <TableHeaderLabels selectedDate={selectedDate} />

    <Table.HeaderCell />
    <Table.HeaderCell />
  </Table.Row>
);
export default TableHeaderRow;
