import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";

const DayViewTableRow = ({ timeBlock }) => (
  <Table.Row>
    <Table.Cell>DayViewTableRow</Table.Cell>
    <Table.Cell colSpan="5">{timeBlock.task_id}</Table.Cell>
    <Table.Cell>{parseFloat(timeBlock.hours).toFixed(2)}</Table.Cell>
    <Table.Cell>
      <div style={{ display: "flex" }}>
        <Button>
          <Icon name="stopwatch" />
          Start
        </Button>
        <Button>
          <Icon name="pencil" />
        </Button>
      </div>
    </Table.Cell>
  </Table.Row>
);

export default DayViewTableRow;
