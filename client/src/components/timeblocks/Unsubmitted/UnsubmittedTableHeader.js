import React from "react";
import { Table, Checkbox } from "semantic-ui-react";

const UnsubmittedTableHeader = () => (
  <>
    <Table.Header style={{ display: "flex", justifyContent: "space-between" }}>
      <Table.Row style={{ background: "#e2e2e2" }}>
        <Table.Cell style={{ fontSize: "1.2em", width: "140px" }}>
          Project
        </Table.Cell>
        <Table.Cell style={{ fontSize: "1.2em", width: "140px" }}>
          Task
        </Table.Cell>
        <Table.Cell style={{ width: "470px" }} />

        <Table.Cell
          style={{ fontSize: "1.2em", width: "140px", textAlign: "center" }}
        >
          Hours
        </Table.Cell>
        <Table.Cell
          style={{ fontSize: "1.2em", width: "140px", textAlign: "center" }}
        >
          Verify Hours
        </Table.Cell>
      </Table.Row>
    </Table.Header>
  </>
);

export default UnsubmittedTableHeader;
