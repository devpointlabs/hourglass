import React from "react";
import { Table, Button } from "semantic-ui-react";

const UnsubmittedTableHeader = ({ submitAllTimeBlocks }) => (
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
          style={{
            width: "180px",
            fontSize: "1.1em",
            fontWeight: "bold"
          }}
        >
          <Button
            floated="right"
            style={{
              marginRight: "10px",
              background: "RebeccaPurple",
              color: "white"
            }}
            onClick={() => submitAllTimeBlocks()}
          >
            Submit All
          </Button>
        </Table.Cell>
      </Table.Row>
    </Table.Header>
  </>
);

export default UnsubmittedTableHeader;
