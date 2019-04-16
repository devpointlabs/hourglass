import React from "react";
import UnsubmittedTableRow from "./UnsubmittedTableRow";
import UnsubmittedTableHeader from "./UnsubmittedTableHeader";
import { Table } from "semantic-ui-react";
import Footer from "./Footer";

const UnsubmittedTableBody = props => (
  <>
    <UnsubmittedTableHeader />
    <Table.Body>
      <Table.Row>
        <Table.Cell colSpan="6" />
      </Table.Row>
      <UnsubmittedTableRow
        timeBlocks={props.timeBlocks}
        tasks={props.tasks}
        projects={props.projects}
        getTimeBlocks={props.getTimeBlocks}
        handleCheckMarks={props.handleCheckMarks}
        reset={props.reset}
        handleOpen={props.handleOpen}
      />
      <Table.Row>
        <Table.Cell colSpan="6" />
      </Table.Row>
      <Footer submitTimeBlocks={props.submitTimeBlocks} />
    </Table.Body>
  </>
);

export default UnsubmittedTableBody;
