import React from "react";
import { Table, Checkbox } from "semantic-ui-react";

const UnsubmittedTableHeader = () => (
  <>
    <Table.Header>
      <Table.Row style={{ background: "#e2e2e2" }}>
        <Table.Cell
          style={{ fontSize: "1.1em", width: "50px", fontWeight: "bold" }}
        />
        <Table.Cell style={{ width: "1100px", fontWeight: "bold" }} />
        <Table.Cell
          style={{ fontSize: "1.1em", width: "350px", fontWeight: "bold" }}
        >
          Start Time
        </Table.Cell>
        <Table.Cell
          style={{ fontSize: "1.1em", width: "350px", fontWeight: "bold" }}
        >
          End Time
        </Table.Cell>

        <Table.Cell
          style={{ fontSize: "1.1em", width: "50px", fontWeight: "bold" }}
        >
          Hours
        </Table.Cell>
        <Table.Cell
          style={{ fontSize: "1.1em", width: "5px", fontWeight: "bold" }}
        >
          Verify
        </Table.Cell>
      </Table.Row>
    </Table.Header>
  </>
);

export default UnsubmittedTableHeader;
