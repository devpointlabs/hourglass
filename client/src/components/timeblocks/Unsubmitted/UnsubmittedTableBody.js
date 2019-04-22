import React from "react";
import UnsubmittedTableRow from "./UnsubmittedTableRow";
import UnsubmittedTableHeader from "./UnsubmittedTableHeader";
import { Table } from "semantic-ui-react";
import Footer from "./Footer";

const UnsubmittedTableBody = props => (
  <>
    <UnsubmittedTableHeader submitAllTimeBlocks={props.submitAllTimeBlocks} />
    <Table.Body>
      <Table.Row>
        <Table.Cell colSpan="6" />
      </Table.Row>
      <UnsubmittedTableRow
        timeBlocks={props.timeBlocks}
        tasks={props.tasks}
        projects={props.projects}
        handleOpen={props.handleOpen}
        updateTimeblockState={props.updateTimeblockState}
      />
      <Table.Row>
        <Table.Cell colSpan="6" />
      </Table.Row>
    </Table.Body>
  </>
);

export default UnsubmittedTableBody;
